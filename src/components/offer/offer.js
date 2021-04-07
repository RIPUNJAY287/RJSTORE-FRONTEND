import React, { useEffect, useState } from "react";
import OfferCard from "./offercard";
import axios from "axios";
import Spin from "../spinner/spinner";
import { useAuth } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";
function Offer(props) {
  const { uid, token } = JSON.parse(localStorage.getItem("userData"));
  const [promoData, setpromoData] = useState([]);
  const [loading, setloading] = useState(false);
  const { logout } = useAuth();
  const history = useHistory();
  useEffect(() => {
    (async () => {
      setloading(true);
      // fetching all the promocodes
      await axios
        .get("http://localhost:4000/api/promocode/getAll")
        .then((res) => {
          setpromoData(res.data);

          setloading(false);
        })
        .catch(async (err) => {
          if (err.response.data.error === "Unauthenticated");
          {
            await logout();
            console.log("UnAuthenticated");
            history.push("/login");
          }
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
