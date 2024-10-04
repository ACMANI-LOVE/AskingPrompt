import { Typography } from "@mui/material";

export const ItemText = (props:{text:string, bold?:boolean}) => {
  const {text, bold } = props
  return <Typography height={"none"} lineHeight={1.1} fontWeight={(bold) ? "bold" : "0"} variant="caption">{text}</Typography>
}

export const TableText = (props:{text:string, bold?:boolean}) => {
  const {text, bold } = props
  return <Typography fontSize={11} height={"none"} lineHeight={1} fontWeight={(bold) ? "bold" : "0"} variant="body2">{text}</Typography>
}

export const LabelText = (props:{text:string, bold?:boolean}) => {
  const {text, bold} = props
  return <Typography fontWeight={(bold) ? "bold" : "0"}>{text}</Typography>
}

export const TitleText = (props:{text:string}) => {
  const {text} = props
  return <Typography fontWeight={"bold"} variant="h2">{text}</Typography>
}