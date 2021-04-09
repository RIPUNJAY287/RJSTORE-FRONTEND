import React, { useEffect, useState } from "react";
import "./cart.css";
import axios from "axios";
import { Button } from "react-bootstrap";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import Spin from "../spinner/spinner";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import baseUrl from "../baseUrl";
function CartCard(props) {
  const [qty, setqty] = useState(props.product.quantity);
  const [loading, setloading] = useState(false);
  const history = useHistory();
  const { logout } = useAuth();
  const description =
    "Color : " +
    props.product.details.color +
    " | " +
    "Size : " +
    props.product.details.size +
    " | " +
    " Brand : " +
    props.product.details.brand;
  //change the quantity of item and changing the variable named qty
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

      // updating the quantity of item in cart
      const { uid, token } = JSON.parse(localStorage.getItem("userData"));
      await axios
        .post(
          `${baseUrl}/api/merchandise/cart/update`,
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
          setloading(false);
          props.fetchcart();
          //after cart is updated , fetching the all the item in cart
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
    })();
  }, [qty]);

  // to remove the item from the cart
  const removeItem = async () => {
    const { uid, token } = JSON.parse(localStorage.getItem("userData"));
    await axios
      .post(
        `${baseUrl}/api/merchandise/cart/remove`,
        {
          uid: uid,
          productId: props.product.cartid,
        },
        {
          headers: { "Content-Type": "application/json", Authorization: token },
        }
      )
      .then((res) => {
        //this is toast
        toast.error("Removed from Wishlist", {
          draggable: false,
          hideProgressBar: true,
          closeOnClick: true,
          autoClose: 2000,
          position: toast.POSITION.TOP_CENTER,
        });
        props.fetchcart();
      })
      .catch(async (err) => {
        if (err.response.data.error === "Unauthenticated");
        {
          await logout();
          console.log("UnAuthenticated");
          history.push("/login");
          alert("Your session is expired");
        }
      });
  };
  if (loading === false) {
    return (
      <>
        <div className="row text-center mx-auto my-2 cartRow rounded ">
          <div className="col-md-3 p-0 m-0 text-center">
            <img className="cartpic p-1" src={props.product.ImgLink} />
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

            <p>{description}</p>
            <p>Rs {props.product.price}</p>
          </div>
          <Button
            variant="light"
            className="text-dark w-100 p-1 rounded-0  border"
            style={{ borderStyle: "none", fontSize: "15px" }}
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
