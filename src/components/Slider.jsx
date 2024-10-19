import Carousel from 'react-bootstrap/Carousel';
import '../style/Slider.css';
import {  useSelector } from "react-redux";
function Slider() {
  const menuItems = useSelector((state) => state.item.item || []);
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; 
    }
    return array;
  };

  const getRandomItems = (items) => {
    const shuffledItems = shuffleArray([...items]); 
    return shuffledItems.slice(0, 4); 
  };
  const randomItems = menuItems.length > 0 ? getRandomItems(menuItems) : [];
  return (
    <Carousel  className='content'  >
      {
        randomItems.map((item, index) => (
          <Carousel.Item key={index} interval={1000}>
            <img  src={`http://localhost:4000/images/${item.image}`} alt={item.name} />
            <Carousel.Caption>
              <h3>{item.name}</h3>
            </Carousel.Caption>
          </Carousel.Item>
        ))
      }
    </Carousel>

  );
}

export default Slider;
