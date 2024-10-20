
import"../../style/Button.css"
import { useNavigate } from 'react-router-dom'

function AddButton() {
  const navigate=useNavigate();
  const additem=()=>{
    console.log('additem');
    navigate('/additems');
  }
  return (
    <button onClick={additem}   type="button" className="button">
        <span className="button__text">Add Item</span>
        <span className="button__icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" strokeWidth="2" stroke-linejoin="round" stroke-linecap="round" stroke="currentColor" height="24" fill="none" className="svg"><line y2="19" y1="5" x2="12" x1="12"></line><line y2="12" y1="12" x2="19" x1="5"></line></svg></span>
    </button>
  )
}

export default AddButton
