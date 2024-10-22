import { getTierOrder } from "@/app/api/func/getOrders"
import { getPosingData, getEmotesData, getActionData } from "@/app/api/func/getPrompts"
import { PaperLayout, LText, DividerLine, MText, IndentLayout, Layout, EdgeLayout, CheckBoxes, CopyingIcon, OrdersField, ShuffleIcon, PromptField, SingleLineTable, PosingLineTable } from "@/component/atoms"
import { DataListContext } from "@/component/context"
import useGetPromptText from "@/component/hooks/getPromptText"
import { LabelText } from "@/component/molecules"
import useSnackBar from "@/component/organs/snackBar"
import useTabGroup from "@/component/organs/tabGroup"
import { Tiers } from "@/const/enum_requests"
import { zeroPads } from "@/util"
import { useState, useContext, useEffect, BaseSyntheticEvent, useRef } from "react"

const PromptsSettings = (props:{orderSelect:number}) => {
  const { orderSelect } = props
  const {dataList, setDataList} = useContext(DataListContext)
  const prompts = dataList.settingList[orderSelect].promptsProps

  const [tier            , setTier            ] = useState(prompts.promptTier)
  const [posing          , setPosing          ] = useState(prompts.posingList)
  const [emotes          , setEmotes          ] = useState(prompts.emotesList)
  const [action          , setAction          ] = useState(prompts.actionList)

  const [promptSelect    , setPromptSelect    ] = useState(0)
  const [additionalPrompt, setAdditionalPrompt] = useState(prompts.additional)
  const handleOptionChange = (e:BaseSyntheticEvent) => setAdditionalPrompt(e.target.value)
  const handleTiersChange = (update:number) => setTier((tier===update) ? 0 : update)

  const { summaryPrompts } = useGetPromptText({ init:prompts.promptList, orderSelect, promptSelect, tier })

  const promptLabel = summaryPrompts.map((_,idx)=><Layout key={`reqLbl${idx}`} center>
    <MText bold text={`REQ:#${zeroPads(idx+1)}`}/>
  </Layout>)
  const [SnackCopy, openCopy] = useSnackBar({message:"Field Copied!!!"  })
  const [ProductTab, selectProductTab] = useTabGroup({ initial: promptSelect, labelList: promptLabel })
  useEffect(()=>setPromptSelect(selectProductTab),[selectProductTab])

  const onClickCopying = () => navigator.clipboard.writeText(summaryPrompts[promptSelect]).finally(()=>openCopy())
  const onClickShuffle = () => {
    setPosing(prev=>prev.map((prevItem,idx)=>(idx===promptSelect)?getPosingData()    :prevItem))
    setEmotes(prev=>prev.map((prevItem,idx)=>(idx===promptSelect)?getEmotesData(tier):prevItem))
    setAction(prev=>prev.map((prevItem,idx)=>(idx===promptSelect)?getActionData(tier):prevItem))
  }
  useEffect(()=>{
    setPosing(prev=>prev.map(()=>getPosingData()    ))
    setEmotes(prev=>prev.map(()=>getEmotesData(tier)))
    setAction(prev=>prev.map(()=>getActionData(tier)))
    setDataList(prev=>({ ...prev,
      settingList: prev.settingList.map((prevListItem,idx)=>{
        return (idx === orderSelect)
        ? { ...prevListItem,
          promptsProps: { ...prevListItem.promptsProps,
            promptTier: tier,
          }
        } : prevListItem
      })
    }))
  },[
    tier,
    orderSelect     ,
    setDataList     ,
    additionalPrompt,
  ])

  useEffect(()=>{
    setDataList(prev=>({ ...prev,
      settingList: prev.settingList.map((prevListItem,idx)=>{
        return (idx === orderSelect)
        ? { ...prevListItem,
          promptsProps: { ...prevListItem.promptsProps,
            additional: additionalPrompt,
            posingList: posing,
            emotesList: emotes,
            actionList: action,
          }
        } : prevListItem
      })
    }))
  },[
    posing          ,
    emotes          ,
    action          ,
    orderSelect     ,
    setDataList     ,
    additionalPrompt,
  ])

  return (<Layout vertical>
    <PaperLayout vertical>
      <Layout><LText bold text={"Prompts Settings"} /></Layout>
      <DividerLine/>
      <IndentLayout vertical>
        <LabelText text={`Production Tier:\n[${getTierOrder(tier)}]`} editable/>
        <IndentLayout>
          <EdgeLayout ended><CheckBoxes label={"Level S :"} value={tier===Number(Tiers.Safe )} onChange={()=>handleTiersChange(Number(Tiers.Safe ))}/></EdgeLayout>
          <EdgeLayout ended><CheckBoxes label={"Level Q :"} value={tier===Number(Tiers.Nude )} onChange={()=>handleTiersChange(Number(Tiers.Nude ))}/></EdgeLayout>
          <EdgeLayout ended><CheckBoxes label={"Level E :"} value={tier===Number(Tiers.Nasty)} onChange={()=>handleTiersChange(Number(Tiers.Nasty))}/></EdgeLayout>
          <EdgeLayout ended><CheckBoxes label={"Level E+:"} value={tier===Number(Tiers.Hard )} onChange={()=>handleTiersChange(Number(Tiers.Hard ))}/></EdgeLayout>
        </IndentLayout>
        <DividerLine/>
        <LabelText text={"Additional:"} editable/>
        <IndentLayout><PromptField value={additionalPrompt} onChange={handleOptionChange}/></IndentLayout>
        <DividerLine/>
        <Layout><ProductTab/></Layout>
        <Layout>
          <Layout size={9}><OrdersField line={15} text={summaryPrompts[promptSelect]}/></Layout>
          <EdgeLayout vertical size={1}>
            <Layout><CopyingIcon onClick={onClickCopying}/></Layout>
            <Layout><ShuffleIcon onClick={onClickShuffle}/></Layout>
          </EdgeLayout>
        </Layout>
        <DividerLine/>
        <EdgeLayout>
          <Layout><SingleLineTable label={"Emotion:"} data={emotes[promptSelect]}/></Layout>
          <Layout><SingleLineTable label={"Actions:"} data={action[promptSelect]}/></Layout>
        </EdgeLayout>
        <DividerLine/>
        <Layout><PosingLineTable data={posing}/></Layout>
      </IndentLayout>
      <DividerLine/>
    </PaperLayout>
    <SnackCopy/>
  </Layout>)
}
export default PromptsSettings