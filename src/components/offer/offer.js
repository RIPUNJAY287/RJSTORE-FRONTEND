import React, { useEffect, useState } from "react";
import OfferCard from "./offercard";
import axios from "axios";
import Spin from "../spinner/spinner";
function Offer(props) {
  const { uid, token } = JSON.parse(localStorage.getItem("userData"));
  const [promoData, setpromoData] = useState([]);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    (async () => {
      setloading(true);
      await axios
        .post(
          "http://localhost:4000/api/promocode/getAll",
          {
            uid: uid,
          },
          {
            headers: { Authentication: token },
          }
        )
        .then((res) => {
          setpromoData(res.data);

          setloading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    })();
  }, []);

  if (promoData !== undefined && loading === false) {
    return (
      <>
        <div className="bg-danger">
          {promoData.map((item) => {
            console.log(item);
            return <OfferCard promo={item} />;
          })}
        </div>
      </>
    );
  } else {
    return <Spin />;
  }
}
export default Offer;
