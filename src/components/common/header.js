import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Nav, NavLink, Navbar } from "react-bootstrap";
import "./header.css";
import {
  FaShoppingBag,
  FaHeart,
  FaHome,
  FaShoppingCart,
  FaUser,
} from "react-icons/fa";
import { MdExitToApp, MdArrowForward } from "react-icons/md";
import { useAuth } from "../../context/AuthContext";

import NavbarToggle from "react-bootstrap/esm/NavbarToggle";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
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

function Header(props) {
  const history = useHistory();
  const { logout, currentUser, setCurrentUser, setUserData } = useAuth();

  useEffect(() => {
    (async () => {
      const res = await asyncLocalStorage.getItem("userData");
      const data = await JSON.parse(res);
      if (res != null) {
        setCurrentUser(data.user);
        console.log("res data");
        console.log(data.user);
      } else {
        console.log("no data");
      }
    })();
  }, []);
  async function handlelogout() {
    try {
      await logout();
      history.push("/");
    } catch {
      console.log("error in log out");
    }
  }
  return (
    <>
      <Navbar className="NavBar " expand="sm">
        <Navbar.Brand className="text-white" to="/">
          FOOD DUDE
        </Navbar.Brand>
        <NavbarToggle target="#mynavbar" class="bg-light" />
        <NavbarCollapse id="mynavbar">
          <Nav className="d-flex ml-auto text-center">
            <Nav.Item className="nav-item">
              <Link className="navLink" exact to="/" activeclassname="active">
                <i style={{ padding: "0px 4px 5px 4px" }}>
                  <FaHome />
                </i>
                Home
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link
                className="navLink"
                exact
                to="/merchandise"
                activeclassname="active"
              >
                <i style={{ padding: "0px 4px 5px 4px" }}>
                  <FaShoppingBag />
                </i>
                Store
              </Link>
            </Nav.Item>
            {currentUser ? (
              <Nav.Item>
                <Link
                  className="navLink"
                  exact
                  to="/wishlist"
                  activeclassname="active"
                >
                  <i style={{ padding: "0px 4px 5px 4px" }}>
                    <FaHeart />
                  </i>
                  Wishlist
                </Link>
              </Nav.Item>
            ) : null}
            {currentUser ? (
              <Nav.Item>
                <Link
                  className="navLink"
                  exact
                  to="/cart"
                  activeclassname="active"
                >
                  <i style={{ padding: "0px 4px 5px 4px" }}>
                    <FaShoppingCart />
                  </i>
                  Cart
                </Link>
              </Nav.Item>
            ) : null}
            {currentUser ? (
              <Nav.Item>
                <Link
                  className="navLink"
                  exact
                  to="/profile"
                  activeclassname="active"
                >
                  <i style={{ padding: "0px 4px 5px 4px" }}>
                    <FaUser />
                  </i>
                  Account
                </Link>
              </Nav.Item>
            ) : null}
            {currentUser ? (
              <Nav.Item>
                <Link
                  className="navLink"
                  exact
                  to="/login"
                  activeclassname="active"
                  onClick={handlelogout}
                >
                  Sign out
                  <i style={{ padding: "4px" }}>
                    <MdExitToApp />
                  </i>
                </Link>
              </Nav.Item>
            ) : (
              <Nav.Item>
                <Link
                  className="navLink"
                  exact
                  to="/login"
                  activeclassname="active"
                >
                  Sign in
                  <i style={{ padding: "2px" }}>
                    <MdArrowForward />
                  </i>
                </Link>
              </Nav.Item>
            )}
          </Nav>
        </NavbarCollapse>
      </Navbar>
    </>
  );
}

export default Header;
