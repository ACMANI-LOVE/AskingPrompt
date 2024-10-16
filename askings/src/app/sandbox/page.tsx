"use client"
import { ItemText } from "@/component/atoms/text"
import { Box, Card, createTheme, CssBaseline, Divider, Paper, ThemeProvider, Typography } from "@mui/material"

export default function Sandbox () {

  const theme = createTheme({
    palette: { mode:"dark" }
  })

  return (<ThemeProvider theme={theme}>
    <CssBaseline/>
    <Box padding={"2em"}>
      <Paper >
        <Box display={"flex"} flexDirection={"column"}>
          <TText text={"SAMPLE sample :::"}/>
          <LText text={"SAMPLE sample :::"}/>
          <MText text={"SAMPLE sample :::"}/>
          <SText text={"SAMPLE sample :::"}/>
        </Box>
        <Divider/>
        <Box display={"flex"} flexDirection={"column"}>
          <TText bold text={"SAMPLE sample :::"}/>
          <LText bold text={"SAMPLE sample :::"}/>
          <MText bold text={"SAMPLE sample :::"}/>
          <SText bold text={"SAMPLE sample :::"}/>
        </Box>
        <Divider/>
        <Box display={"flex"} flexDirection={"column"}>
          <TText noPadding text={"SAMPLE sample :::"}/>
          <LText noPadding text={"SAMPLE sample :::"}/>
          <MText noPadding text={"SAMPLE sample :::"}/>
          <SText noPadding text={"SAMPLE sample :::"}/>
          <DspColor colorCode={"#DED000"}/>
          <DspColor colorCode={"#000"}/>
          <DspColor colorCode={"#DE$D00"}/>
          <DspColor colorCode={"#DED000"}/>
        </Box>
        <Divider/>
      </Paper>
    </Box>
  </ThemeProvider>)
}

interface TextProps {text:string,bold?:boolean,noPadding?:boolean}
const TText = (props:TextProps) => <Typography variant={"h4"}      fontWeight={(props.bold)?"bold":"0"} height={"none"} lineHeight={(props.noPadding)?1:1.5} >{props.text}</Typography>
const LText = (props:TextProps) => <Typography variant={"body1"}   fontWeight={(props.bold)?"bold":"0"} height={"none"} lineHeight={(props.noPadding)?1:1.5} >{props.text}</Typography>
const MText = (props:TextProps) => <Typography variant={"body2"}   fontWeight={(props.bold)?"bold":"0"} height={"none"} lineHeight={(props.noPadding)?1:1.5} >{props.text}</Typography>
const SText = (props:TextProps) => <Typography variant={"caption"} fontWeight={(props.bold)?"bold":"0"} height={"none"} lineHeight={(props.noPadding)?1:1.5} >{props.text}</Typography>

const DspColor = (props:{colorCode:string}) => {
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


