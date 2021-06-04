import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import SectionHeading from "./SectionHeading";
import "./termsOfServices.css";
function AboutUs(props) {
  return (
    <>
      <section className="section pt-5 pb-5 bg-white homepage-add-section food-background">
        <Container>
          <Row>
            <Col md={12} xs={12}>
              <blockquote
                class="blockquote blockquote-custom  p-5 shadow rounded"
                style={{ background: "white" }}
              >
                <SectionHeading heading="About Us" subHeading="" />
                <p
                  class="mb-0 mt-2 font-italic psamll"
                  style={{ fontSize: "14px", color: "#454040" }}
                >
                  Its hightime you wave Hi to new cool, stylish and best quality
                  Tshirt with brand new design and color , and Bye to Old
                  fashion Tshirt!!
                  <br />
                  At RJ STORE, we envision a strong, quality and sustainable
                  Tshirt delivery, ensuring the best of quality checks being
                  done, before it ship from here.
                  <br />
                  Let's be honest here. It's insane to compromise on the quality
                  of Tshirt. Being casual in this aspect can make you pay loss
                  in confidence in this modern era.
                  <br />
                  We at RJSTORE ensure that that our customers get the premium
                  of quality Tshirt without compromising with the quantity.
                  <br />
                  So what are you waiting for? Go check out new Tshirt and place
                  your first order today. We are just a fingertip away!!!!
                </p>
              </blockquote>
            </Col>
            {/* <Col md={4} xs={6}>
								<blockquote class="blockquote blockquote-custom  p-5 shadow rounded" style={{height:'300px',background:'#f0f0f0'}}>
									<div class="blockquote-custom-icon bg-info shadow-sm"><i class="fa fa-quote-left text-white"></i></div>
									<h4 className="mb-2 font-weight-normal"><span className="font-weight-bold">Quality</span></h4>
									<p class="mb-0 mt-2 font-italic">"Fooddude provides you the best food ranging from several
							cuisines from the best kitchens throughout the city. We assure you of satisfying your palette minus
							the food colours and unnecessary oil."</p>

								</blockquote>
							</Col>
							<Col md={4} xs={6}>
								<blockquote class="blockquote blockquote-custom  p-5 shadow rounded" style={{background:'#f0f0f0'}}>
									<div class="blockquote-custom-icon bg-info shadow-sm"><i class="fa fa-quote-left text-white"></i></div>
									<h4 className="mb-2 font-weight-normal"><span className="font-weight-bold">Hygiene</span></h4>
									<p class="mb-0 mt-2 font-italic">"The pandemic has forced us to rethink our
							sanitary practices. But, Fooddude promises that you'll never have to think twice while ordering from us.
							Our delivery agents are checked and sanitized regularly
							 and use masks and gloves throughout the process to ensure your food reaches to you safely."</p>

								</blockquote>
							</Col> */}
          </Row>
        </Container>
      </section>
    </>
  );
}

const options = {
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 2,
    },
    1000: {
      items: 4,
    },
    1200: {
      items: 4,
    },
  },

  lazyLoad: true,
  pagination: false.toString(),
  loop: true,
  dots: false,
  autoPlay: 2000,
  nav: true,
  navText: [
    "<i class='fa fa-chevron-left'></i>",
    "<i class='fa fa-chevron-right'></i>",
  ],
};

export default AboutUs;
