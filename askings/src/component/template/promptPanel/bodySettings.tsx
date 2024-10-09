import { LabelText } from "@/component/atoms/text"
import { PromptField } from "@/component/atoms/textField"
import { DataListContext } from "@/component/context"
import { AdditionalItem, BlocItem, ColorOrder, DisplayItem, EditItem, Order, OrderWithPrompt, RowDirection, ViewItem } from "@/component/molecules/promptItem"
import { Box, Divider } from "@mui/material"
import { BaseSyntheticEvent, useContext, useEffect, useRef, useState } from "react"

const BodySettings    = (props:{orderSelect:number}) => {
  const orderSelect = useRef(props.orderSelect)
  useEffect(()=>{orderSelect.current = props.orderSelect},[props.orderSelect])
  const {dataList, setDataList} = useContext(DataListContext)
  const property =  dataList.settingList[orderSelect.current].bodyProps

  const mainColorOrder = property.mainBodyColor
  const subColorOrder  = property.subBodyColor
  const skinTypeOrder  = property.skinType.order
  const bodyTypeOrder  = property.bodyType.order
  const bodyTypePrompt = property.bodyType.prompt

  const boobSizeOrder  = property.boobSize.order [Number(bodyTypePrompt)]
  const bodySizeOrder  = property.bodySize.order [Number(bodyTypePrompt)]
  const buttSizeOrder  = property.buttSize.order [Number(bodyTypePrompt)]
  const boobSizePrompt = property.boobSize.prompt[Number(bodyTypePrompt)]
  const bodySizePrompt = property.bodySize.prompt[Number(bodyTypePrompt)]
  const buttSizePrompt = property.buttSize.prompt[Number(bodyTypePrompt)]
  const [skinPrompt, setSkinPrompt] = useState(property.skinPrompt)
  const [additional, setAdditional] = useState(property.additional)

  const [display, setDisplay] = useState(property.prompts)

  const handleSkinPromptChange = (e:BaseSyntheticEvent) => setSkinPrompt(e.target.value)
  const handleAdditionalChange = (e:BaseSyntheticEvent) => setAdditional(e.target.value)

  useEffect(()=>{
    const prompts = [
      skinPrompt,
      "shiny skin, sweaty skin",
      boobSizePrompt,
      bodySizePrompt,
      buttSizePrompt,
      (bodyTypePrompt==="1") ? "thick thighs" : "",
      additional,
    ]
    const summaryPrompt = `${prompts.filter(prompt=>prompt!=="").join(", ")},`;
    setDisplay(summaryPrompt)
    setDataList(prev=>({ ...prev,
      settingList: prev.settingList.map((prevListItem,idx)=>{
        return (idx === orderSelect.current)
        ? {
            ...prevListItem, bodyProps: {
              ...prevListItem.bodyProps,
              skinInput : skinPrompt   ,
              additional  : additional   ,
              prompts   : summaryPrompt,
            }
        } : prevListItem
      })
    }))
  },[
    setDataList   ,
    skinPrompt    ,
    additional    ,
    bodyTypePrompt,
    bodySizePrompt,
    boobSizePrompt,
    buttSizePrompt,
  ])

return (<Box display={"flex"} flexDirection={"column"} gap={"0.25em"}>
    <LabelText bold text={'BodySetting Prompt'}/>
    <Divider/>
    <ViewItem label={'Skin Type: '}><Order order={skinTypeOrder} /></ViewItem>
    <RowDirection>
      <ViewItem label={'BodyColor [Main]: '}><ColorOrder colorText={mainColorOrder} /></ViewItem>
      <ViewItem label={'BodyColor [Sub]: ' }><ColorOrder colorText={subColorOrder } /></ViewItem>
    </RowDirection>
    <EditItem label={'Skin Prompt: '}/>
    <BlocItem><PromptField value={skinPrompt} onChange={handleSkinPromptChange}/></BlocItem>
    <Divider/>
    <ViewItem label={'Figure Type:'}><Order order={bodyTypeOrder} /></ViewItem>
    <ViewItem label={'Boob size: ' }><OrderWithPrompt order={boobSizeOrder} value={boobSizePrompt} /></ViewItem>
    <ViewItem label={'Body size: ' }><OrderWithPrompt order={bodySizeOrder} value={bodySizePrompt} /></ViewItem>
    <ViewItem label={'Butt size: ' }><OrderWithPrompt order={buttSizeOrder} value={buttSizePrompt} /></ViewItem>
    <Divider/>
    <AdditionalItem additional={additional} onChange={handleAdditionalChange}/>
    <DisplayItem text={display}/>
  </Box>)
}

export default BodySettings