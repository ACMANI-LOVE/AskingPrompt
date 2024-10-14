import { Box, Card, Typography } from "@mui/material";

export const ItemText = (props:{text:string, bold?:boolean}) => {
  const {text, bold } = props
return <Typography whiteSpace={"pre-line"} height={"none"} lineHeight={1.1} fontWeight={(bold) ? "bold" : "0"} variant="caption">{text}</Typography>
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
  return <Typography fontWeight={"bold"}  variant="h2">{text}</Typography>
}

interface TextProps {text:string,bold?:boolean,noPadding?:boolean}
export const TText = (props:TextProps) => <Typography variant={"h4"}      fontWeight={(props.bold)?"bold":"0"} height={"none"} lineHeight={(props.noPadding)?1:1.5} >{props.text}</Typography>
export const LText = (props:TextProps) => <Typography variant={"body1"}   fontWeight={(props.bold)?"bold":"0"} height={"none"} lineHeight={(props.noPadding)?1:1.5} >{props.text}</Typography>
export const MText = (props:TextProps) => <Typography variant={"body2"}   fontWeight={(props.bold)?"bold":"0"} height={"none"} lineHeight={(props.noPadding)?1:1.5} >{props.text}</Typography>
export const SText = (props:TextProps) => <Typography variant={"caption"} fontWeight={(props.bold)?"bold":"0"} height={"none"} lineHeight={(props.noPadding)?1:1.5} >{props.text}</Typography>

export const DspColor = (props:{colorCode:string}) => {
  const hexPattern = /^#([0-9A-F]{3}){1,2}$/i;
  const isCode = hexPattern.test(props.colorCode);
  return (<Box flex={1} display={"flex"} justifyContent={"start"} alignItems={"center"} gap={"0.5em"}>
      <ItemText text={props.colorCode}/>
      {
        (isCode)
        ? <Card sx={{
            bgcolor: (isCode) ? props.colorCode : "#000",
            width:"1.5em",height:"1.5em", borderRadius:"100%",
            boxShadow:`2px 2px 5px 0px #FFF`
          }}/>
        : <SText noPadding text={"[INVALID]"}/>
      }
  </Box>
  )
}