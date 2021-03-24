import React, { useEffect, useState } from "react";
import "react-bootstrap";
import MerchandiseCard from "./merchandiseCard";
import axios from "axios";
import Spin from "../spinner/spinner";

function MerchandiseTshirt() {
  const [tshirt, setTshirt] = useState([]);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    setloading(true);
    const fetchdata = async () => {
      const result = await axios.get(
        "http://localhost:4000/api/merchandise/getAlltshirt"
      );
      if (result.data) {
        setTshirt(result.data);
        setloading(false);
      }
    };
    fetchdata();
    console.log("fetched");
  }, []);
  if (loading === false) {
    return (
      <>
        <div class="container-fluid clothes-background">
          <div class="row">
            {tshirt.map((item) => {
              console.log(item);
              return <MerchandiseCard product={item} />;
            })}
          </div>
        </div>
      </>
    );
  } else {
    return <Spin />;
  }
}

export default MerchandiseTshirt;
