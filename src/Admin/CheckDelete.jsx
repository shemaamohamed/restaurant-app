import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import '../style/CheckDelete.css'
import { Button } from 'react-bootstrap';


function CheckDelete({ show, onHide, onConfirm, itemName }) { 
  return (
      <Dialog
    open={show}
    onClose={onHide}
    aria-labelledby="responsive-dialog-title"
  >
    <DialogTitle id="responsive-dialog-title" style={{textAlign:'center',fontWeight:'600'}}>
      Confirm Delete
    </DialogTitle>
    <DialogContent>
      <DialogContentText>
      Are you sure you want to delete <strong>{itemName}</strong>?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
    <Button variant="danger" onClick={onConfirm} autoFocus>
        Delete
      </Button>
    <Button variant="secondary" onClick={onHide} autoFocus>
        Cancel
      </Button>
      
    </DialogActions>
  </Dialog>
 

  )
}

export default CheckDelete

