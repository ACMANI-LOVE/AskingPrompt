import { Typography } from "@mui/material";
export const LabelText = (props:{text:string, bold?:boolean}) => {
  const {text, bold} = props
  return <Typography fontWeight={(bold) ? "bold" : "0"}>{text}</Typography>
}