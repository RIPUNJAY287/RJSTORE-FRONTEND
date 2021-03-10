import axios from "axios";
import React, { useState } from "react";
import "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FaCartPlus, FaHeartBroken } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";

function WishlistCard(props) {
  const { currentUser } = useAuth();
  const history = useHistory();
  const { uid, token } = JSON.parse(localStorage.getItem("userData"));
  const product = { quantity: 1, ...props.product };
  const addCartItem = async () => {
    if (currentUser) {
      await axios
        .post(
          "http://localhost:4000/api/merchandise/cart/add",
          { uid: uid, product: product },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          }
        )
        .then((res) => {
          toast.success("Added to Cart", {
            draggable: false,
            hideProgressBar: true,
            closeOnClick: true,
            autoClose: 2000,
            position: toast.POSITION.TOP_CENTER,
          });
          console.log("added to cart");
        });
    } else {
      history.push("./login");
      alert("login first");
    }
  };
  const WishlistRemove = async () => {
    try {
      const res = await axios.post(
        "http://localhost:4000/api/merchandise/wishlist/remove",
        {
          uid: uid,
          productId: props.product.id,
        },
        {
          headers: { "Content-Type": "application/json", Authorization: token },
        }
      );
      if (res) {
        toast.error("Removed from Wishlist", {
          draggable: false,
          hideProgressBar: true,
          closeOnClick: true,
          autoClose: 2000,
          position: toast.POSITION.TOP_CENTER,
        });
        props.isupdated(Math.random());
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div
        class="card container shadow p-0 my-5 mx-auto text-center "
        style={{ width: "20rem" }}
      >
        <img
          class="card-img-top"
          height="350px"
          src={process.env.PUBLIC_URL + "/img/merchandise/merchandise3.jpg"}
          alt="T-Shirt"
        />
        <h5 className="m-auto">{props.product.title}</h5>
        <div class="card-footer text-center ">
          <h5 class="float-left mt-1">Rs {props.product.price}</h5>
          <button
            onClick={WishlistRemove}
            class="btn btn-danger rounded-circle"
          >
            <FaHeartBroken />
          </button>
          <button
            class="btn btn-success rounded float-right"
            onClick={addCartItem}
          >
            <FaCartPlus />
          </button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default WishlistCard;
