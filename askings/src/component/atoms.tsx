import { Box, Card, Checkbox, Divider, FormControlLabel, Icon, IconButton, Paper, Switch, Table, TableBody, TableCell, TableRow, TextField, Typography } from "@mui/material";
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
import DiscountIcon from '@mui/icons-material/Discount';
import EditIcon from '@mui/icons-material/Edit';
import CommentIcon from '@mui/icons-material/Comment';
import { chkJsonStrings, zeroPads } from "@/util";
import { PosingDetailProps } from "@/const/cons_interfaces";
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
    gap={"0.15em"}
    width={"100%"}
    paddingY={(vertical)?"0.25em":"none" }
    paddingX={(vertical)?"none" :"0.5em"}
    flexDirection={(vertical)?"column":"row"}
    alignItems={(vertical&&center)?"center":"normal"}
    justifyContent={(center)?"center":"start"}
    >{children}</Box>)
  }
  export const BaseLineLayout = (props:{children:ReactNode, vertical?:boolean,  center?:boolean}) => {
    const {
      children,
      vertical=false,
      center=false
    } = props
    return (<Box
      flex={1}
      display={"flex"}
      gap={"0.15em"}
      width={"100%"}
      paddingY={(vertical)?"0.25em":"none" }
      paddingX={(vertical)?"none" :"0.5em"}
      flexDirection={(vertical)?"column":"row"}
      alignItems={"baseline"}
      justifyContent={(center)?"center":"start"}
  >{children}</Box>)
}
export const EdgeLayout = (props:{children:ReactNode, size?:number, vertical?:boolean, ended?:boolean}) => {
const {
  children,
  size=1,
  vertical=false,
  ended=false,
} = props
  return (<Box
    flex={size}
    display={"flex"}
    flexDirection={(vertical)?"column":"row"}
    alignItems={(vertical)?"start":"center"}
    justifyContent={(ended)?"end":"space-between"}
  >{children}</Box>)
}
export const IndentLayout = (props:{children:ReactNode, vertical?:boolean}) => {
const {
  children,
  vertical,
} = props
  return (<Box
    display={"flex"}
    gap={"0.15em"}
    paddingInlineStart={"1.5em"}
    paddingInlineEnd={"0.25em"}
    flexDirection={(vertical)?"column":"row"}>{children}</Box>)
}
export const PaperLayout = (props:{children:ReactNode, vertical?:boolean}) => {
  const {
    children,
    vertical = false
  } = props
  return (<Paper ><Box
    flex={1}
    display={"flex"}
    gap={"0.15em"}
    width={"100%"}
    paddingY={(vertical)?"0.25em":"none" }
    paddingX={"0.25em"}
    paddingInlineEnd={"1em"}
    flexDirection={(vertical)?"column":"row"}
  >{children}</Box></Paper>)
}


// +---------+---------+---------+---------+---------+---------+---------+---------+---------+---------
// Constants Item
// +---------+---------+---------+---------+---------+---------+---------+---------+---------+---------
export const ConstantIcon  = () => <Icon fontSize="medium"><DiscountIcon fontSize="medium"/></Icon>
export const EditableIcon  = () => <Icon fontSize="medium"><EditIcon     fontSize="medium"/></Icon>
export const DisplayedIcon = () => <Icon fontSize="medium"><CommentIcon  fontSize="medium"/></Icon>
export const ArrowIcon     = () => <Icon fontSize="large"><ForwardIcon fontSize="large"/></Icon>

export const ShuffleIcon  = (props:{onClick:()=>void}) => <IconButton onClick={props.onClick}><AutorenewIcon/>       </IconButton>
export const CopyingIcon  = (props:{onClick:()=>void}) => <IconButton onClick={props.onClick}><ContentCopyIcon/>     </IconButton>
export const PastingIcon  = (props:{onClick:()=>void}) => <IconButton onClick={props.onClick}><ContentPasteGoIcon/>  </IconButton>
export const SweepingIcon = (props:{onClick:()=>void}) => <IconButton onClick={props.onClick}><CleaningServicesIcon/></IconButton>
export const OrderChecker = (props:{order:string}) => (chkJsonStrings(props.order)) ? <CheckCircleIcon fontSize='small' color='success'/> : <WarningIcon fontSize='small' color='warning'/>

export const UploadingIcon = (props:{onClick:()=>void, children:ReactNode}) => <IconButton onClick={props.onClick}>
  <UploadIcon/>
  {props.children}
</IconButton>
export const DownloadingIcon = (props:{onClick:()=>void, children:ReactNode}) => <IconButton onClick={props.onClick}>
  <SaveAltIcon/>
  {props.children}
</IconButton>

export const ToggleSwitch = (props:{label:string, value:boolean, onChange:()=>void, disabled?:boolean}) => { return (<FormControlLabel
    checked={props.value}
    onChange={()=>props.onChange()}
    disabled={props.disabled}
    label={<SText text={props.label}/>}
    labelPlacement={"start"}
    control={<Switch size={"medium"} color={"primary"} />}
  ></FormControlLabel>)
}
export const CheckBoxes = (props:{label:string, value:boolean, onChange:()=>void, disabled?:boolean}) => { return (<FormControlLabel
    checked={props.value}
    onChange={()=>props.onChange()}
    disabled={props.disabled}
    label={<SText text={props.label}/>}
    labelPlacement={"start"}
    control={<Checkbox size={"medium"} color={"primary"} />}
  ></FormControlLabel>)
}

