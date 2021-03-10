import React from "react";
import { Jumbotron, Container } from "react-bootstrap";
import Caro from "./carousel/carousel";
import "./home.css";
function Home(props) {
  return (
    <>
      <div>
        <Caro />
        <Jumbotron fluid className="mt-2">
          <Container>
            <h1>Here is Some Exclusife offer</h1>
            <p>Buy 3 T-shirt and and get 1 Free with 20% discount</p>
            <h2 classNam="text">Buy Now</h2>
          </Container>
        </Jumbotron>
      </div>
    </>
  );
}

export default Home;
