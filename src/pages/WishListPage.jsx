import { Table, Container, Button, Card, Row, Col } from "react-bootstrap";
import WishEmpty from "../components/WishEmpty";
import { addToCart } from "../features/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../features/WishListSlice";
import toast from "react-hot-toast";
import "../style/WishList.css";
import axios from "axios";
import backendBaseUrl from "../utils/utils";


function WishListPage() {
  const wishes = useSelector((state) => state.wishlist.wishes || []);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

 

  const addtocart= async(itemm)=>{
    const item = {
      "itemId": itemm._id
     
    };
    console.log(item)
    console.log(token)
    await axios.post(`${backendBaseUrl}/api/cart/add`,
      item,
      {
        headers: {
          'Content-Type': 'application/json',
          'token': token,
        },
      }
    ).then((res)=>{
      console.log(res.data)
      toast.success("Added to Cart")
      dispatch(addToCart(item));
    }).catch((err)=>{
      console.log(err)
    })
    
  }

  return (
    <Container className="mt-4">
     <h3 className="mb-3 text-center text-md-center">My Wishlist</h3>
      {wishes.length > 0 ? (
        <>
        <Table  responsive="sm" className="table table-borderless wishlist-table rounded">
          <thead className="text-center">
            <tr>
              <th>Product image</th>
              <th>Product Name</th>
              <th>Product Price</th>
              <th colSpan={2} ></th>
              
            </tr>
          </thead>
          <tbody>
            {wishes.map((item, index) => (
              <> 
              <tr key={item.id} >
                <td className="text-center align-middle" >
                  <Card.Img
                    style={{ width: "60%", height: "auto"  }}
                    src={`${backendBaseUrl}/images/${item.image}`} alt={item.image}
                  />
                </td>
                <td className="text-center align-middle">{item.name}</td>
                <td className="align-middle text-center ">{item.price}</td>
                <td className="align-middle text-center">
                    <button
                    className="button-add"
                    onClick={()=>{addtocart(item)}}
                  >
                    Add 
                  </button>
                  </td>
                  <td>
                  <button
                    className="button-remove"
                    size="sm"
                    onClick={() =>{
                      dispatch(removeFromWishlist(item._id))

                    }
                      
                      }
                  >
                    x
                  </button>

                  </td>
                 
      
                 
              </tr>
              <tr>
               <td className="divide" colSpan={5}>
                 <div className="divider"></div>
               </td>
             </tr>
               </>
              
              
            ))}
          </tbody>
        </Table>
        
        </>
        
      ) : (
        <WishEmpty />
      )}
    </Container>
  );
}

export default WishListPage;
