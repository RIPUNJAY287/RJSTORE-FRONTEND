import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import "./register.css";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../../context/AuthContext";
import { auth, googleProvider } from "../../firebase";
import axios from "axios";
const asyncLocalStorage = {
  setItem: async function (key, value) {
    return Promise.resolve().then(function () {
      localStorage.setItem(key, value);
    });
  },
  getItem: async function (key) {
    return Promise.resolve().then(function () {
      return localStorage.getItem(key);
    });
  },
};

function Register() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();
  const phoneRef = useRef();
  const history = useHistory();
  const { signup, setCurrentUser, setUserData } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    var passlen = passwordRef.current.value;
    console.log(passlen.length);
    if (passlen.length < 8) {
      alert("password length should be equal or greater than 8");
      return;
    }
    try {
      setError("");
      setLoading(true);
      const result = await signup(
        emailRef.current.value,
        passwordRef.current.value
      );
      const token = await result.user.getIdToken();
      const res = await fetch("http://localhost:4000/api/user/new", {
        method: "post",
        headers: { "Content-Type": "application/json", Authorization: token },
        body: JSON.stringify({
          name: nameRef.current.value,
          phone: phoneRef.current.value,
          email: result.user.email,
          uid: result.user.uid,
        }),
      });
      if (res) {
        const userData = {
          name: nameRef.current.value,
          phone: phoneRef.current.value,
          email: result.user.email,
          uid: result.user.uid,
          token: token,
          user: result.user,
        };
        await asyncLocalStorage.setItem("userData", JSON.stringify(userData));
        setUserData(userData);
        setCurrentUser(result.user);
        history.push("/login");
        alert("You are registered, Login now");
      }
    } catch (err) {
      console.log(err);
      setError("Failed to create an account");
    }

    setLoading(false);
  }

  const signInWithGoogle = async () => {
    await auth
      .signInWithPopup(googleProvider)
      .then(async (res) => {
        setCurrentUser(res.user);
        await res.user.getIdToken().then(async (token) => {
          await axios
            .post(
              "http://localhost:4000/api/user/new",
              {
                name: res.user.displayName,
                phone: res.user.phoneNumber,
                email: res.user.email,
                uid: res.user.uid,
              },
              {
                headers: { Authorization: token },
              }
            )
            .catch((err) => console.log(err));
          const userData = {
            name: res.user.displayName,
            phone: res.user.phoneNumber,
            email: res.user.email,
            uid: res.user.uid,
            token: token,
            user: res.user,
          };
          await asyncLocalStorage.setItem("userData", JSON.stringify(userData));
          setUserData(userData);
          setCurrentUser(res.user);
          console.log(res.user);
          history.push("/");
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="signupDiv clothes-background">
      <div className="signupPanel mx-auto p-5 bg-dark text-white rounded">
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Display Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              ref={nameRef}
              required
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              ref={emailRef}
              required
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              ref={passwordRef}
              placeholder="atleast length of 8"
              required
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Phone Number"
              ref={phoneRef}
              required
            />
          </Form.Group>

          <Button
            className="btn btn-primary d-block mx-auto"
            onClick={handleSubmit}
          >
            Sign Up
          </Button>
        </Form>
        <br />
        <div className="text-center ">
          <Button
            variant="light"
            className=" btn pl-1 pr-1 w-75  mx-auto rounded-0 btn-lg text-dark "
            onClick={signInWithGoogle}
          >
            <FcGoogle className="mb-1" /> GOOGLE
          </Button>
        </div>
        <br></br>

        <h6 class="text-right d-block">Already register?</h6>
        <Link class="text-white float-right" to="/login">
          Sign In
        </Link>
      </div>
    </div>
  );
}

export default Register;
