
import axios from "axios";
import CheckDelete from "../../Admin/CheckDelete";
import"../../style/Button.css"
// import { useDispatch } from 'react-redux';
import { useState } from "react";
// import { removeItem } from "../../features/ItemSlice";
import toast from "react-hot-toast";
function DeleteButton({name,id}) {
  // const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const handleDelete =async () => {
    try{
      axios.delete(`http://localhost:4000/api/food/remove`,
        {
          data: {
            id: id
          }
        }

      )
      .then(response => {
        
        toast.success("Item deleted successfully");
        setShowModal(false); 
        
      })
      .catch(error => {
        console.error(`Error deleting item ${name}:`, error);
      });
      
    }catch(error) {
      console.error('Error fetching data:', error);
    }
      
  };

 

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  

  return (
    <>
       <button class="delete-button" onClick={()=>handleShowModal()}>
      <svg class="delete-svgIcon" viewBox="0 0 448 512">
                    <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
        </svg>
     </button>
     {showModal &&(
      <CheckDelete
      show={showModal}
      onHide={handleCloseModal}
      onConfirm={handleDelete}
      itemName={name}
    />

     )}
    
    </>
   
  )
}

export default DeleteButton