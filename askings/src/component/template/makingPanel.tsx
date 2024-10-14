import { downloadByJson, zeroPads, listingFromJson } from '@/util';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import UploadIcon from '@mui/icons-material/Upload';
import { Paper, Divider, IconButton, Grid2 as Grid } from '@mui/material';
import { useEffect, useContext, ChangeEvent } from 'react';
import { LText, MText, SText } from '../atoms/text';
import useRadioGroup from '../organs/radioGroup';
import { SelectContext, DataListContext } from '../context';
import BaseSettings from './promptPanel/baseSettings';
import FaceSettings from './promptPanel/faceSettings';
import BodySettings from './promptPanel/bodySettings';
import FluidSettings from './promptPanel/fluidSettings';
import EmotionSettings from './promptPanel/emotionSettings';
import ActionSettings from './promptPanel/actionSettings';
import PosingSettings from './promptPanel/posingSettings';
import { OrderChecker } from '../molecules/promptItem';
import useHiddenUploadForm from '../organs/uploadFIle';
import useSnackBar from '../organs/snackBar';
import getPromptProperties from '@/app/api/func/getPromptProperties';
import PromptSummaries from './promptPanel/promptSums';
import useTabGroup from '../organs/tabGroup';

const MakingPanel = () => {
  const {selection    , setSelection     } = useContext(SelectContext  )
  const {dataList     , setDataList      } = useContext(DataListContext)

  const ordersLabel = dataList.orderList.map((_,idx)=>`Order:${zeroPads(idx+1)}`)
  const [OrderRadio, selectOrderRadio] = useRadioGroup({
    initial:  selection.orderSelect,
    itemList: ordersLabel
  })

  const [SettingsTab, selectSettingsTab] = useTabGroup({
    initial: selection.settingSelect,
    labelList: [
      "Base"   ,
      "Face"   ,
      "Body"   ,
      "Emotion",
      "Fluid"  ,
      "Action" ,
      "Posing" ,
      "Color"  ,
      "Summaries",
    ],
    labelLine: 2
  })

  useEffect(()=>setSelection(prev=>({ ...prev,
    orderSelect  : selectOrderRadio,
    settingSelect: selectSettingsTab,
  })),[
    setSelection,
    selectOrderRadio,
    selectSettingsTab,
  ])

  const settingsList = [
    <BaseSettings    orderSelect={selection.orderSelect} key={"BaseSettingsField"    } />,
    <FaceSettings    orderSelect={selection.orderSelect} key={"FaceSettingsField"    } />,
    <BodySettings    orderSelect={selection.orderSelect} key={"BodySettingsField"    } />,
    <EmotionSettings orderSelect={selection.orderSelect} key={"EmotionSettingsField" } />,
    <FluidSettings   orderSelect={selection.orderSelect} key={"FluidSettingsField"   } />,
    <ActionSettings  orderSelect={selection.orderSelect} key={"ActionSettingsField"  } />,
    <PosingSettings  orderSelect={selection.orderSelect} key={"PosingSettingsField"  } />,
    <PromptSummaries orderSelect={selection.orderSelect} key={"PromptSummaries"      } />,
  ]

  const [SnackUpload, openSnackUpload] = useSnackBar({message:'JSON ROADED!'  });
  const [SnackFailed, openSnackFailed] = useSnackBar({message:'Upload FAILED!'});
  const onClickSave = () =>downloadByJson(dataList.orderList)
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
  return(<Grid container justifyContent={"center"}>
    <Grid size={ 2} padding={"0.5em"} gap={"0.5em"} alignContent={"start"} container>
      <Grid size={12}><LText bold text={"3. Select Order"}/></Grid>
      <Grid size={12}><Paper><Grid container padding={"0.5em"} gap={"0.5em"} justifyContent={"space-between"}>
        <Grid size={1} display={"flex"} flexDirection={"column"} justifyContent={"space-around"} paddingInlineEnd={"1.5em"}><OrderRadio/></Grid>
        <Grid size={1} display={"flex"} flexDirection={"column"} justifyContent={"space-around"} paddingInlineEnd={"1.5em"}>{dataList.orderList.map((order,idx)=><OrderChecker key={`orderChk${idx}`} order={order}/>)}</Grid>
        <Grid size={12}><Divider/></Grid>
        <Grid size={12}>
          <IconButton onClick={onClickUpload}>
            <MText bold text={"Upload File: "}/>
            <UploadIcon/>
            <UploadForm/>
          </IconButton>
        </Grid>
        <Grid size={12}><Divider/></Grid>
        <Grid size={12}>
          <IconButton onClick={onClickSave  }>
            <MText bold text={"Save Order: " }/>
            <SaveAltIcon/>
          </IconButton>
        </Grid>
      </Grid></Paper></Grid>
    </Grid>
    <Grid size={10} padding={"0.5em"} gap={"0.5em"} container>
      <Grid size={ 3}><LText bold text={"Fin. Set the Prompts"}/></Grid>
      <Grid size={ 3}><SText bold text={`--- Selected:[${ordersLabel[selection.orderSelect]}]`}/></Grid>
      <Grid size={12}><SettingsTab/></Grid>
      <Grid size={12}><Paper><Grid container padding={"0.5em"} gap={"0.5em"}>
        <Grid size={12}>{settingsList[selection.settingSelect]}</Grid>
      </Grid></Paper></Grid>
    </Grid>
    <SnackUpload/>
    <SnackFailed/>
  </Grid>)
}

export default MakingPanel