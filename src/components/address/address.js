import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import "./address.css";
import AddressCard from "./addressCard";
import AddAddressModal from "./AddAddressModal";
import Spin from "../spinner/spinner";
function Address() {
  const { uid, token } = JSON.parse(localStorage.getItem("userData"));
  const [addressModal, showAddressModal] = React.useState(false);
  const [address, setaddress] = useState([]);
  const hideAddressModal = () => showAddressModal(false);
  const [updated, isupdated] = useState();
  useEffect(() => {
    const fetchdata = async () => {
      await axios
        .post(
          "http://localhost:4000/api/user/address/get",
          {
            uid: uid,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          setaddress(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchdata();
  }, [updated]);

  {
    if (address != undefined) {
      return (
        <>
          <div className="text-center">
            {address
              ? address.map((item) => {
                  console.log("item is here");
                  console.log(item);

                  return (
                    <div>
                      <AddressCard address={item} isupdated={isupdated} />
                    </div>
                  );
                })
              : null}

            <AddAddressModal
              show={addressModal}
              isupdated={isupdated}
              onHide={hideAddressModal}
            />

            <Button
              className="btn btn-warning mt-4 "
              onClick={() => {
                showAddressModal(true);
              }}
              style={{ width: "40%" }}
            >
              Add Address
            </Button>
          </div>
        </>
      );
    } else {
      return <Spin />;
    }
  }
}
export default Address;
