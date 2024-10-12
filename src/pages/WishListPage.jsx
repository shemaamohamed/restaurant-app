import { Table, Container, Button, Card, Row, Col } from "react-bootstrap";
import WishEmpty from "../components/WishEmpty";
import { addToCart } from "../features/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../features/WishListSlice";
import toast from "react-hot-toast";
import "../style/WishList.css";

function WishListPage() {
  const wishes = useSelector((state) => state.wishlist.wishes || []);
  const dispatch = useDispatch();

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
              <th colSpan={3} ></th>
              
            </tr>
          </thead>
          <tbody>
            {wishes.map((item, index) => (
              <tr key={item.id}>
                <td className="text-center align-middle" >
                  <Card.Img
                    style={{ width: "80px", height: "auto" }}
                    src={item.photoName}
                    alt={item.name}
                  />
                </td>
                <td className="text-center align-middle">{item.name}</td>
                <td className="align-middle text-center ">{item.price}</td>
                <td className="align-middle text-center">
                    <button
                    className="button-add"
                    onClick={() => {
                      dispatch(addToCart(item));
                      toast.success("Added to cart");
                    }}
                  >
                    Add 
                  </button>
                  {'  '}
                  <button
                    className="button-remove"
                    size="sm"
                    onClick={() =>{
                      dispatch(removeFromWishlist(item.id))

                    }
                      
                      }
                  >
                    x
                  </button>
                  

                    
                
                 
                </td>
              
              </tr>
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
