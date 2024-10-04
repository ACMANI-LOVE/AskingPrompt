import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Snackbar, SnackbarCloseReason } from '@mui/material';
import { ReactNode, useState } from 'react';
interface SnackBarProps {
  message:string
}
type SnackBarReturnType = [
  snackBar: ()=>ReactNode,
  open: ()=>void
]
const useSnackBar = (props:SnackBarProps) => {
  const [snack, setSnack] = useState(false)
  const onOpenSnack = () => setSnack(true)
  const onCloseSnack = (reason?:SnackbarCloseReason) => (reason==='clickaway') ? ()=>{} : setSnack(false)
  const snackBar = (<Snackbar
      open={snack}
      color="primary"
      autoHideDuration={1000}
      onClose={(_,reason)=>onCloseSnack(reason)}
      message={props.message}
      action={<IconButton onClick={()=>setSnack(false)}><CloseIcon/></IconButton>}/>)
  return [ ()=>snackBar, onOpenSnack ] as SnackBarReturnType
}

export default useSnackBar