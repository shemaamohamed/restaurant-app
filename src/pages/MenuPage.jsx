
import { Container } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "../style/TopMeals.css";
import CardMelas from "../components/CardMeals";
import axios from "axios";
import { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { setItem } from "../features/ItemSlice";
import { setCart } from "../features/CartSlice";
import NavCategory from "../components/NavCategory";

function MenuPage() {
    const dispatch = useDispatch();
    const menuItems = useSelector((state) => state.item.item || []);
    const token = localStorage.getItem("token");
    const [items,setItems]=useState([]);
    const [search,setSearch]=useState("")
    const [category,setCategory]=useState('menu')
  
    useEffect(() => {
      axios.get('http://localhost:4000/api/food/list') 
        .then(response =>{
          dispatch(setItem(response.data.data))
          setItems(response.data.data)
        })
          
        .catch(error => console.error('Error fetching menu items:', error));
    }, []);
    useEffect(() => {
      if(token){
        const intervalId = setInterval(()=>{
          axios.get('http://localhost:4000/api/cart/get', {
            headers: {
              'token': token,
            },
          }).then(response => {
            dispatch(setCart(response.data.cartData)); 
      
          }).catch(error => console.error('Error fetching cart data:', error));
    
        },1000)
        return () => {
          clearInterval(intervalId);
        };
        
  
      }else{
        dispatch(setCart([]))
      }
     
    }, [dispatch ,token]);
    const displayAll=()=>{
        setItems(menuItems)
        setCategory('menu');
    }
    const displayDeserts=()=>{
        const Deserts= menuItems
        .filter(product => product.category === 'Deserts')
        setItems(Deserts);
        setCategory('Deserts');

    }
    const displayPasta=()=>{
        const Pasta = menuItems
        .filter(product => product.category === 'Pasta')
        setItems(Pasta);
        setCategory('Pasta');

    }
    const displaySandwich=()=>{
        const Sandwich = menuItems
    .filter(product => product.category === 'Sandwich')
    setItems(Sandwich);
    setCategory('Sandwich');
    }
    const displaySalad=()=>{
      const Salad = menuItems
    .filter(product => product.category === 'Salad')
      setItems(Salad)
      setCategory('Salad')
    }
    const handleSearch=(e)=>{
        const searchValue = e.target.value; 
        if(e.target.value!==""){
            setSearch(searchValue);
           const filteredItems = items.filter(product => 
            product.name.toLowerCase().includes(searchValue.toLowerCase()))
            setItems(filteredItems)
        }else{
            setSearch('')
            if(category==='menu'){
                displayAll()
            }else if(category==='Deserts'){
                displayDeserts()
            }else if(category==='Pasta'){
                displayPasta()
            }else if(category==='Sandwich'){
                displaySandwich()
            }else if(category==='Salad'){
                displaySalad()
            }
        }
       
    }
    

  return (
    <Container className="p-3 mt-3"> 
    <NavCategory displayAll={displayAll} displayDeserts={displayDeserts} displayPasta={displayPasta} displaySalad={displaySalad} displaySandwich={displaySandwich} handleSearch={handleSearch}   searchValue={search}/>
    <Row className="p-3" >
      {menuItems.length > 0 ?(items.map((product) => (
        <Col key={product.id}>
          <CardMelas
            product={product}
            name={product.name}
            description={product.description}
            price={product.price}
            photoName={product.image}
          />
        </Col>
      ))):(
        <p>Loading menu...</p>
      )}
    </Row>
  </Container>
  )
}

export default MenuPage