import Carousel from 'react-bootstrap/Carousel';
import '../style/Slider.css';



function Slider() {
    const background_image1 = require('../assets/B-meduim1.jpg');
    const background_image2 = require('../assets/B-meduim2.jpg');
    const background_image3 = require('../assets/B-meduim3.jpg');
    const background_image4 = require('../assets/B-meduim4.jpg');



  return (
    <Carousel  className='content'  >
      <Carousel.Item interval={1000}>
      <img   src={background_image1} alt="First slide" />
        <Carousel.Caption>
          <h3>Tomato Burger and Fried Fries </h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={1000}>
      <img  src={background_image2} alt="First slide" />
        <Carousel.Caption>
          <h3>Pasta With Tomato and Basil</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={1000}>
      <img  src={background_image3} alt="First slide" />
        <Carousel.Caption>
          <h3 >Grilled Barbecue
          </h3>
         
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={1000}>
      <img  src={background_image4} alt="First slide" />
        <Carousel.Caption>
          <h3>Cheesy Baked Lasagna Slice in an Earthenware</h3>
         
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>

  );
}

export default Slider;
