import { useState, useEffect, ReactNode } from 'react';
import { Box, Paper, IconButton, Divider } from '@mui/material';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import ForwardIcon from '@mui/icons-material/Forward';
import useTabGroup from '@/component/organs/tabGroup';
import useSnackBar from "@/component/organs/snackBar";
import OrdersField from '@/component/atoms/textField';
import { LabelText } from '@/component/atoms/text';
import { eightString, zeroPads } from "@/util";

interface AskingPanelProps {
  initial: number
}
type AskingPanelReturnType = {
  AskingPanel: ()=>ReactNode,
  orderList: string[]
}

const useAskingPanel = (props:AskingPanelProps) => {
  const {initial,} = props
  const labelList = Array.from({length:7},(_,idx)=> `REQ:#${zeroPads(idx+1)}`)
  const [requestList, setRequestList] = useState(labelList.map((_)=>`${eightString()}`))
  const [orderList,   setOrderList  ] = useState(labelList.map((_)=>`${eightString()}`))
  const [tabId, setTabId] = useState(initial)
  const {TabGroup,tabSelect} = useTabGroup({initial: tabId, labelList: labelList})
  useEffect(()=>setTabId(tabSelect),[tabSelect])

  const AskingPanel = () => {
    const onClickShuffle = () => setRequestList((prev)=>prev.map((item,idx)=>(idx===tabId ? eightString() : item)))
    const onClickCopy    = () => navigator.clipboard.writeText(requestList[tabId]).finally(()=>openCopy())
    const onClickPaste   = () => navigator.clipboard.readText().then((text)=>setOrderList((prev)=>prev.map((item,idx)=>(idx===tabId ? text : item)))).finally(()=>openPaste())
    const onClickClean   = () => setOrderList((prev)=>prev.map((item,idx)=>(idx === tabId ? "{}" : item)))

    const [SnackCopy   , openCopy   ] = useSnackBar({message:"Field Copied!!!"  })
    const [SnackPaste  , openPaste  ] = useSnackBar({message:"Field Pasted!!!"  })

    const PaperFrame = (props:{children:ReactNode}) => {
      return (<Box flex={1}>
        <Paper>
          <Box padding={"0.5em"} gap={"0.5em"} display={"flex"} flexDirection={"column"}>
            {props.children}
          </Box>
        </Paper>
      </Box>)
    }
    return(<Box padding={"1em"} display={"flex"} flexDirection={"column"} gap={"0.5em"}>
      <TabGroup/>
      <Box padding={"0.5em"} display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>
        <PaperFrame>
          <LabelText bold text={"1. Generate the Request "}/>
          <Box display={"flex"} flexDirection={"row"} justifyContent={"space-around"}>
            <IconButton onClick={onClickShuffle}><AutorenewIcon/></IconButton>
            <IconButton onClick={onClickCopy   }><ContentCopyIcon/></IconButton>
          </Box>
          <Divider/>
          <OrdersField text={requestList[tabId]}/>
        </PaperFrame>
        <Box padding={"1em"}>
          <ForwardIcon/>
        </Box>
        <PaperFrame>
          <LabelText bold text={"2. Save the Order"}/>
          <Box display={"flex"} flexDirection={"row"} justifyContent={"space-around"}>
            <IconButton onClick={onClickPaste  }><ContentPasteGoIcon/></IconButton>
            <IconButton onClick={onClickClean  }><CleaningServicesIcon/></IconButton>
          </Box>
          <Divider/>
          <OrdersField text={orderList[tabId]}/>
        </PaperFrame>
      </Box>
      <SnackCopy />
      <SnackPaste/>
    </Box>)
  }
  return { AskingPanel, orderList } as AskingPanelReturnType
}

export default useAskingPanel