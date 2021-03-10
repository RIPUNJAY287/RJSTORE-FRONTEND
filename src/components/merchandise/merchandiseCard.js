import axios from "axios";
import React from "react";
import "react-bootstrap";
import { useHistory } from "react-router-dom";
import { FaHeart, FaCartPlus } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function MerchandiseCard(props) {
  const { currentUser } = useAuth();
  const history = useHistory();
  const product = { quantity: 1, ...props.product };
  const addCartItem = async () => {
    if (currentUser) {
      const { uid, token } = JSON.parse(localStorage.getItem("userData"));
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
  const WishlistItem = async () => {
    console.log(currentUser);
    if (currentUser) {
      const { uid, token } = JSON.parse(localStorage.getItem("userData"));
      await axios
        .post(
          "http://localhost:4000/api/merchandise/addwishlist",
          { uid: uid, productId: props.product.id },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          }
        )
        .then((res) => {
          toast.success("Added to Wishlist", {
            draggable: false,
            hideProgressBar: true,
            closeOnClick: true,
            autoClose: 2000,
            position: toast.POSITION.TOP_CENTER,
          });
          console.log("added to wishlist");
        });
    } else {
      history.push("./login");
      alert("login first");
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
          <button onClick={WishlistItem} class="btn btn-danger rounded-circle">
            <FaHeart />
          </button>
          <button
            onClick={addCartItem}
            class="btn btn-success rounded float-right"
          >
            <FaCartPlus />
          </button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default MerchandiseCard;
