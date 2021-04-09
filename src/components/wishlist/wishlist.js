import React, { useEffect, useState } from "react";
import "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import WishlistCard from "./wishlistCard";
import Spin from "../spinner/spinner";
import baseUrl from "../baseUrl";
import { useHistory } from "react-router-dom";
function WishList() {
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  const [wishList, setwishList] = useState();

  const fetchlist = async () => {
    const wishitem = [];
    if (currentUser) {
      const { uid, token } = JSON.parse(localStorage.getItem("userData"));
      // fetching the list of wishlist item
      await axios
        .post(
          `${baseUrl}/api/merchandise/getwishlist`,
          { uid: uid },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          }
        )
        .then((res) => {
          // fetching the wishlist item
          const allItems = res.data.map((it) => {
            return axios
              .post(
                `${baseUrl}/api/merchandise/gettshirt`,
                {
                  item: it,
                },
                { headers: { Authorization: token } }
              )
              .then((resp) => {
                const result = { id: it, ...resp.data };
                wishitem.push(result);
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
          });
          Promise.all(allItems).then(() => {
            setwishList(wishitem);
          });
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
    } else {
      console.log("login first");
    }
  };

  useEffect(() => {
    fetchlist();
  }, []);
  if (wishList !== undefined && wishList !== null) {
    if (wishList.length === 0) {
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
