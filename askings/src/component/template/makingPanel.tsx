import { downloadByJson, zeroPads, listingFromJson } from '@/util';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import UploadIcon from '@mui/icons-material/Upload';
import { Box, Paper, Divider, IconButton } from '@mui/material';
import { useEffect, useContext, ChangeEvent } from 'react';
import { ItemText, LabelText } from '../atoms/text';
import useRadioGroup from '../organs/radioGroup';
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
import useHiddenUploadForm from '../organs/uploadFIle';
import useSnackBar from '../organs/snackBar';
import { settingsLabel } from '@/const/const_text';
import getPromptProperties from '@/app/api/func/getPromptProperties';

const MakingPanel = () => {
  const {selection    , setSelection     } = useContext(SelectContext  )
  const {dataList     , setDataList      } = useContext(DataListContext)

  const ordersLabel = dataList.orderList.map((_,idx)=>`Order:${zeroPads(idx+1)}`)
  const [OrderRadio, selectOrderRadio] = useRadioGroup({
    initial:  selection.orderSelect,
    itemList: ordersLabel
  })

  const [SettingsRadio, selectSettingsRadio] = useRadioGroup({
    initial:  selection.settingSelect,
    itemList: settingsLabel,
  })

  useEffect(()=>setSelection(prev=>({ ...prev,
    orderSelect  : selectOrderRadio,
    settingSelect: selectSettingsRadio,
  })),[
    setSelection,
    selectOrderRadio,
    selectSettingsRadio,
  ])

  const OrdersField = () => {
    const [SnackUpload, openSnackUpload] = useSnackBar({message:'JSON ROADED!'  });
    const [SnackFailed, openSnackFailed] = useSnackBar({message:'Upload FAILED!'});

    const onClickSave     = () =>downloadByJson(dataList.orderList)
    const { UploadForm, onClickUpload } = useHiddenUploadForm({
      onUpload: async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        const uploadList = await listingFromJson(file);
        if (uploadList) {
          setDataList(prev=>({ ...prev, orderList:uploadList,
            settingList: prev.settingList.map((_,idx)=>getPromptProperties({order:uploadList[idx]}))
           }))
          openSnackUpload()
        } else {
          openSnackFailed();
        }
      }
    })

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
        <IconButton onClick={onClickUpload}><LabelText bold text={"Upload File: "}/>
          <UploadIcon/>
          <UploadForm/>
        </IconButton>
        <Divider/>
        <IconButton onClick={onClickSave  }><LabelText bold text={"Save Order: " }/><SaveAltIcon/></IconButton>
      </Box></Paper>
      <SnackUpload/>
      <SnackFailed/>
    </Box>)
  }

  const settingsList = [
    <BaseSettings    orderSelect={selection.orderSelect} key={"BaseSettingsField"} />,
    <HairSettings    orderSelect={selection.orderSelect} key={"HairSettingsField"} />,
    <FaceSettings    orderSelect={selection.orderSelect} key={"FaceSettingsField"} />,
    <BodySettings    orderSelect={selection.orderSelect} key={"BodySettingsField"} />,
    <SceneSettings   orderSelect={selection.orderSelect} key={"SceneSettingsField"} />,
    <GenitalSettings orderSelect={selection.orderSelect} key={"GenitalSettingsField"} />,
    <EmotionSettings orderSelect={selection.orderSelect} key={"EmotionSettingsField"} />,
    <FluidSettings   orderSelect={selection.orderSelect} key={"FluidSettingsField"} />,
    <ActionSettings  orderSelect={selection.orderSelect} key={"ActionSettingsField"} />,
    <PosingSettings  orderSelect={selection.orderSelect} key={"PosingSettingsField"} />,
    <>AAAA</>
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