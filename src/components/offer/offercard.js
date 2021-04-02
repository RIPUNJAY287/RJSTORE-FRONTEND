import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import "./offer.css";
function OfferCard(props) {
  const [copySuccess, setCopySuccess] = useState("");
  // to copy the code to clipboard
  const copyToClipboard = async (copy) => {
    try {
      await navigator.clipboard.writeText(copy);
      setCopySuccess("Copied!");
    } catch (err) {
      setCopySuccess("Failed to copy!");
    }
  };
  return (
    <>
      <div className=" float-left offerCard">
        <Card className="Offercard text-white">
          <Card.Body>
            <Card.Title className="card-title">
              {props.promo.Description}
            </Card.Title>
            <Card.Subtitle className="mb-2 text-block">
              {props.promo.Percentage} % off
            </Card.Subtitle>
            <Card.Text>
              this offer is valid till {props.promo.Expiry.day}/
              {props.promo.Expiry.month}/{props.promo.Expiry.year}
            </Card.Text>
            <Button
              variant="outline-light"
              size="sm"
              onClick={copyToClipboard(props.promo.code)}
            >
              {" "}
              {props.promo.code}
            </Button>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

export default OfferCard;
