import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { NavLink, Switch, Route, useHistory } from "react-router-dom";
import { MdLocationOn, MdLocalOffer } from "react-icons/md";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import "./account.css";
import Address from "../address/address";
import Offer from "../offer/offer";
import Order from "../order/order";
import baseUrl from "../baseUrl";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
function Profile() {
  const [name, setName] = useState("-");
  const [email, setEmail] = useState("-");
  const [phone, setPhone] = useState("-");
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  useEffect(() => {
    if (currentUser !== null) {
      const { uid, token } = JSON.parse(localStorage.getItem("userData"));
      (async () => {
        await axios
          .post(
            `${baseUrl}/api/user/getDetails`,
            {
              uid: uid,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: token,
              },
            }
          )
          .then((res) => {
            setName(res.data.name);
            setEmail(res.data.email);
            setPhone(res.data.phone);
          });
      })();
    } else {
      (async () => {
        await logout();
        console.log("UnAuthenticated");
        history.push("/login");
        alert("your session is expired");
      })();
    }
  }, []);

  return (
    <>
      <section className="section pt-4 pb-4 clothes-background">
        <Container>
          <Row>
            <Col md={3}>
              <div className=" shadow-sm  h-100 profile">
                <div className="profiledetail text-center">
                  <div
                    className="p-1"
                    style={{ fontFamily: "FreeMono, monospace" }}
                  >
                    <h5
                      style={{
                        fontFamily: "Andale Mono, monospace",
                        fontWeight: "700",
                      }}
                    >
                      Your Details
                    </h5>
                    <h6>{name}</h6>
                    <h6>{email}</h6>
                    <h6>{phone}</h6>
                    <hr color="white" />
                  </div>
                </div>

                <ul className="nav flex-column border-0 pt-1 pb-4">
                  <li className="nav-item w-100">
                    <NavLink
                      className="nav-link text-white text-center "
                      activeClassName="active"
                      exact
                      to="/profile/orders"
                    >
                      <i className="m-1">
                        <IoCheckmarkCircleSharp />
                      </i>
                      Orders
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link text-white text-center"
                      activeClassName="active"
                      exact
                      to="/profile/offer"
                    >
                      <i className="m-1">
                        <MdLocalOffer />
                      </i>
                      Offers
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink
                      className="nav-link text-white text-center"
                      activeClassName="active"
                      exact
                      to="/profile/address"
                    >
                      <i className="m-1">
                        <MdLocationOn />
                      </i>
                      Addresses
                    </NavLink>
                  </li>
                </ul>
              </div>
            </Col>
            <Col md={9}>
              {/* here is the route to order , offer and address  */}
              <Switch>
                <Route path="/profile/orders" exact component={Order} />
                <Route path="/profile/offer" exact component={Offer} />
                <Route path="/profile/address" exact component={Address} />
              </Switch>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
export default Profile;