export const DividerLine  = (props:{vertical?:boolean, noLine?:boolean}) => { return (<Box
  paddingX={(props.vertical)?"none":"0.5em"}
  paddingY={(props.vertical)?"0.5em":"none"} >{
    (props.noLine)
      ? <Box></Box>
      : <Divider flexItem orientation={(props.vertical)?"vertical":"horizontal"}/>
  }</Box>)
}

export const ColorDisplay = (props:{code:string}) => {
  const hexPattern = /^#([0-9A-F]{3}){1,2}$/i;
  const isCode = hexPattern.test(props.code);
  return (<Card sx={{
    bgcolor: (isCode) ? props.code : "#000",
    width:"1.25em",height:"1.25em", borderRadius:"100%",
    boxShadow:`2px 2px 5px 0px #FFF`
  }}/>)
}

// +---------+---------+---------+---------+---------+---------+---------+---------+---------+---------
// Label Text
// +---------+---------+---------+---------+---------+---------+---------+---------+---------+---------
interface TextProps {text:string,bold?:boolean,noPadding?:boolean}
export const TText = (props:TextProps) => <Typography variant={"h4"}      fontWeight={(props.bold)?"bold":"0"} height={"none"} alignItems={"baseline"} lineHeight={(props.noPadding)?1:1.5} >{props.text}</Typography>
export const LText = (props:TextProps) => <Typography variant={"h6"}      fontWeight={(props.bold)?"bold":"0"} height={"none"} alignItems={"baseline"} lineHeight={(props.noPadding)?1:1.5} >{props.text}</Typography>
export const MText = (props:TextProps) => <Typography variant={"body2"}   fontWeight={(props.bold)?"bold":"0"} height={"none"} alignItems={"baseline"} lineHeight={(props.noPadding)?1:1.5} >{props.text}</Typography>
export const SText = (props:TextProps) => <Typography variant={"caption"} fontWeight={(props.bold)?"bold":"0"} height={"none"} alignItems={"baseline"} lineHeight={(props.noPadding)?1:1.5} >{props.text}</Typography>

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

export const SingleLineTable = (props:{ label:string, data:string[] }) => {
  return (<Box padding={"0.25em"} flex={1}>
    <Table><TableBody>
      <TableRow>
        <TableCell sx={{padding:"0"}} size={"small"} key={`label`}><SText bold text={props.label}/></TableCell>
        {props.data.map((item,idx)=><TableCell sx={{padding:"0"}} size={"small"} key={`body${idx}` }><SText text={item}/></TableCell>)}
      </TableRow>
    </TableBody></Table>
  </Box>)
}
export const PosingLineTable = (props:{ data:PosingDetailProps[] }) => {
  return (<Box padding={"0.25em"} flex={1}>
  <Table><TableBody>
    <TableRow>
      <TableCell sx={{padding:"0"}} size={"small"} key={`label`}><SText text={"Posing:"}/></TableCell>
      {props.data.map((_,idx)=><TableCell sx={{padding:"0"}} size={"small"} key={`label${idx}`}><SText text={`#${zeroPads(idx+1)}:`}/></TableCell>)}
    </TableRow>
    <TableRow>
      <TableCell sx={{padding:"0"}} size={"small"} key={`label`}><SText text={"pose"}/></TableCell>
      {props.data.map((item,idx)=><TableCell sx={{padding:"0"}} size={"small"} key={`body${idx}`}><SText text={item.posing}/></TableCell>)}
    </TableRow>
    <TableRow>
      <TableCell sx={{padding:"0"}} size={"small"} key={`label`}><SText text={"pose"}/></TableCell>
      {props.data.map((item,idx)=><TableCell sx={{padding:"0"}} size={"small"} key={`body${idx}`}><SText text={item.direction}/></TableCell>)}
    </TableRow>
    <TableRow>
      <TableCell sx={{padding:"0"}} size={"small"} key={`label`}><SText text={"pose"}/></TableCell>
      {props.data.map((item,idx)=><TableCell sx={{padding:"0"}} size={"small"} key={`body${idx}`}><SText text={item.angle}/></TableCell>)}
    </TableRow>
    <TableRow>
      <TableCell sx={{padding:"0"}} size={"small"} key={`label`}><SText text={"pose"}/></TableCell>
      {props.data.map((item,idx)=><TableCell sx={{padding:"0"}} size={"small"} key={`body${idx}`}><SText text={item.focus}/></TableCell>)}
    </TableRow>
    <TableRow>
      <TableCell sx={{padding:"0"}} size={"small"} key={`label`}><SText text={"pose"}/></TableCell>
      {props.data.map((item,idx)=><TableCell sx={{padding:"0"}} size={"small"} key={`body${idx}`}><SText text={item.handsOption}/></TableCell>)}
    </TableRow>
    <TableRow>
      <TableCell sx={{padding:"0"}} size={"small"} key={`label`}><SText text={"pose"}/></TableCell>
      {props.data.map((item,idx)=><TableCell sx={{padding:"0"}} size={"small"} key={`body${idx}`}><SText text={item.legsOption}/></TableCell>)}
    </TableRow>
    </TableBody></Table>
  </Box>)
}