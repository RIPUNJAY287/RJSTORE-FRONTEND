import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, Media } from "react-bootstrap";
import EditAddressModal from "./EditAddressModal";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import baseUrl from "../baseUrl";
import axios from "axios";
function AddressCard(props) {
  const [editModal, showEditModal] = useState(false);
  const history = useHistory();
  const { logout } = useAuth();

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

  // to hide the modal
  const hideEditModal = () => showEditModal(false);
  //to delete the address
  const onDeleteClick = async () => {
    // removing the address
    const { token, uid } = JSON.parse(localStorage.getItem("userData"));
    await axios
      .post(
        `${baseUrl}/api/user/address/remove`,
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
      .catch(async (err) => {
        // if user is unauthenticated then logging out the user
        if (err.response.data.error === "Unauthenticated");
        {
          await logout();
          console.log("UnAuthenticated");
          history.push("/login");
          alert("Your session is expired");
        }
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
