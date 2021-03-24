import React from "react";
import { Card, Media } from "react-bootstrap";
import "./address.css";
function ChooseAddressCard(props) {
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

  return (
    <>
      <Card className="mx-auto  mt-2  text-white chooseaddressCard">
        <div className="gold-members p-4" style={{ paddingLeft: "2px" }}>
          <Media>
            <div className="media-body">
              <h6 className="mb-1 ">
                <u>{props.address.title}</u>
              </h6>
              <p className="text-black">{Address}</p>
              <p className="mb-0 text-black font-weight-bold"></p>
            </div>
          </Media>
        </div>
      </Card>
    </>
  );
}

export default ChooseAddressCard;
