import { downloadByJson, zeroPads } from '@/util';
import GetAppIcon from '@mui/icons-material/GetApp';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import UploadIcon from '@mui/icons-material/Upload';
import { Box, Paper, Divider, IconButton } from '@mui/material';
import { useEffect, useContext } from 'react';
import { ItemText, LabelText } from '../atoms/text';
import useRadioGroup from '../organs/radioGroup';
// import usePromptProperties from '@/hooks/usePromptProperties';
import { SelectContext, DataListContext } from '../context';
import BaseSettings from './promptPanel/baseSettings';
import HairSettings from './promptPanel/hairSettings';
import FaceSettings from './promptPanel/faceSettings';
import BodySettings from './promptPanel/bodySettings';
import SceneSettings from './promptPanel/sceneSettings';
import GenitalSettings from './promptPanel/genitalSettings';
import FluidSettings from './promptPanel/fluidSettings';
import EmotionSettings from './promptPanel/emotionSettings';
import ActionSettings from './promptPanel/actionSettings';
import PosingSettings from './promptPanel/posingSettings';
import { OrderChecker, RowDirection } from '../molecules/promptItem';

const MakingPanel = () => {
  const {selection, setSelection} = useContext(SelectContext)
  const {dataList,  setDataList } = useContext(DataListContext)

  const ordersLabel = dataList.orderList.map((_,idx)=>`Order:${zeroPads(idx+1)}`)
  const [OrderRadio, selectOrderRadio] = useRadioGroup({
    initial:  selection.orderSelect,
    itemList: ordersLabel
  })
  useEffect(()=>{
    setSelection(prev=>({
      ...prev,
      orderSelect:selectOrderRadio
    }))
    setDataList(prev=>({...prev}))
  },[selectOrderRadio, setDataList, setSelection])

  const [SettingsRadio, selectSettingsRadio] = useRadioGroup({
    initial:  selection.settingSelect,
    itemList: dataList.promptLabel
  })
  useEffect(()=>setSelection(prev=>({
    ...prev,
    settingSelect:selectSettingsRadio
  })),[selectSettingsRadio, setSelection])

  const OrdersField = () => {
    const onClickSave     = () =>downloadByJson(dataList.orderList)
    const onClickLoad     = () =>{}
    const onClickUpload   = () =>{}
    return (<Box>
      <Paper><Box padding={"0.5em 1em 0.5em 0.5em"} display={"flex"} flexDirection={"column"}>
        <LabelText bold text={"3. Select Order"}/>
        <Divider/>
        <RowDirection>
          <OrderRadio />
          <Box display={"flex"} flexDirection={"column"} justifyContent={"space-around"}>
            {dataList.orderList.map((order,idx)=><OrderChecker key={`orderChk${idx}`} order={order}/>)}
          </Box>
        </RowDirection>
        <Divider/>
        <IconButton onClick={onClickSave  }><LabelText bold text={"Save Order: " }/><SaveAltIcon/></IconButton>
        <Divider/>
        <IconButton onClick={onClickLoad  }><LabelText bold text={"Load Order: " }/><GetAppIcon/></IconButton>
        <IconButton onClick={onClickUpload}><LabelText bold text={"Upload File: "}/><UploadIcon/></IconButton>
      </Box></Paper>
    </Box>)
  }

  // const properties = usePromptProperties({ order:dataList.orderList[selection.orderSelect] })
  const settingsList = [
    <BaseSettings    key={"BaseSettingsField"   }/>,
    <HairSettings    key={"HairSettingsField"   }/>,
    <FaceSettings    key={"FaceSettingsField"   }/>,
    <BodySettings    key={"BodySettingsField"   }/>,
    <SceneSettings   key={"SceneSettingsField"  }/>,
    <GenitalSettings key={"GenitalSettingsField"}/>,
    <EmotionSettings key={"EmotionSettingsField"}/>,
    <FluidSettings   key={"FluidSettingsField"  }/>,
    <ActionSettings  key={"ActionSettingsField" }/>,
    <PosingSettings  key={"PosingSettingsField" }/>,
  ]
  return(<Box padding={"1em"} display={"flex"} flexDirection={"row"} gap={"0.5em"} justifyContent={"start"}>
    <OrdersField/>
    <Box flex={1}>
      <Paper><Box padding={"0.5em"} display={"flex"} flexDirection={"column"}>
        <LabelText bold text={"Fin. Set the Prompts"}/>
        <ItemText bold text={`Selected:[${ordersLabel[selection.orderSelect]}]`}/>
        <Divider/>
        <Box padding={"0.5em 1em 0.5em 0.5em"} display={"flex"} flexDirection={"row"} gap={"0.5em"}>
          <SettingsRadio/>
          <Divider orientation="vertical" flexItem/>
          <Box flex={1}>{settingsList[selection.settingSelect]}</Box>
        </Box>
      </Box></Paper>
    </Box>
  </Box>)
}

export default MakingPanel