import React, { useEffect, useState } from "react";
import "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import WishlistCard from "./wishlistCard";
import Spin from "../spinner/spinner";
function WishList() {
  const { currentUser } = useAuth();
  const history = useHistory();
  const { uid, token } = JSON.parse(localStorage.getItem("userData"));
  const [wishList, setwishList] = useState();
  const [updated, isupdated] = useState();
  useEffect(() => {
    console.log(currentUser ? "not null" : "null");
    const wishitem = [];
    const fetchlist = async () => {
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
    fetchlist();
  }, [updated]);
  if (wishList != undefined && wishList != null) {
    return (
      <>
        <div class="container-fluid ">
          <div class="row">
            {wishList.map((item) => {
              console.log(item);
              return <WishlistCard isupdated={isupdated} product={item} />;
            })}
          </div>
        </div>
      </>
    );
  } else {
    return <Spin />;
  }
}

export default WishList;
