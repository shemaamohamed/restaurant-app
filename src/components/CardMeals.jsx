import { Card } from "react-bootstrap"
import LoveIcon from './LoveIcon'

function CardMelas() {
    const background_image1 = require('../assets/burger.jpeg');
  return (
    <Card className="card-s" >
                        <Card.Img variant="top" src={background_image1}/>
                        <Card.Body>
                            <Card.Title className="card-t" >Share Combo Single <LoveIcon/></Card.Title>    
                            <hr/>
                            <Card.Text>
                            2 single chicken sandwich  
                            </Card.Text>
                            <Card.Text className="card-text">
                            Price: 150.00 EGP
                            <hr/>
                            <del>Price: 250.00 EGP</del> 
                            </Card.Text>
                          
                            <button className='CartBtn'>
                                <span class="IconContainer"> 
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" stroke-linejoin="round" stroke-linecap="round" viewBox="0 0 24 24" stroke-width="2" fill="none" stroke="currentColor" >
              <circle r="1" cy="21" cx="9"></circle>
              <circle r="1" cy="21" cx="20"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
                                </span>
                                <p class="text">Add to Cart</p>
                            </button>
                        </Card.Body>
                    </Card>
    
  )
}
           

export default CardMelas
