import React, { useRef, useState } from "react";
import { Link, useHistory, Redirect } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import "./login.css";
import { useAuth } from "../../context/AuthContext";
import { auth, googleProvider } from "../../firebase";
import { FcGoogle } from "react-icons/fc";
import Spin from "../spinner/spinner";
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

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const history = useHistory();
  const { login, currentUser, setCurrentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      const result = await login(
        emailRef.current.value,
        passwordRef.current.value
      );
      const token = await result.user.getIdToken();
      const res = await axios.post(
        `http://localhost:4000/api/user/getDetails`,
        {
          uid: result.user.uid,
        },
        {
          headers: { Authorization: token },
        }
      );
      const userData = {
        name: res.data.name,
        phone: res.data.phone,
        email: emailRef.current.value,
        uid: result.user.uid,
        token: token,
        user: result.user,
      };
      await asyncLocalStorage.setItem("userData", JSON.stringify(userData));
      console.log(result.user);
      setCurrentUser(result.user);
      console.log("after Login");
      console.log(userData);
      history.push("/");
    } catch {
      console.log("failed to log in");
      setError("Failed to log in");
    }

    setLoading(false);
  }

  const signInWithGoogle = async () => {
    try {
      const res = await auth.signInWithPopup(googleProvider);
      if (res.additionalUserInfo.isNewUser) {
        await auth.currentUser.delete().then(() => {
          console.log("User Deleted");
        });
        alert("Sign Up with Google First");
        history.push("/register");
        return;
      }
      const token = await res.user.getIdToken();
      const userData = {
        name: res.user.displayName,
        phone: res.user.phoneNumber,
        email: res.user.email,
        uid: res.user.uid,
        token: token,
        user: res.user,
      };
      await asyncLocalStorage.setItem("userData", JSON.stringify(userData));
      setCurrentUser(res.user);
      history.push("/");
    } catch (e) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="loginDiv">
        <div className="loginPanel mx-auto p-5 bg-dark text-white rounded">
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                ref={emailRef}
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
              />
            </Form.Group>
            <Button
              class="btn btn-primary"
              onClick={handleSubmit}
              type="submit"
            >
              Sign In
            </Button>
            <Link className="lLink" to="/register">
              Sign Up
            </Link>
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
        </div>
      </div>
    </>
  );
}

export default Login;
