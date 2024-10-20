import { Container } from 'react-bootstrap'
import '../style/Loader.css'
const Loader = () => {
  return (
    <Container style={{padding:'30px'}}>
        <div className="containerr">
  <div className="preloader">
    <span></span>
    <span></span>
    <span></span>
  </div>
  <div className="shadow"></div>
</div>

    </Container>
   


  )
}

export default Loader
