import { useEffect, useContext } from 'react';
import useTabGroup from '@/component/organs/tabGroup';
import useSnackBar from "@/component/organs/snackBar";
import { zeroPads } from "@/util";
import { DataListContext, SelectContext } from '../context';
import { ArrowIcon, CopyingIcon, Layout, LText, MText, OrderChecker, OrdersField, PaperLayout, PastingIcon, ShuffleIcon, SweepingIcon } from '../atoms';
import getOrderRequest from '@/app/api/func/getOrderRequest';
import getPromptProperty from '@/app/api/func/gePromptProperty';

const AskingPanel = () => {
  const {selection, setSelection} = useContext(SelectContext)
  const {dataList,  setDataList } = useContext(DataListContext)

  const ordersItem   = dataList.orderList  [selection.orderSelect  ]
  const requestItem  = dataList.requestList[selection.requestSelect]
  const requestLabel = dataList.orderList.map((order,idx)=><Layout key={`reqLbl${idx}`} center>
    <MText bold text={`REQ:#${zeroPads(idx+1)}`}/>
    <OrderChecker order={order}/>
  </Layout>)

  const [SnackCopy   , openCopy   ] = useSnackBar({message:"Field Copied!!!"  })
  const [SnackPaste  , openPaste  ] = useSnackBar({message:"Field Pasted!!!"  })

  const [RequestTab,selectReqTab] = useTabGroup({ initial: selection.requestSelect, labelList: requestLabel })

  useEffect(()=>{
    setSelection(prev=>({
      ...prev,
      requestSelect:selectReqTab,
      orderSelect  :selectReqTab,
    }))
  },[selectReqTab,setSelection])

  const onClickShuffle = () => {
    const responseShuffle = getOrderRequest(selection.requestSelect) ?? "fetch failed"
    dataList.requestList = dataList.requestList.map((item,idx)=>(idx===selection.requestSelect) ? responseShuffle : item)
    setDataList(prev=>({
      ...prev,
      requestList: prev.requestList.map((item,idx)=>(idx===selection.requestSelect ? responseShuffle : item))
    }))
  }

  const onClickCopy = () => navigator.clipboard.writeText(dataList.requestList[selection.requestSelect]).finally(()=>openCopy())

  const onClickPaste = () => navigator.clipboard.readText().then((text)=>{
    const properties = getPromptProperty(text)
    setDataList(prev=>({
      ...prev,
      orderList:   prev.orderList.map((item,idx)=>(idx===selection.orderSelect ? text : item)),
      settingList: prev.settingList.map((item,idx)=>(idx===selection.orderSelect ? properties : item))
    }))
  }).finally(()=>openPaste())

  const onClickClean = () => setDataList(prev=>({
    ...prev,
    orderList: prev.orderList.map((item,idx)=>(idx===selection.orderSelect ? "{}" : item))
  }))

  return (<Layout vertical>
    <Layout center><RequestTab/></Layout>
    <Layout>
      <Layout size={7} vertical>
        <Layout center><LText bold text={"1. Generate the Request "}/></Layout>
        <PaperLayout vertical>
          <Layout>
            <Layout center><ShuffleIcon  onClick={onClickShuffle}/></Layout>
            <Layout center><CopyingIcon  onClick={onClickCopy   }/></Layout>
          </Layout>
          <Layout><OrdersField text={requestItem}/></Layout>
        </PaperLayout>
      </Layout>
      <Layout vertical center><ArrowIcon/></Layout>
      <Layout size={7} vertical>
        <Layout center><LText bold text={"2. Save the Order"       }/></Layout>
        <PaperLayout vertical>
          <Layout>
            <Layout center><PastingIcon  onClick={onClickPaste  }/></Layout>
            <Layout center><SweepingIcon onClick={onClickClean  }/></Layout>
          </Layout>
          <Layout><OrdersField text={ordersItem}/></Layout>
        </PaperLayout>
      </Layout>
    </Layout>
    <SnackCopy />
    <SnackPaste/>
  </Layout>);
}

export default AskingPanel