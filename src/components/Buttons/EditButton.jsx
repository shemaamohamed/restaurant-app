
import { useState } from "react";
import"../../style/Button.css"
import UpdateitemPage from "../../Admin/UpdateitemPage";
function EditButton({name ,id}) {
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <><button  class="edit-button" onClick={()=>handleShowModal()}>
        <svg class="edit-svgIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>

  
  </button>{
    showModal && (
      <UpdateitemPage
    show={showModal}
    onHide={handleCloseModal}
    onConfirm={handleCloseModal}
    itemName={name}
    id={id}

  />
    )
  }
  
  </>
    
    
  )
}

export default EditButton
