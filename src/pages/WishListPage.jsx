import { Table, Container, Button, Card } from "react-bootstrap";
import WishEmpty from "../components/WishEmpty";
import { addToCart } from "../features/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../features/WishListSlice";
import toast from "react-hot-toast";

function WishListPage() {
  const wishes = useSelector((state) => state.wishlist.wishes || []);
  const dispatch = useDispatch();

  return (
    <Container className="mt-4">
      <h3 className="mb-3 text-center text-md-start">My Wishlist</h3>
      {wishes.length > 0 ? (
        <Table responsive="sm" className="table-bordered">
          <thead className="text-center">
            <tr>
              <th>#</th>
              <th>Product image</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Remove</th>
              <th>Add to Cart</th>
            </tr>
          </thead>
          <tbody>
            {wishes.map((item, index) => (
              <tr key={item.id}>
                <td className="text-center">{index + 1}</td>
                <td className="text-center">
                  <Card.Img
                    style={{ width: "80px", height: "auto" }}
                    src={item.image}
                    alt={item.name}
                  />
                </td>
                <td className="text-center">{item.name}</td>
                <td className="text-center">{item.price}</td>
                <td className="text-center">
                  <Button
                    variant="danger"
                    size="sm"
                    className="mb-2"
                    onClick={() => dispatch(removeFromWishlist(item.id))}
                  >
                    Remove
                  </Button>
                </td>
                <td className="text-center">
                  <Button
                    variant="primary"
                    size="sm"
                    className="mb-2"
                    onClick={() => {
                      dispatch(addToCart(item));
                      toast.success("Added to cart");
                    }}
                  >
                    Add to Cart
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <WishEmpty />
      )}
    </Container>
  );
}

export default WishListPage;
