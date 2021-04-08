import React from "react";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import "./order.css";
function OrderCard(props) {
  const orderAddress =
    props.Address.houseNumber +
    " " +
    props.Address.line1 +
    " " +
    props.Address.line2 +
    " " +
    props.Address.city +
    " " +
    props.Address.state;

  var orderitem = "| ";
  props.cartitem.map((item) => {
    orderitem += item.title + " | ";
  });
  return (
    <>
      <div className="row mx-auto my-2 orderRow ">
        <div className="col-md-3 col-lg-2 p-0 m-0 text-left ">
          <img
            className="cartpic p-1  ml-0"
            src={process.env.PUBLIC_URL + "/img/merchandise/merchandise1.jpg"}
          />
        </div>
        <div className=" col-md-9 text-center">
          <h6 className="text-center pt-1 ">
            Address : {orderAddress} <br></br>
          </h6>

          <p>{orderitem}</p>
          <p>
            Rs {props.billing.finalAmount} - {props.billing.paymentMethod}
          </p>
          <div className="col-12">
            <p className="text-success ">
              SUCCESSFULL ORDER <IoCheckmarkCircleSharp className="mb-1" />
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderCard;
