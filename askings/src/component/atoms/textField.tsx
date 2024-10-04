import { TextField } from "@mui/material";
import { BaseSyntheticEvent } from "react";

export const OrdersField = (props:{text:string}) => {
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

export const PromptField = (props:{value:string, onChange: (e:BaseSyntheticEvent)=>void}) => {
  const { value, onChange } = props
  return (<TextField onChange={onChange} value={value}
    fullWidth
    size="small"
    slotProps={{
      htmlInput: {
        sx: { paddingY:"2px", overflow: 'auto', fontSize: 10, lineHeight: '1.2' },
      },
    }}/>)
}

