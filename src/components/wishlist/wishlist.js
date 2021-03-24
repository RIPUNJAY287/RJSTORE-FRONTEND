import React, { useEffect, useState } from "react";
import "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import WishlistCard from "./wishlistCard";
import Spin from "../spinner/spinner";
function WishList() {
  const { currentUser } = useAuth();

  const { uid, token } = JSON.parse(localStorage.getItem("userData"));
  const [wishList, setwishList] = useState();

  const fetchlist = async () => {
    const wishitem = [];
    if (currentUser) {
      await axios
        .post(
          "http://localhost:4000/api/merchandise/getwishlist",
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
                "http://localhost:4000/api/merchandise/gettshirt",
                {
                  item: it,
                },
                { headers: { Authorization: token } }
              )
              .then((resp) => {
                const result = { id: it, ...resp.data };
                wishitem.push(result);
              })
              .catch((err) => {
                console.log(err);
              });
          });
          Promise.all(allItems).then(() => {
            console.log("wishlist");
            setwishList(wishitem);
            console.log("wishlist after");
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
  if (wishList != undefined && wishList != null) {
    if (wishList.length == 0) {
      return (
        <div
          class="container-fluid clothes-background text-center"
          style={{ height: "700px", color: "gray", paddingTop: "20%" }}
        >
          <h2> LIST IS EMPTY </h2>
        </div>
      );
    } else {
      return (
        <>
          <div
            class="container-fluid clothes-background"
            style={{ minHeight: "700px" }}
          >
            <div class="row">
              {wishList.map((item) => {
                console.log(item);
                return <WishlistCard fetchlist={fetchlist} product={item} />;
              })}
            </div>
          </div>
        </>
      );
    }
  } else {
    return <Spin />;
  }
}

export default WishList;
