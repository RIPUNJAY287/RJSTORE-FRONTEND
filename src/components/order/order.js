import React, { useState, useEffect } from "react";
import axios from "axios";
import OrderCard from "./ordercard";
import { useAuth } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";
import Spin from "../spinner/spinner";
function Order() {
  const { currentUser, logout } = useAuth();

  const history = useHistory();
  const { uid, token } = JSON.parse(localStorage.getItem("userData"));
  const [orderList, setorderList] = useState([]);
  const [loading, setloading] = useState(false);

  const fetchlist = async () => {
    const orderitem = [];
    if (currentUser) {
      setloading(true);
      //fetching the list of order by the user
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
          // fetching the orders from the list
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
              .catch(async (err) => {
                if (err.response.data.error === "Unauthenticated");
                {
                  await logout();
                  console.log("UnAuthenticated");
                  history.push("/login");
                }
              });
          });
          Promise.all(allItems).then(() => {
            setorderList(orderitem);

            setloading(false);
          });
        })
        .catch(async (err) => {
          if (err.response.data.error === "Unauthenticated");
          {
            await logout();
            console.log("UnAuthenticated");
            history.push("/login");
          }
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
