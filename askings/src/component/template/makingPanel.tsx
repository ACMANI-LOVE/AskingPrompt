import { downloadByJson, zeroPads, listingFromJson } from '@/util';
import { useEffect, useContext, ChangeEvent } from 'react';
import useRadioGroup from '../organs/radioGroup';
import { SelectContext, DataListContext } from '../context';
import useHiddenUploadForm from '../organs/uploadFIle';
import useSnackBar from '../organs/snackBar';
import useTabGroup from '../organs/tabGroup';
import { DividerLine, DownloadingIcon, Layout, LText, MText, OrderChecker, PaperLayout, SText, UploadingIcon } from '../atoms';
import BasisSettings from './settingsPanel/basisSettings';
import FacesSettings from './settingsPanel/facesSettings';
import BodiesSettings from './settingsPanel/bodiesSettings';
import DetailsSettings from './settingsPanel/dtailsSettings';
import OptionsSettings from './settingsPanel/optionsSettings';
import PromptsSettings from './settingsPanel/promptSettings';
import getPromptProperty from '@/app/api/func/gePromptProperty';

const MakingPanel = () => {
  const {selection    , setSelection     } = useContext(SelectContext  )
  const {dataList     , setDataList      } = useContext(DataListContext)

  const [OrderRadio, selectOrderRadio] = useRadioGroup({
    initial:  selection.orderSelect,
    itemList: dataList.orderList.map((order,idx)=><Layout key={`order${idx}`} center>
      <MText text={`Order:${zeroPads(idx+1)}`}/>
      <OrderChecker key={`orderChk${idx}`} order={order}/>
    </Layout>)
  })
  const settingsList = [
    { label:"Basis"  , settings:<BasisSettings   orderSelect={selection.orderSelect}/> },
    { label:"Faces"  , settings:<FacesSettings   orderSelect={selection.orderSelect}/> },
    { label:"Bodies" , settings:<BodiesSettings  orderSelect={selection.orderSelect}/> },
    { label:"Colors" , settings:<DetailsSettings  orderSelect={selection.orderSelect}/> },
    { label:"Options", settings:<OptionsSettings orderSelect={selection.orderSelect}/> },
    { label:"Prompts", settings:<PromptsSettings orderSelect={selection.orderSelect}/> },
  ]

  const [SettingsTab, selectSettingsTab] = useTabGroup({
    initial: selection.settingSelect,
    labelList: settingsList.map((item,idx)=><MText text={`${zeroPads(idx+1)}:${item.label}`}/>),
  })

  useEffect(()=>setSelection(prev=>({ ...prev,
    orderSelect  : selectOrderRadio,
    settingSelect: selectSettingsTab,
  })),[
    setSelection,
    selectOrderRadio,
    selectSettingsTab,
  ])

  const [SnackUpload, openSnackUpload] = useSnackBar({message:'JSON ROADED!'  });
  const [SnackFailed, openSnackFailed] = useSnackBar({message:'Upload FAILED!'});

  const onClickSave = () =>downloadByJson(dataList.orderList)

  const { UploadForm, onClickUpload } = useHiddenUploadForm({
    onUpload: async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      const uploadList = await listingFromJson(file);
      if (uploadList) {
        setDataList(prev=>({ ...prev, orderList:uploadList,
          settingList: prev.settingList.map((_,idx)=>getPromptProperty(uploadList[idx]))
         }))
        openSnackUpload()
      } else {
        openSnackFailed();
      }
    }
  })

  return(<Layout center vertical>
    <Layout>
      <Layout size={2}><LText bold text={"3. Select Order"}/></Layout>
      <Layout size={8}>
        <LText bold text={"Fin. Set the Prompts"}/>
        <SText bold text={`--- Selected:[${zeroPads(selection.orderSelect+1)}]`}/>
      </Layout>
    </Layout>
    <Layout>
      <Layout size={2}>
        <PaperLayout vertical>
          <Layout center><OrderRadio/></Layout>
          <DividerLine/>
          <UploadingIcon   onClick={onClickUpload}>
            <MText bold text={"Upload File: "}/>
            <UploadForm/>
          </UploadingIcon>
          <DividerLine/>
            <DownloadingIcon onClick={onClickSave  }>
            <MText bold text={"Save Order: " }/>
          </DownloadingIcon>
        </PaperLayout>
      </Layout>
      <Layout size={8} vertical>
        <Layout center ><SettingsTab/></Layout>
        <Layout center >{settingsList[selection.settingSelect].settings}</Layout>
      </Layout>
    </Layout>
    <SnackUpload/>
    <SnackFailed/>
  </Layout>)
}

export default MakingPanel