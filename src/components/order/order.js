import React, { useState, useEffect } from "react";
import axios from "axios";
import OrderCard from "./ordercard";
import { useAuth } from "../../context/AuthContext";
import Spin from "../spinner/spinner";
function Order() {
  const { currentUser } = useAuth();
  const { uid, token } = JSON.parse(localStorage.getItem("userData"));
  const [orderList, setorderList] = useState([]);
  const [loading, setloading] = useState(false);

  const fetchlist = async () => {
    const orderitem = [];
    if (currentUser) {
      setloading(true);
      await axios
        .post(
          "http://localhost:4000/api/order/orderlist",
          { uid: uid },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          }
        )
        .then((res) => {
          const allItems = res.data.map((it) => {
            return axios
              .post(
                "http://localhost:4000/api/order/item",
                {
                  item: it,
                },
                { headers: { Authorization: token } }
              )
              .then((resp) => {
                const result = { id: it, ...resp.data };
                orderitem.push(result);
              })
              .catch((err) => {
                console.log(err);
              });
          });
          Promise.all(allItems).then(() => {
            setorderList(orderitem);

            setloading(false);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("login first");
    }
  };

  useEffect(() => {
    fetchlist();
  }, []);
  if (orderList !== undefined && loading === false) {
    if (orderList !== null) {
      return (
        <>
          <div className="orders">
            {orderList.map((item) => {
              return (
                <OrderCard
                  Address={item.Address}
                  cartitem={item.items}
                  billing={item.billing}
                />
              );
            })}
          </div>
        </>
      );
    }
  } else {
    return <Spin />;
  }
}

export default Order;
