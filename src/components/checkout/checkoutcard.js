import React from "react";
import { Card } from "react-bootstrap";

function CheckoutCard(props) {
  return (
    <>
      <div className="row text-left">
        <div className="col-lg-3 col-md-5 col-sm-6 mx-auto my-4">
          <Card>
            <Card.Header>PRICE DETAILS</Card.Header>
            <Card.Body>
              <p className="float-right"> {props.itemNumber}</p>
              <p>No. of Item</p>
              <p className="float-right">Rs {props.price} </p>
              <p>Price</p>
              <p className="float-right">Rs 0</p>
              <p>discount </p>
            </Card.Body>

            <Card.Footer>
              <p className="float-right m-0 p-0">Rs {props.price} </p>TOTAL
              PRICE
            </Card.Footer>
          </Card>
        </div>
      </div>
    </>
  );
}
export default CheckoutCard;
