import { TextField } from "@mui/material";

const OrdersField = (props:{text:string}) => {
  const onFocusInvalid = (e: React.FocusEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.target.blur();
  };
  return (<TextField
    fullWidth
    rows={35}
    multiline
    focused={true}
    contentEditable={false}
    onFocus={onFocusInvalid}
    value={props.text}
    slotProps={{
      htmlInput: {
        sx: { overflow: 'auto', fontSize: 10, lineHeight: '1.2' },
      },
    }}
></TextField>)
}

export default OrdersField