
import { Container } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "../style/TopMeals.css";
import CardMelas from "../components/CardMeals";
import {  useEffect, useState} from "react";
import { useSelector } from "react-redux";

import NavCategory from "../components/NavCategory";
import Loader from "../components/Loader";

function MenuPage() {
    const menuItems = useSelector((state) => state.item.item || []);
    const [items,setItems]=useState([]);
    const [search,setSearch]=useState("");
    const [category,setCategory]=useState('menu');
    const [loading,setloading]=useState(true);
    useEffect(() => {
      if (menuItems.length > 0) {
          setloading(false);
      }if(category==='menu'){
        displayAll()
    }
  }, []);
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
    <Row className="p-3">
                {loading ? (
                    <Loader />
                ) : (
                    items.length > 0 ? (
                        items.map((product) => (
                            <Col key={product.id}>
                                <CardMelas
                                    product={product}
                                    name={product.name}
                                    description={product.description}
                                    price={product.price}
                                    photoName={product.image}
                                />
                            </Col>
                        ))
                    ) : (
                        <p>No items found</p>
                    )
                )}
            </Row>
  </Container>
  )
}

export default MenuPage