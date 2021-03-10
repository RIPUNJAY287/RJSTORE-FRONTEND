import React, { useEffect, useState } from "react";
import "./cart.css";
import axios from "axios";
import { Button } from "react-bootstrap";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import Spin from "../spinner/spinner";
function CartCard(props) {
  const { uid, token } = JSON.parse(localStorage.getItem("userData"));
  const [qty, setqty] = useState(props.product.quantity);
  const [loading, setloading] = useState(false);
  const description =
    props.product.details.color +
    " " +
    props.product.details.size +
    " " +
    props.product.details.brand;

  const itemIncrement = async () => {
    setqty(qty + 1);
  };
  const itemDecrement = async () => {
    if (qty > 1) {
      setqty(qty - 1);
    }
  };
  useEffect(() => {
    (async () => {
      setloading(true);
      console.log(qty);
      await axios
        .post(
          "http://localhost:4000/api/merchandise/cart/update",
          {
            uid: uid,
            cartid: props.product.cartid,
            quantity: qty,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          }
        )
        .then((res) => {
          console.log("cart updated");
          setloading(false);
          props.isupdated(Math.random());
        })
        .catch((err) => {});
    })();
  }, [qty]);

  const removeItem = async () => {
    await axios
      .post(
        "http://localhost:4000/api/merchandise/cart/remove",
        {
          uid: uid,
          productId: props.product.cartid,
        },
        {
          headers: { "Content-Type": "application/json", Authorization: token },
        }
      )
      .then((res) => {
        toast.error("Removed from Wishlist", {
          draggable: false,
          hideProgressBar: true,
          closeOnClick: true,
          autoClose: 2000,
          position: toast.POSITION.TOP_CENTER,
        });
        props.isupdated(Math.random());
      })
      .catch((err) => {
        console.log(err);
      });
  };
  if (loading === false) {
    return (
      <>
        <div className="row text-center mx-auto my-2 cartRow ">
          <div className="col-md-3 p-0 m-0 text-center">
            <img
              className="cartpic p-1"
              src={process.env.PUBLIC_URL + "/img/merchandise/merchandise1.jpg"}
            />
            <p className="p-0 m-0 ">
              <AiOutlineMinusCircle
                className="addminus"
                onClick={itemDecrement}
              />{" "}
              {qty}{" "}
              <AiOutlinePlusCircle
                className="addminus"
                onClick={itemIncrement}
              />
            </p>
          </div>
          <div className=" col-md-9">
            <h6 className="text-center pt-1 ">{props.product.title}</h6>

            <p className="">{description}</p>
          </div>
          <Button
            variant="light"
            className="text-dark w-100 p-1 rounded-0 "
            style={{ borderStyle: "none" }}
            onClick={removeItem}
          >
            <span className="text-danger  font-weight-bold "> X</span> Remove
            From Cart
          </Button>
        </div>

        <ToastContainer />
      </>
    );
  } else {
    return (
      <>
        <div className="row text-center mx-auto my-2 cartRow ">
          <Spin className="my-auto" />
          <Button
            variant="light"
            className="text-dark w-100 p-1 rounded-0 "
            style={{ borderStyle: "none" }}
            onClick={removeItem}
          >
            <span className="text-danger  font-weight-bold "> X</span> Remove
            From Cart
          </Button>
        </div>
      </>
    );
  }
}
export default CartCard;
