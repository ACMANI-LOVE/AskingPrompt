import { downloadByJson, zeroPads, listingFromJson } from '@/util';
import { useEffect, useContext, ChangeEvent } from 'react';
import { LText, MText, SText } from '../atoms/text';
import useRadioGroup from '../organs/radioGroup';
import { SelectContext, DataListContext } from '../context';
import useHiddenUploadForm from '../organs/uploadFIle';
import useSnackBar from '../organs/snackBar';
import getPromptProperties from '@/app/api/func/getPromptProperties';
import useTabGroup from '../organs/tabGroup';
import { DividerLine, DownloadingIcon, Layout, OrderChecker, PaperLayout, UploadingIcon } from '../atoms/atoms';

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
    { label:"Basis"  , settings:<>aa</> },
    { label:"Faces"  , settings:<>bb</> },
    { label:"Bodies" , settings:<>cc</> },
    { label:"Options", settings:<>dd</> },
    { label:"Colors" , settings:<>ff</> },
    { label:"Prompts", settings:<>ee</> },
  ]
  const SettingsContent = () => settingsList[selection.settingSelect].settings
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
          settingList: prev.settingList.map((_,idx)=>getPromptProperties({order:uploadList[idx]}))
         }))
        openSnackUpload()
      } else {
        openSnackFailed();
      }
    }
  })

return(<Layout center>
    <Layout vertical size={ 1}>
      <Layout center size={ 1}><LText bold text={"3. Select Order"}/></Layout>
      <Layout center size={20}>
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
    </Layout>
    <Layout vertical size={ 9}>
      <Layout center size={ 1}>
        <LText bold text={"Fin. Set the Prompts"}/>
        <SText bold text={`--- Selected:[${zeroPads(selection.orderSelect+1)}]`}/>
      </Layout>
      <Layout center size={ 2}><SettingsTab/>    </Layout>
      <Layout center size={18}><SettingsContent/></Layout>
    </Layout>
    <SnackUpload/>
    <SnackFailed/>
  </Layout>)
}

export default MakingPanel