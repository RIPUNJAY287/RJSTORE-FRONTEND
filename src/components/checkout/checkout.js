import React, { useEffect } from "react";
import CheckoutCard from "./checkoutcard";
import { Button } from "react-bootstrap";
import axios from "axios";
import { withRouter } from "react-router";
function loadrazorpay(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

function Checkout(props) {
  const { location } = props;
  const { uid, token, name, phone, email } = JSON.parse(
    localStorage.getItem("userData")
  );
  //RAZORPAY CALL
  async function displayRazorpay() {
    const res = await loadrazorpay(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const payment = await axios
      .post(
        "http://localhost:4000/api/payment/razorpay",
        {
          type: 1,
          uid: uid,
          price: "500",
        },
        {
          headers: { "Content-Type": "application/json", Authorization: token },
        }
      )
      .then((res) => {
        console.log(res);

        const options = {
          key: process.env.REACT_APP_RAZORPAY_API_KEY,
          currency: res.data.currency,
          amount: res.data.amount.toString(),
          order_id: res.data.id,
          name: "Merchandise Order",
          description: "Thank you for nothing. Please give us some money",
          handler: async function (response) {
            const newdate = new Date();

            console.log(response);
            console.log(response.razorpay_payment_id);
            console.log(response.razorpay_order_id);
            console.log(response.razorpay_signature);
            console.log("response from razorpay");
            // console.log("successful payment done");
            /*  await axios
              .post(
                `${BaseUrl}/api/order/add`,
                {
                  userId: uid,
                  Address: orderData.addressData,
                  items: orderData.cartItems,
                  billing: {
                    baseprice: total,
                    discount: discount,
                    deliveryCharge: 49,
                    finalAmount: totalAmount,
                    promocode: applyPromocode,
                    orderTime: {
                      timestamp: newdate.getTime(),
                    },
                    paymentMethod: "ONLINE",
                  },
                  orderStatus: 0,
                  paymentId: response.razorpay_payment_id,
                  id: response.razorpay_order_id,
                  RazorpaySignature: response.razorpay_signature,
                },
                {
                  headers: { Authorization: token },
                }
              )
              .then((t) => {
                // console.log(t);
              })
              .catch((err) => {
                console.log(err.response);
              });
            */
          },

          prefill: {
            name: name,
            email: email,
            phone_number: phone,
          },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        // document.getElementsByClassName("modal-close").addEventListener('click',()=>{
        // 	console.log("cliked");
        // })
        paymentObject.on("payment.failed", function (response) {
          console.log("you failed to log in");
          // console.log(response);
          //  setLoading(true);
          //    history.push("./failed");
          // console.log('Payment failed');
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <>
      <div className="bg-success py-3">
        <CheckoutCard
          price={props.location.state.totalprice}
          itemNumber={props.location.state.itemNumber}
        />
        <div className="text-center">
          <Button
            className="btn btn-danger my-2"
            style={{ width: "20%" }}
            onClick={displayRazorpay}
          >
            Pay Now
          </Button>
        </div>
      </div>
    </>
  );
}
export default Checkout;
