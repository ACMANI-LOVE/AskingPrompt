import { getTierOrder } from "@/app/api/func/getOrders"
import { getPosingData, getEmotesData, getActionData } from "@/app/api/func/getPrompts"
import { PaperLayout, LText, DividerLine, MText, IndentLayout, Layout, EdgeLayout, CheckBoxes, CopyingIcon, OrdersField, ShuffleIcon, PromptField, SingleLineTable, PosingLineTable } from "@/component/atoms"
import { DataListContext } from "@/component/context"
import { LabelText } from "@/component/molecules"
import useSnackBar from "@/component/organs/snackBar"
import useTabGroup from "@/component/organs/tabGroup"
import { Tiers } from "@/const/enum_requests"
import LABEL_TEXT from "@/const/LABEL_TEXT"
import { zeroPads } from "@/util"
import { useState, useContext, useEffect, BaseSyntheticEvent } from "react"

const PromptsSettings = (props:{orderSelect:number}) => {
  const { orderSelect } = props
  const {dataList, setDataList} = useContext(DataListContext)
  const basis   = dataList.settingList[orderSelect].basisProps
  const faces   = dataList.settingList[orderSelect].facesProps
  const bodies  = dataList.settingList[orderSelect].bodiesProps
  const options = dataList.settingList[orderSelect].optionsProps
  const colors  = dataList.settingList[orderSelect].detailsProps
  const prompts = dataList.settingList[orderSelect].promptsProps

  const [tier    , setTier    ] = useState(prompts.promptTier)
  const [posing  , setPosing  ] = useState(prompts.posingList)
  const [emotes  , setEmotes  ] = useState(prompts.emotesList)
  const [action  , setAction  ] = useState(prompts.actionList)
  const [products, setProducts] = useState(prompts.promptList)
  const [additionalPrompt, setAdditionalPrompt] = useState(prompts.additional)
  const handleOptionChange = (e:BaseSyntheticEvent) => setAdditionalPrompt(e.target.value)
  const handleTiersChange = (update:number) => setTier((tier===update) ? 0 : update)

  const [select, setSelect] = useState(0)
  const promptLabel = products.map((_,idx)=><Layout key={`reqLbl${idx}`} center>
    <MText bold text={`REQ:#${zeroPads(idx+1)}`}/>
  </Layout>)

  const basisLine     = [
    (options.basis.solo) ? "SOLO" : "",
    (options.basis.cute) ? "CUTE" : "",
    basis.input.basisInput,
  ].filter(item=>item!=="").join(", ")
  const facesLine = [
    faces.face.looks      .prompt,
    faces.face.personality.prompt,
    (colors.input.eyesColor) ? `${colors.input.eyesColor} eyes` : "",
    faces.face.eyesShape  .prompt,
    (options.face.winked) ? "winking"    : "",
    (options.face.tongue) ? "tongue out" : "",
    faces.input.faceOptionInput,
  ].filter(item=>item!=="").join(", ")
  const hairsLine = [
    (colors.input.hairColor) ? `${colors.input.hairColor} hair` : "",
    faces.hair.hairsSize.prompt,
    faces.input.hairsStyleInput,
    faces.hair.bangsSize.prompt,
    faces.input.bangsStyleInput,
    faces.input.hairOptionInput,
  ].filter(item=>item!=="").join(", ")
  const bodiesLine = [
    bodies.body.boobSize.prompt,
    bodies.body.bodySize.prompt,
    bodies.body.buttSize.prompt,
    bodies.body.figures .prompt,
    bodies.input.bodyOptionInput,
  ].filter(item=>item!=="").join(", ")
  const genitalLine = []
  const fluidsLine  = []
  const emotesLine = emotes[select].filter(item=>item!=="").join(", ")
  const actionLine = action[select].filter(item=>item!=="").join(", ")
  const situationLine = [
    (options.basis.simple) ? basis.scene.period .prompt : "",
    (options.basis.simple) ? basis.scene.times  .prompt : "",
    (options.basis.simple) ? basis.scene.weather.prompt : "",
    (options.basis.simple) ? basis.input.locateInput : "",
  ].filter(item=>item!=="").join(", ")
  const posingLine = Object.values(posing[select]).map(v=>v).filter(item=>item!=="-").join(", ")

  const [SnackCopy   , openCopy   ] = useSnackBar({message:"Field Copied!!!"  })
  const onClickCopying = () => navigator.clipboard.writeText(products[select]).finally(()=>openCopy())
  const onClickShuffle = () => {
    setPosing(prev=>prev.map((prevItem,idx)=>(idx===select)?getPosingData()    :prevItem))
    setEmotes(prev=>prev.map((prevItem,idx)=>(idx===select)?getEmotesData(tier):prevItem))
    setAction(prev=>prev.map((prevItem,idx)=>(idx===select)?getActionData(tier):prevItem))
  }

  const [ProductTab,selectPrdTab] = useTabGroup({ initial: select, labelList: promptLabel })
  useEffect(()=>setSelect(selectPrdTab),[selectPrdTab])
  useEffect(()=>{
    setPosing(prev=>prev.map(()=>getPosingData()    ))
    setEmotes(prev=>prev.map(()=>getEmotesData(tier)))
    setAction(prev=>prev.map(()=>getActionData(tier)))
  },[ tier, ])
  useEffect(()=>{
    setProducts(prev=>prev.map((prevItem,idx)=>{
      return (idx === select)
      ? [
        LABEL_TEXT.promptHeader,
        basisLine    ,
        facesLine    ,
        hairsLine    ,
        bodiesLine   ,
        situationLine,
        emotesLine,
        actionLine,
        posingLine,
        LABEL_TEXT.promptFooter,
      ].filter(item=>item!=="").join(",\n") : prevItem
      }))
  },[
    select,
    actionLine   ,
    basisLine    ,
    bodiesLine   ,
    emotesLine   ,
    facesLine    ,
    hairsLine    ,
    posingLine   ,
    situationLine,
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
          <Layout size={9}><OrdersField line={15} text={products[select]}/></Layout>
          <EdgeLayout vertical size={1}>
            <Layout><CopyingIcon onClick={onClickCopying}/></Layout>
            <Layout><ShuffleIcon onClick={onClickShuffle}/></Layout>
          </EdgeLayout>
        </Layout>
        <DividerLine/>
        <EdgeLayout>
          <Layout><SingleLineTable label={"Emotion:"} data={emotes[select]}/></Layout>
          <Layout><SingleLineTable label={"Actions:"} data={action[select]}/></Layout>
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