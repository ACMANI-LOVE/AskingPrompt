import { Box, Card, Checkbox, Divider, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { BaseSyntheticEvent, ReactNode } from "react";
import { ItemText, TableText } from "../atoms/text";
import DiscountIcon from '@mui/icons-material/Discount';
import EditIcon from '@mui/icons-material/Edit';
import CommentIcon from '@mui/icons-material/Comment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import { PromptField } from "../atoms/textField";
import { chkJsonStrings, zeroPads } from "@/util";

const ViewLabel    = (props:{label:string}) => {
  return(<Box flex={1} display={"flex"} alignItems={"center"}>
    <DiscountIcon color="primary"/>
    <ItemText bold text={props.label}/>
  </Box>)
}
const EditLabel    = (props:{label:string}) => {
  return(<Box flex={1} display={"flex"} alignItems={"center"}>
    <EditIcon     color="primary"/>
    <ItemText bold text={props.label}/>
  </Box>)
}
const DisplayLabel = (props:{label:string}) => {
  return(<Box flex={1} display={"flex"} alignItems={"center"}>
    <CommentIcon  color="primary"/>
    <ItemText bold text={props.label}/>
  </Box>)
}
// +=========+=========+=========+=========+=========+=========+=========+=========+=========+=========
export const OrderChecker = (props:{order:string}) => {
  return (chkJsonStrings(props.order))
    ? <CheckCircleIcon fontSize='small' color='success'/>
    : <WarningIcon     fontSize='small' color='warning'/>
}

export const ViewItem = (props:{label:string, children?:ReactNode}) => {
  return (<Box display={"flex"} alignItems={"center"} gap={"0.5em"}>
    <ViewLabel label={props.label}/>
    {
      (props.children)
      ? <Box flex={3} display={"flex"} flexDirection={"row"} alignItems={"center"} justifyContent={"space-between"} gap={"0.5em"}>
            {props.children}
          </Box>
        : <></>
      }
  </Box>)
}

export const EditItem = (props:{label:string, children?:ReactNode}) => {
  return (<Box display={"flex"} alignItems={"center"} gap={"0.5em"}>
    <EditLabel label={props.label}/>
    {
      (props.children)
      ? <Box flex={3} display={"flex"} flexDirection={"row"} alignItems={"center"} justifyContent={"space-between"} gap={"0.5em"}>
            {props.children}
          </Box>
        : <></>
      }
  </Box>)
}

export const BlocItem = (props:{children:ReactNode}) => {
  return (<Box paddingLeft={"1em"} display={"flex"} alignItems={"center"} gap={"0.5em"}>
    {props.children}
  </Box>)
}

// +=========+=========+=========+=========+=========+=========+=========+=========+=========+=========
export const DisplayItem = (props:{text:string}) => {
  return (<Box display={"flex"} flexDirection={"column"} gap={"0.25em"}>
    <DisplayLabel label={'Display:'}/>
    <BlocItem><ItemText text={props.text}/></BlocItem>
    <Divider/>
  </Box>
  )
}
export const MultiDisplay = (props:{prompts:string[]}) => {
  return (<Box display={"flex"} flexDirection={"column"} gap={"0.25em"}>
    <DisplayLabel label={'Display:'}/>
    {props.prompts.map((prompt,idx)=><BlocItem key={`display${idx}`}>
      <OrderWithPrompt order={`Prompt #${zeroPads(idx+1)}`} value={prompt} />
    </BlocItem>)}
    <Divider/>
  </Box>
  )
}

export const AdditionalItem = (props:{additional:string, onChange:(e:BaseSyntheticEvent)=>void}) => {
  return (<Box display={"flex"} flexDirection={"column"} gap={"0.25em"}>
    <EditItem  label={'Additional:'}/>
    <BlocItem><PromptField value={props.additional} onChange={props.onChange}/></BlocItem>
    <Divider/>
  </Box>
  )
}

export const MultiAdditional = (props:{additions:string[], onChange:(val:string,id:number)=>void, label?:string}) => {
  return (<Box display={"flex"} flexDirection={"column"} gap={"0.25em"}>
    <EditItem  label={`${props.label ?? "Additional"}:`}/>
    {props.additions.map((additional,idx)=><BlocItem key={`additions${idx}`}>
      <OrderWithInput order={`Additional:${zeroPads(idx+1)}`} value={additional} onChange={(e)=>props.onChange(e.target.value,idx)}/>
    </BlocItem>)}
    <Divider/>
  </Box>
  )
}
export const RowDirection = (props:{children:ReactNode, noIdent?:boolean}) => {
  const noIdent = (props.noIdent) ?? false
  return (<Box paddingLeft={(noIdent)?"1em":"0"} display={"flex"} flexDirection={"row"} justifyContent={"space-between"} gap={"0.5em"}>
    {props.children}
  </Box>
  )
}

// +=========+=========+=========+=========+=========+=========+=========+=========+=========+=========
export const Order = (props:{order:string}) => {
  return (<Box flex={1} display={"flex"} justifyContent={"end"} alignItems={"center"} gap={"0.5em"}>
    <ItemText bold text={props.order} />
  </Box>)
}

export const ColorOrder = (props:{colorText:string}) => {
  const hexPattern = /^#([0-9A-F]{3}){1,2}$/i;
  const isCode = hexPattern.test(props.colorText);
  return (<Box flex={1} display={"flex"} justifyContent={"end"} alignItems={"center"} gap={"0.5em"}>
      <ItemText text={props.colorText}/>
      <Card sx={{
        bgcolor: (isCode) ? props.colorText : "#000",
        width:"1.5em",height:"1.5em", borderRadius:"100%",
        boxShadow:`2px 2px 5px 0px #FFF`
      }}/>
  </Box>
  )
}

export const OrderWithInput = (props:{order?:string, value:string, onChange:(e:BaseSyntheticEvent)=>void}) => {
  return (<Box flex={1} display={"flex"} justifyContent={"space-between"} alignItems={"center"} gap={"0.5em"}>
    {(props.order) ? <ItemText bold text={props.order} /> : <></>}
    <PromptField value={props.value} onChange={props.onChange} />
  </Box>)
}
export const OrderWithPrompt = (props:{order:string, value:string }) => {
  return (<Box flex={1} display={"flex"} justifyContent={"space-between"} alignItems={"center"} gap={"0.5em"}>
    <ItemText bold text={props.order} />
    <ItemText text={props.value} />
  </Box>)
}
export const OrderWithCheckBox = (props:{checked:boolean, onChange:(e:BaseSyntheticEvent)=>void, disabled?:boolean, order?:string }) => {
  const disabled = (props.disabled) ?? false
  return (<Box flex={1} display={"flex"} justifyContent={"center"} alignItems={"center"} gap={"0.5em"}>
    {(props.order) ? <ItemText bold text={props.order} /> : <></>}
    <Checkbox sx={{padding:"0"}} size="small" disabled={disabled} checked={props.checked} onChange={props.onChange}/>
  </Box>)
}

// +=========+=========+=========+=========+=========+=========+=========+=========+=========+=========
export const PosingTable = (props:{tableList:string[][]}) => {
  return (
    <Table>
    <TableHead>
      <TableRow>
        <TableCell padding="none" size="small"><TableText bold text={"#:"       }/></TableCell>
        <TableCell padding="none" size="small"><TableText bold text={"Posing"   }/></TableCell>
        <TableCell padding="none" size="small"><TableText bold text={"Hands"    }/></TableCell>
        <TableCell padding="none" size="small"><TableText bold text={"Legs"     }/></TableCell>
        <TableCell padding="none" size="small"><TableText bold text={"Direction"}/></TableCell>
        <TableCell padding="none" size="small"><TableText bold text={"Angle"    }/></TableCell>
        <TableCell padding="none" size="small"><TableText bold text={"Focus"    }/></TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {props.tableList.map((row,idx)=><TableRow key={`row${idx}`}>
        <TableCell padding="none" color="success" size="small"><TableText text={`#:${zeroPads(idx+1)}`}/></TableCell>
        {row.map((cell,idx)=><TableCell padding="none" size="small" key={`cell${idx}`}><TableText text={cell}/></TableCell>)}
     </TableRow>)}
    </TableBody>
  </Table>
  )
}
