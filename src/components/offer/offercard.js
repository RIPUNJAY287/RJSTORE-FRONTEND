import React from "react";
import { Card, Media, Button } from "react-bootstrap";

function OfferCard(props) {
  const { token, uid } = JSON.parse(localStorage.getItem("userData"));

  return (
    <>
      <Card className="shadow-sm mb-4">
        <Card.Body>
          <Card.Title className="card-title">Promo title</Card.Title>
          <Card.Subtitle className="mb-2 text-block">50 % off</Card.Subtitle>
          <Card.Text>this offer is valid till 29th april</Card.Text>
          <Button variant="link" className="card-btn mr-3 p-0">
            COPY CODE
          </Button>
        </Card.Body>
      </Card>
    </>
  );
}

export default OfferCard;
