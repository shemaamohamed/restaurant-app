import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useMediaQuery, useTheme } from '@mui/material';
import '../style/CheckDelete.css'
import { Button } from 'react-bootstrap';


function CheckDelete({ show, onHide, onConfirm, itemName }) { 
  return (
      <Dialog
    open={show}
    onClose={onHide}
    aria-labelledby="responsive-dialog-title"
  >
    <DialogTitle id="responsive-dialog-title">
      Confirm Delete
    </DialogTitle>
    <DialogContent>
      <DialogContentText>
      Are you sure you want to delete <strong>{itemName}</strong>?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
    <Button variant="secondary" onClick={onHide} autoFocus>
        Cancel
      </Button>
      <Button variant="danger" onClick={onConfirm} autoFocus>
        Delete
      </Button>
    </DialogActions>
  </Dialog>
 

  )
}

export default CheckDelete

