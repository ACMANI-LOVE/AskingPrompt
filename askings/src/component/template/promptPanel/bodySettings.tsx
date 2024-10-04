import { LabelText } from "@/component/atoms/text"
import { PromptField } from "@/component/atoms/textField"
import { SummaryPromptContext } from "@/component/context"
import { EditItem, OrderWithPrompt, DisplayItem, ViewItem, Order, RowDirection, BlocItem, AdditionalItem } from "@/component/molecules/promptItem"
import { getSkinData, getFigureData, getBoobSizeData, getBodySizeData, getButtSizeData } from "@/const/cons_promptOrder"
import { BodySettingsProps } from "@/const/cons_promptProps"
import { Box, Divider } from "@mui/material"
import { useContext, useState, BaseSyntheticEvent, useEffect } from "react"

const BodySettings    = () => {
  const {summaryPrompt, setSummaryPrompt} = useContext(SummaryPromptContext)
  const property = summaryPrompt.bodyProps as BodySettingsProps
  const mainColorOrder = property.mainBodyColor
  const subColorOrder  = property.subBodyColor
  const skinTypeOrder  = getSkinData    ({enums:property.skinTypeOrder}).order
  const bodyTypeOrder  = getFigureData  ({enums:property.bodyTypeOrder}).order
  const bodyTypePrompt = Number(getFigureData({enums:property.bodyTypeOrder}).prompt)

  const boobSizeOrder  = getBoobSizeData({enums:property.boobSizeOrder}).order[bodyTypePrompt]
  const bodySizeOrder  = getBodySizeData({enums:property.bodySizeOrder}).order[bodyTypePrompt]
  const buttSizeOrder  = getButtSizeData({enums:property.buttSizeOrder}).order[bodyTypePrompt]
  const boobSizePrompt  = getBoobSizeData({enums:property.boobSizeOrder}).prompt[bodyTypePrompt]
  const bodySizePrompt  = getBodySizeData({enums:property.bodySizeOrder}).prompt[bodyTypePrompt]
  const buttSizePrompt  = getButtSizeData({enums:property.buttSizeOrder}).prompt[bodyTypePrompt]
  const [skinPrompt, setSkinPrompt] = useState(property.skinPrompt ?? ""  )
  const [additional, setAdditional] = useState(property.additional ?? ""  )

  const [display, setDisplay] = useState(property.prompts ?? "")

  const handleSkinPromptChange = (e:BaseSyntheticEvent) => setSkinPrompt(e.target.value)
  const handleAdditionalChange = (e:BaseSyntheticEvent) => setAdditional(e.target.value)

  useEffect(()=>{
    const prompts = [
      skinPrompt,
      "shiny skin, sweaty skin",
      bodyTypePrompt,
      boobSizePrompt,
      bodySizePrompt,
      buttSizePrompt,
      additional,
    ]
    const summaryPrompt = `${prompts.filter(prompt=>prompt!=="").join(", ")},`;
    setDisplay(summaryPrompt)
    setSummaryPrompt(prev=>({
      ...prev, bodyProps: {
        ...prev.bodyProps,
        skinInput : skinPrompt   ,
        additional  : additional   ,
        prompts   : summaryPrompt,
      },
    }))
  },[
    skinPrompt,
    additional,
    bodyTypePrompt,
    bodySizePrompt,
    boobSizePrompt,
    buttSizePrompt,
    setSummaryPrompt,
  ])

return (<Box display={"flex"} flexDirection={"column"} gap={"0.25em"}>
    <LabelText bold text={'BodySetting Prompt'}/>
    <Divider/>
    <ViewItem label={'Skin Type: '}><Order order={skinTypeOrder} /></ViewItem>
    <RowDirection>
      <ViewItem label={'BodyColor [Main]: '}><Order order={mainColorOrder} /></ViewItem>
      <ViewItem label={'BodyColor [Sub]: ' }><Order order={subColorOrder } /></ViewItem>
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