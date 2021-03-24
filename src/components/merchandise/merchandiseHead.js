import React from "react";
import "react-bootstrap";
import { Link } from "react-router-dom";
import "./merchandise.css";
function MerchandiseHead() {
  return (
    <>
      <div class="container-fluid clothes-background">
        <div class="row">
          <div class="col-md-4">
            <div
              class="card shadow-lg  p-0 my-5 mx-auto"
              style={{
                width: "20rem",
                borderRadius: "10px",
                overflow: "hidden",
              }}
            >
              <Link className="tLink" to="/tshirtmerchandise">
                <div class="card-header text-center">
                  <h5>T-Shirt</h5>
                </div>
              </Link>
              <img
                class="card-img-bottom"
                height="400px"
                src={
                  process.env.PUBLIC_URL + "/img/merchandise/merchandise5.jpg"
                }
                alt="T-shirt"
              />
            </div>
          </div>

          <div class="col-md-4 ">
            <div
              class="card shadow-lg p-0 my-5 mx-auto"
              style={{
                width: "20rem",
                borderRadius: "10px",
                overflow: "hidden",
              }}
            >
              <Link className="tLink" to="/tshirtmerchandise">
                <div class="card-header text-center">
                  <h5>Hoodie</h5>
                </div>
              </Link>
              <img
                class="card-img-bottom"
                height="400px"
                src={process.env.PUBLIC_URL + "/img/merchandise/Hoodie1.jpg"}
                alt="Hoodie"
              />
            </div>
          </div>
          <div class="col-md-4">
            <div
              class="card shadow-lg p-0 my-5 mx-auto"
              style={{
                width: "20rem",
                borderRadius: "10px",
                overflow: "hidden",
              }}
            >
              <Link className="tLink" to="/tshirtmerchandise">
                <div class="card-header text-center">
                  <h5>T-Shirt</h5>
                </div>
              </Link>
              <img
                class="card-img-bottom"
                height="400px"
                src={
                  process.env.PUBLIC_URL + "/img/merchandise/merchandise5.jpg"
                }
                alt="Zipper"
              />
            </div>
          </div>
          <div class="col-md-4">
            <div
              class="card shadow-lg p-0 my-5 mx-auto"
              style={{
                width: "20rem",
                borderRadius: "10px",
                overflow: "hidden",
              }}
            >
              <Link className="tLink" to="/tshirtmerchandise">
                <div class="card-header text-center">
                  <h5>T-Shirt</h5>
                </div>
              </Link>
              <img
                class="card-img-bottom"
                height="400px"
                src={
                  process.env.PUBLIC_URL + "/img/merchandise/merchandise5.jpg"
                }
                alt="Zipper"
              />
            </div>
          </div>
          <div class="col-md-4">
            <div
              class="card shadow-lg p-0 my-5 mx-auto"
              style={{
                width: "20rem",
                borderRadius: "10px",
                overflow: "hidden",
              }}
            >
              <Link className="tLink" to="/tshirtmerchandise">
                <div class="card-header text-center">
                  <h5>T-Shirt</h5>
                </div>
              </Link>
              <img
                class="card-img-bottom"
                height="400px"
                src={
                  process.env.PUBLIC_URL + "/img/merchandise/merchandise5.jpg"
                }
                alt="Zipper"
              />
            </div>
          </div>
          <div class="col-md-4">
            <div
              class="card shadow-lg p-0 my-5 mx-auto"
              style={{
                width: "20rem",
                borderRadius: "10px",
                overflow: "hidden",
              }}
            >
              <Link className="tLink" to="/tshirtmerchandise">
                <div class="card-header text-center">
                  <h5>T-Shirt</h5>
                </div>
              </Link>
              <img
                class="card-img-bottom"
                height="400px"
                src={
                  process.env.PUBLIC_URL + "/img/merchandise/merchandise5.jpg"
                }
                alt="Zipper"
              />
            </div>
          </div>
          <div class="col-md-4">
            <div
              class="card shadow-lg p-0 my-5 mx-auto"
              style={{
                width: "20rem",
                borderRadius: "10px",
                overflow: "hidden",
              }}
            >
              <Link className="tLink" to="/tshirtmerchandise">
                <div class="card-header text-center">
                  <h5>T-Shirt</h5>
                </div>
              </Link>
              <img
                class="card-img-bottom"
                height="400px"
                src={
                  process.env.PUBLIC_URL + "/img/merchandise/merchandise5.jpg"
                }
                alt="Zipper"
              />
            </div>
          </div>
          <div class="col-md-4">
            <div
              class="card shadow-lg p-0 my-5 mx-auto"
              style={{
                width: "20rem",
                borderRadius: "10px",
                overflow: "hidden",
              }}
            >
              <Link className="tLink" to="/tshirtmerchandise">
                <div class="card-header text-center">
                  <h5>T-Shirt</h5>
                </div>
              </Link>
              <img
                class="card-img-bottom"
                height="400px"
                src={
                  process.env.PUBLIC_URL + "/img/merchandise/merchandise5.jpg"
                }
                alt="Zipper"
              />
            </div>
          </div>
          <div class="col-md-4">
            <div
              class="card shadow-lg p-0 my-5 mx-auto"
              style={{
                width: "20rem",
                borderRadius: "10px",
                overflow: "hidden",
              }}
            >
              <Link className="tLink" to="/tshirtmerchandise">
                <div class="card-header text-center">
                  <h5>T-Shirt</h5>
                </div>
              </Link>
              <img
                class="card-img-bottom"
                height="400px"
                src={
                  process.env.PUBLIC_URL + "/img/merchandise/merchandise5.jpg"
                }
                alt="Zipper"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MerchandiseHead;
