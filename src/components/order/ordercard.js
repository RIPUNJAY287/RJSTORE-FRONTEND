import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import axios from "axios";
import "./order.css";
function OrderCard(props) {
  const history = useHistory();
  const [deliveryStatus, setDeliveryStatus] = useState("");
  const [loading, setLoading] = useState(false);

  return <></>;
}

export default OrderCard;
