import { useEffect, useContext } from 'react';
import { Paper, IconButton, Grid2 as Grid } from '@mui/material';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import useTabGroup from '@/component/organs/tabGroup';
import useSnackBar from "@/component/organs/snackBar";
import { OrdersField } from '@/component/atoms/textField';
import { LText, SText } from '@/component/atoms/text';
import { zeroPads } from "@/util";
import { DataListContext, SelectContext } from '../context';
import { OrderChecker } from '../molecules/promptItem';
import getRequestPrompt from '@/app/api/func/getRequestPrompt';
import getPromptProperties from '@/app/api/func/getPromptProperties';

const AskingPanel = () => {
  const {selection, setSelection} = useContext(SelectContext)
  const {dataList,  setDataList } = useContext(DataListContext)

  const requestLabel = dataList.requestList.map((_,idx)=>`REQ:#${zeroPads(idx+1)}`)
  const ordersItem   = dataList.orderList  [selection.orderSelect  ]
  const requestItem  = dataList.requestList[selection.requestSelect]

  const [RequestTab,selectReqTab] = useTabGroup({
    initial: selection.requestSelect,
    labelList: requestLabel
  })
  useEffect(()=>{
    setSelection(prev=>({
      ...prev,
      requestSelect:selectReqTab,
      orderSelect  :selectReqTab,
    }))
  },[selectReqTab,setSelection])

  const onClickShuffle = () => {
    // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api`, {
    //   method: 'POST',
    //   headers: {'Content-Type': 'application/json'},
    //   body: JSON.stringify({shuffle:{id:requestSelect.}} as RequestBodies)
    // })
    // const result:ResponseBodies = await response.json()
    // const { responseShuffle = "fetch failed" } = result
    const responseShuffle = getRequestPrompt(selection.requestSelect) ?? "fetch failed"
    dataList.requestList = dataList.requestList.map((item,idx)=>(idx===selection.requestSelect) ? responseShuffle : item)

    setDataList(prev=>({
      ...prev,
      requestList: prev.requestList.map((item,idx)=>(idx===selection.requestSelect ? responseShuffle : item))
    }))
  }
  const onClickCopy    = () => navigator.clipboard.writeText(dataList.requestList[selection.requestSelect]).finally(()=>openCopy())
  const onClickPaste   = () => navigator.clipboard.readText().then((text)=>{
    setDataList(prev=>({
      ...prev,
      orderList:   prev.orderList.map((item,idx)=>(idx===selection.orderSelect ? text : item)),
      settingList: prev.settingList.map((item,idx)=>(idx===selection.orderSelect ? getPromptProperties({order:text}) : item))
    }))
  }).finally(()=>openPaste())
  const onClickClean   = () => setDataList(prev=>({
    ...prev,
    orderList: prev.orderList.map((item,idx)=>(idx===selection.orderSelect ? "{}" : item))
  }))

  const [SnackCopy   , openCopy   ] = useSnackBar({message:"Field Copied!!!"  })
  const [SnackPaste  , openPaste  ] = useSnackBar({message:"Field Pasted!!!"  })

  return (<Grid container justifyContent={"center"}>
    <Grid size={12} container justifyContent={"space-around"}>
      {dataList.orderList.map((order,idx)=><Grid key={`order${idx}`}>
        <SText bold text={`Order#${zeroPads(idx+1)}:`}/>
        <OrderChecker order={order}/>
      </Grid>)}
    </Grid>
    <Grid size={12}><RequestTab/></Grid>
    <Grid size={12} container>
      <Grid size={6} padding={"0.5em"}><LText bold text={"1. Generate the Request "}/></Grid>
      <Grid size={6} padding={"0.5em"}><LText bold text={"2. Save the Order"}/></Grid>
      <Grid size={6} padding={"0.5em"}><Paper><Grid container padding={"0.5em"} gap={"0.5em"}>
        <Grid size={12} container>
          <Grid size={ 6}><IconButton onClick={onClickShuffle}><AutorenewIcon/>  </IconButton></Grid>
          <Grid size={ 6}><IconButton onClick={onClickCopy   }><ContentCopyIcon/></IconButton></Grid>
        </Grid>
        <Grid size={12}><OrdersField text={requestItem}/></Grid>
      </Grid></Paper></Grid>
      <Grid size={6} padding={"0.5em"}><Paper><Grid container padding={"0.5em"} gap={"0.5em"}>
        <Grid size={12} container>
          <Grid size={ 6}><IconButton onClick={onClickPaste  }><ContentPasteGoIcon/>  </IconButton></Grid>
          <Grid size={ 6}><IconButton onClick={onClickClean  }><CleaningServicesIcon/></IconButton></Grid>
        </Grid>
        <Grid size={12}><OrdersField text={ordersItem}/></Grid>
        </Grid></Paper></Grid>
    </Grid>
    <SnackCopy />
    <SnackPaste/>
  </Grid>);
}

export default AskingPanel