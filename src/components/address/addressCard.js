import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Media, Button } from "react-bootstrap";
import EditAddressModal from "./EditAddressModal";
import axios from "axios";
function AddressCard(props) {
  const [editModal, showEditModal] = useState(false);
  const { token, uid } = JSON.parse(localStorage.getItem("userData"));
  const Address =
    props.address.houseNumber +
    " " +
    props.address.line1 +
    " " +
    props.address.line2 +
    " " +
    props.address.city +
    " " +
    props.address.state;

  const hideEditModal = () => showEditModal(false);
  const onDeleteClick = async () => {
    await axios
      .post(
        "http://localhost:4000/api/user/address/remove",
        {
          uid: uid,
          addressId: props.address.id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      )
      .then((res) => {
        props.fetchdata();
        console.log("address removed");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <EditAddressModal
        show={editModal}
        fetchdata={props.fetchdata}
        addressId={props.address.id}
        onHide={hideEditModal}
      />
      <Card className="mx-auto text-white mt-2 addressCard">
        <div className="gold-members p-4" style={{ paddingLeft: "2px" }}>
          <Media>
            <div className="media-body">
              <h6 className="mb-1 text-white">
                <u>{props.address.title}</u>
              </h6>
              <p className="text-black">{Address}</p>
              <p className="mb-0 text-black font-weight-bold">
                <Link
                  className="text-primary mr-3"
                  to="#"
                  onClick={() => {
                    showEditModal(true);
                  }}
                >
                  EDIT
                </Link>
                <Link className="text-danger" to="#" onClick={onDeleteClick}>
                  DELETE
                </Link>
              </p>
            </div>
          </Media>
        </div>
      </Card>
    </>
  );
}

export default AddressCard;
