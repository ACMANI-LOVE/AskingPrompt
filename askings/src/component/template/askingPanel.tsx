import { useEffect, ReactNode, useContext, useRef } from 'react';
import { Box, Paper, IconButton, Divider } from '@mui/material';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import ForwardIcon from '@mui/icons-material/Forward';
import useTabGroup from '@/component/organs/tabGroup';
import useSnackBar from "@/component/organs/snackBar";
import { OrdersField } from '@/component/atoms/textField';
import { ItemText, LabelText } from '@/component/atoms/text';
import { zeroPads } from "@/util";
import { DataListContext, SelectContext } from '../context';
import { OrderChecker } from '../molecules/promptItem';
import getRequestPrompt from '@/app/api/func/getRequestPrompt';

const AskingPanel = () => {
  const {selection, setSelection} = useContext(SelectContext)
  const requestSelect = useRef(selection.requestSelect ?? 0)
  const orderSelect   = useRef(selection.orderSelect   ?? 0)
  const {dataList,  setDataList } = useContext(DataListContext)
  const requestList = useRef(dataList.requestList ?? [])
  const orderList   = useRef(dataList.orderList   ?? [])

  const requestLabel = requestList.current.map((_,idx)=>`REQ:#${zeroPads(idx+1)}`)
  const ordersItem   = orderList.  current[orderSelect  .current]
  const requestItem  = requestList.current[requestSelect.current]

  const [RequestTab,selectReqTab] = useTabGroup({
    initial: requestSelect.current,
    labelList: requestLabel
  })
  useEffect(()=>{
    requestSelect.current = selectReqTab;
    orderSelect  .current = selectReqTab;
    setSelection(prev=>({
      ...prev,
      requestSelect:selectReqTab,
      orderSelect  :selectReqTab,
    }))
  },[selectReqTab,setSelection])

  const onClickShuffle = () => {
    console.log("SHUFFLEd!!!")
    // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api`, {
    //   method: 'POST',
    //   headers: {'Content-Type': 'application/json'},
    //   body: JSON.stringify({shuffle:{id:requestSelect.current}} as RequestBodies)
    // })
    // const result:ResponseBodies = await response.json()
    // const { responseShuffle = "fetch failed" } = result
    const responseShuffle = getRequestPrompt(requestSelect.current) ?? "fetch failed"
    requestList.current = requestList.current.map((item,idx)=>(idx===requestSelect.current) ? responseShuffle : item)

    setDataList(prev=>({
      ...prev,
      requestList: prev.requestList.map((item,idx)=>(idx===requestSelect.current ? responseShuffle : item))
    }))
  }
  const onClickCopy    = () => navigator.clipboard.writeText(dataList.requestList[requestSelect.current]).finally(()=>openCopy())
  const onClickPaste   = () => navigator.clipboard.readText().then((text)=>{
    orderList.current = orderList.current.map((item,idx)=>(idx===orderSelect.current) ? text : item)
    setDataList(prev=>({
      ...prev,
      orderList: prev.orderList.map((item,idx)=>(idx===orderSelect.current ? text : item))
    }))
  }).finally(()=>openPaste())
  const onClickClean   = () => setDataList(prev=>({
    ...prev,
    orderList: prev.orderList.map((item,idx)=>(idx === orderSelect.current ? "{}" : item))
  }))

  const [SnackCopy   , openCopy   ] = useSnackBar({message:"Field Copied!!!"  })
  const [SnackPaste  , openPaste  ] = useSnackBar({message:"Field Pasted!!!"  })

  const OrderCheckField = () => {
    return (<Box flex={1} display={"flex"} flexDirection={"row"} justifyContent={"start"}>
      {orderList.current.map((order,idx)=><Box key={`order${idx}`} display={"flex"} flexDirection={"row"} justifyContent={"center"} alignItems={"center"}>
        <ItemText bold text={`Order#${zeroPads(idx+1)}:`}/>
        <OrderChecker order={order}/>
      </Box>)}
    </Box>)
  }
  const PaperFrame = (props:{label:string, item:string, children:ReactNode}) => {
    return (<Box flex={1}>
      <Paper>
        <Box padding={"0.5em"} gap={"0.5em"} display={"flex"} flexDirection={"column"}>
          <LabelText bold text={props.label}/>
          <Box display={"flex"} flexDirection={"row"} justifyContent={"space-around"}>
            {props.children}
          </Box>
          <Divider/>
          <OrdersField text={props.item}/>
        </Box>
      </Paper>
    </Box>)
  }
  return (<Box padding={"1em"} display={"flex"} flexDirection={"column"} gap={"0.5em"}>
    <RequestTab/>
    <OrderCheckField/>
    <Box padding={"0.5em"} display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>
      <PaperFrame label={"1. Generate the Request "} item={requestItem}>
        <IconButton onClick={onClickShuffle}><AutorenewIcon/>  </IconButton>
        <IconButton onClick={onClickCopy   }><ContentCopyIcon/></IconButton>
      </PaperFrame>
      <Box padding={"1em"}><ForwardIcon/></Box>
      <PaperFrame label={"2. Save the Order"} item={ordersItem}>
        <IconButton onClick={onClickPaste  }><ContentPasteGoIcon/>  </IconButton>
        <IconButton onClick={onClickClean  }><CleaningServicesIcon/></IconButton>
      </PaperFrame>
    </Box>
    <SnackCopy />
    <SnackPaste/>
  </Box>);
}

export default AskingPanel