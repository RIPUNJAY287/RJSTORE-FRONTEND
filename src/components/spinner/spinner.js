import React from "react";
import { Spinner } from "react-bootstrap";

function Spin() {
  return (
    <div style={{ marginLeft: "50%", marginTop: "20%", marginBottom: "10%" }}>
      <div
        className="spinner-border text-success spinner-border-lg"
        role="status"
      ></div>
    </div>
  );
}
export default Spin;
