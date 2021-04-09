import React, { useEffect, useState } from "react";
import CartCard from "./cartCard";
import "./cart.css";
import axios from "axios";
import { Link } from "react-router-dom";
import Spin from "../spinner/spinner";
import CheckoutCard from "../checkout/checkoutcard";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import baseUrl from "../baseUrl";
function Cart() {
  const [cart, setcart] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  const [itemQty, setitemQty] = useState(0);

  const history = useHistory();
  const { logout } = useAuth();
  const fetchcart = async () => {
    const { uid, token } = JSON.parse(localStorage.getItem("userData"));
    //fetching all item from cart
    await axios
      .post(
        `${baseUrl}/api/merchandise/cart/all`,
        { uid: uid },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      )
      .then((res) => {
        // setting the price the and quantity of item
        var tprice = 0;
        setcart(res.data);
        for (let item of res.data) {
          tprice += item.quantity * item.price;
        }
        setTotalPrice(tprice);
        setitemQty(res.data.length);
      })
      .catch(async (err) => {
        console.log(err);
        if (err.response.data.error === "Unauthenticated");
        {
          await logout();
          console.log("UnAuthenticated");
          history.push("/login");
          alert("Your session is expired");
        }
      });
  };
  useEffect(() => {
    fetchcart();
  }, []);
  if (cart !== undefined) {
    return (
      <>
        <div className=" cartt clothes-background py-3  ">
          {cart
            ? cart.map((item) => {
                return (
                  <div>
                    <CartCard product={item} fetchcart={fetchcart} />
                  </div>
                );
              })
            : null}
          <CheckoutCard price={totalPrice} itemNumber={itemQty} />
          <Link
            to={{
              pathname: "/checkout",
              state: {
                cartItem: cart,
                totalprice: totalPrice,
                itemNumber: itemQty,
              },
            }}
            className="btn btn-warning my-3 w-25"
          >
            Go to Payment
          </Link>
        </div>
      </>
    );
  } else {
    return <Spin />;
  }
}
export default Cart;
