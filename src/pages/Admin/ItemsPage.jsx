import { Col, Container, Row, Stack, Table } from "react-bootstrap"
import productData from "../../data/product.json";
import EditButton from "../../components/Buttons/EditButton";
import DeleteButton from "../../components/Buttons/DeleteButton";
import AddButton from "../../components/Buttons/AddButton";


function itemsPage() {
  return (
    <Container style={{marginTop:'20px'}}>
            <Stack direction="horizontal"  className="mb-6" style={{ justifyContent: "space-between" }} >
                    <h1>Items </h1>
                    <AddButton/>
             </Stack>        
        
        <Table responsive >
      <thead>
        <tr>
          <th>#</th>
          <th>Image</th>
          <th>Name</th>
          <th>Description</th>
          <th>Price</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
       {
        productData.product.map((product) => (
        <tr key={product.id}>
          <td>{product.id}</td>
          <td>
            <img src={product.photoName} alt={product.name} width="50" />
          </td>
          <td>{product.name}</td>
          <td>{product.description}</td>
          <td>{product.price}EGP</td>
          <td>
            <Stack direction="horizontal" gap={3}>
              <EditButton/>
              <DeleteButton/>  
            </Stack>
          </td>
        </tr>
       ))
       }
       
      </tbody>
    </Table>

        
    </Container>
  )
}

export default itemsPage
