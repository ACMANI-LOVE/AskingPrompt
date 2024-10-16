import { Box, Card, Divider, Icon, IconButton, Paper, TextField, Typography } from "@mui/material";
import { BaseSyntheticEvent, ReactNode } from "react";
import ForwardIcon from '@mui/icons-material/Forward';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import UploadIcon from '@mui/icons-material/Upload';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import { chkJsonStrings } from "@/util";
// +---------+---------+---------+---------+---------+---------+---------+---------+---------+---------
// Layout
// +---------+---------+---------+---------+---------+---------+---------+---------+---------+---------
export const Layout = (props:{children:ReactNode, size?:number, vertical?:boolean, center?:boolean}) =>{
  const {
    children,
    size=1,
    vertical=false,
    center=false
  } = props
  return (<Box
    flex={size}
    display={"flex"}
    gap={"0.25em"}
    paddingY={(vertical)?"0.5em":"none" }
    paddingX={(vertical)?"none" :"0.5em"}
    flexDirection={(vertical)?"column":"row"}
    alignItems={(vertical&&center)?"center":"normal"}
    justifyContent={(center)?"center":"start"}
  >{children}</Box>)
}
export const PaperLayout = (props:{children:ReactNode, vertical?:boolean}) => {
  const {
    children,
    vertical = false
  } = props
  return (<Paper><Layout vertical={vertical}>{children}</Layout></Paper>)
}


// +---------+---------+---------+---------+---------+---------+---------+---------+---------+---------
// Constants Item
// +---------+---------+---------+---------+---------+---------+---------+---------+---------+---------
export const ArrowIcon    = () => <Icon fontSize="large"><ForwardIcon fontSize="large"/></Icon>
export const ShuffleIcon  = (props:{onClick:()=>void}) => <IconButton onClick={props.onClick}><AutorenewIcon/>       </IconButton>
export const CopyingIcon  = (props:{onClick:()=>void}) => <IconButton onClick={props.onClick}><ContentCopyIcon/>     </IconButton>
export const PastingIcon  = (props:{onClick:()=>void}) => <IconButton onClick={props.onClick}><ContentPasteGoIcon/>  </IconButton>
export const SweepingIcon = (props:{onClick:()=>void}) => <IconButton onClick={props.onClick}><CleaningServicesIcon/></IconButton>

export const UploadingIcon = (props:{onClick:()=>void, children:ReactNode}) => <IconButton onClick={props.onClick}>
  <UploadIcon/>
  {props.children}
</IconButton>
export const DownloadingIcon = (props:{onClick:()=>void, children:ReactNode}) => <IconButton onClick={props.onClick}>
  <SaveAltIcon/>
  {props.children}
</IconButton>

export const OrderChecker = (props:{order:string}) => (chkJsonStrings(props.order)) ? <CheckCircleIcon fontSize='small' color='success'/> : <WarningIcon fontSize='small' color='warning'/>

export const DividerLine  = (props:{vertical?:boolean}) => { return (<Box
    paddingX={(props.vertical)?"none":"0.5em"}
    paddingY={(props.vertical)?"0.5em":"none"} >
      <Divider flexItem orientation={(props.vertical)?"vertical":"horizontal"}/>
    </Box>)
}

// +---------+---------+---------+---------+---------+---------+---------+---------+---------+---------
// Label Text
// +---------+---------+---------+---------+---------+---------+---------+---------+---------+---------
interface TextProps {text:string,bold?:boolean,noPadding?:boolean}
export const TText = (props:TextProps) => <Typography variant={"h4"}      fontWeight={(props.bold)?"bold":"0"} height={"none"} lineHeight={(props.noPadding)?1:1.5} >{props.text}</Typography>
export const LText = (props:TextProps) => <Typography variant={"body1"}   fontWeight={(props.bold)?"bold":"0"} height={"none"} lineHeight={(props.noPadding)?1:1.5} >{props.text}</Typography>
export const MText = (props:TextProps) => <Typography variant={"body2"}   fontWeight={(props.bold)?"bold":"0"} height={"none"} lineHeight={(props.noPadding)?1:1.5} >{props.text}</Typography>
export const SText = (props:TextProps) => <Typography variant={"caption"} fontWeight={(props.bold)?"bold":"0"} height={"none"} lineHeight={(props.noPadding)?1:1.5} >{props.text}</Typography>

export const DspColor = (props:{colorCode:string}) => {
  const hexPattern = /^#([0-9A-F]{3}){1,2}$/i;
  const isCode = hexPattern.test(props.colorCode);
  return (<Box flex={1} display={"flex"} justifyContent={"start"} alignItems={"center"} gap={"0.5em"}>
      <SText text={props.colorCode}/>
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
// +---------+---------+---------+---------+---------+---------+---------+---------+---------+---------
// Text Field
// +---------+---------+---------+---------+---------+---------+---------+---------+---------+---------
export const OrdersField = (props:{text:string, line?:number}) => {
  const onFocusInvalid = (e: React.FocusEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.target.blur();
  };
  return (<TextField
    fullWidth
    rows={props.line ?? 35}
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