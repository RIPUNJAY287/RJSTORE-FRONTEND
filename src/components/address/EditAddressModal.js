import React from "react";
import { Form, InputGroup, Modal, Button } from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import baseUrl from "../baseUrl";
export default function EditAddressModal(props) {
  const housenoRef = React.useRef();
  const line1Ref = React.useRef();
  const line2Ref = React.useRef();
  const cityRef = React.useRef();
  const stateRef = React.useRef();
  const pincodeRef = React.useRef();
  const titleRef = React.useRef();

  const history = useHistory();
  const { logout } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const address = {
      title: titleRef.current.value,
      houseNumber: housenoRef.current.value,
      line1: line1Ref.current.value,
      line2: line2Ref.current.value,
      city: cityRef.current.value,
      state: stateRef.current.value,
      pincode: pincodeRef.current.value,
    };
    // to edit your address
    try {
      // checking if pincode is available for delivery
      const { token, uid } = JSON.parse(localStorage.getItem("userData"));
      await axios
        .post(`${baseUrl}/api/pincode/check`, {
          pincode: pincodeRef.current.value,
        })
        .then(async (resp) => {
          // if availbale then edit the address
          if (resp.data.success === true) {
            await axios
              .post(
                `${baseUrl}/api/user/address/edit`,
                {
                  address: address,
                  uid: uid,
                  addressId: props.addressId,
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
                props.onHide();
              })
              .catch(async (err) => {
                // if the user is authenticated then logging out the user
                if (err.response.data.error === "Unauthenticated");
                {
                  await logout();
                  console.log("UnAuthenticated");
                  history.push("/login");
                  alert("Your session is expired");
                }
              });
          } else {
            // if pincode is not available then alert the user for this
            alert("Pincode is not available for Delivery, Change your Address");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal show={props.show} onHide={props.onHide} centered>
      <Modal.Header closeButton={true}>
        <Modal.Title as="h5" id="add-address">
          Edit Address
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <div className="form-row">
            <Form.Group className="col-md-12">
              <Form.Label>Title</Form.Label>
              <InputGroup>
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder="title"
                  ref={titleRef}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group className="col-md-12">
              <Form.Label>House No.</Form.Label>
              <InputGroup>
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder="House no."
                  ref={housenoRef}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group className="col-md-12">
              <Form.Label>Address Line 1</Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  size="sm"
                  placeholder="Line 1"
                  ref={line1Ref}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group className="col-md-12">
              <Form.Label>Address Line 2</Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  size="sm"
                  placeholder="Line 2"
                  ref={line2Ref}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group className="col-md-12">
              <Form.Label>City</Form.Label>
              <InputGroup>
                <Form.Control
                  size="sm"
                  type="text"
                  readOnly
                  value="Bhubaneswar"
                  ref={cityRef}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group className="col-md-12">
              <Form.Label>State</Form.Label>
              <InputGroup>
                <Form.Control
                  size="sm"
                  type="text"
                  readOnly
                  value="Orisha"
                  ref={stateRef}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group className="col-md-12">
              <Form.Label>Pincode</Form.Label>
              <InputGroup>
                <Form.Control
                  size="sm"
                  type="number"
                  placeholder="Pincode"
                  ref={pincodeRef}
                />
              </InputGroup>
            </Form.Group>
          </div>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button
          type="button"
          onClick={handleSubmit}
          variant="primary"
          className="d-flex w-50 text-center justify-content-center"
        >
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
