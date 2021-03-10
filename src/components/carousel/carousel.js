import React,{useState} from 'react';
import {Carousel} from 'react-bootstrap';
import './carousel.css';
function Caro(){
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  return( 
    <div >
    <Carousel activeIndex={index} onSelect={handleSelect}>
    <Carousel.Item>
      <img
        src = {process.env.PUBLIC_URL+"/img/carousel/comboffer.jpg"}
        class="d-block w-100"
        className="carousel-img"
        alt="First slide"
      />
      <Carousel.Caption>
        <h3>First slide label</h3>
        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
         src = {process.env.PUBLIC_URL+"/img/carousel/offer3.jpg"}
        class="d-block w-100"
        className="carousel-img"
        alt="Third slide"
      />
    </Carousel.Item>
    <Carousel.Item>
      <img
         src = {process.env.PUBLIC_URL+"/img/carousel/Typography_T-shirt.jpg"}
        class="d-block w-100"
        className="carousel-img"
        alt="Third slide"
      />
    </Carousel.Item>
  </Carousel>
  </div>

  );
}


export default Caro;