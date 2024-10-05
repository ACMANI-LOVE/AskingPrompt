import { LabelText } from "@/component/atoms/text"
import { PromptField } from "@/component/atoms/textField"
import { SummaryPromptContext } from "@/component/context"
import { EditItem, OrderWithPrompt, DisplayItem, ViewItem, Order, RowDirection, BlocItem, AdditionalItem } from "@/component/molecules/promptItem"
import { BodySettingsProps } from "@/const/cons_promptProps"
import { Box, Divider } from "@mui/material"
import { useContext, useState, BaseSyntheticEvent, useEffect, useRef } from "react"

const BodySettings    = () => {
  const {summaryPrompt, setSummaryPrompt} = useContext(SummaryPromptContext)
  const property      = useRef<BodySettingsProps>(summaryPrompt.bodyProps)
  const onUpdateProps = useRef((prompts:string[])=>{
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
  })

  const mainColorOrder = property.current.mainBodyColor
  const subColorOrder  = property.current.subBodyColor
  const skinTypeOrder  = property.current.skinType.order
  const bodyTypeOrder  = property.current.bodyType.order
  const bodyTypePrompt = property.current.bodyType.prompt

  const boobSizeOrder  = property.current.boobSize.order [Number(bodyTypePrompt)]
  const bodySizeOrder  = property.current.bodySize.order [Number(bodyTypePrompt)]
  const buttSizeOrder  = property.current.buttSize.order [Number(bodyTypePrompt)]
  const boobSizePrompt = property.current.boobSize.prompt[Number(bodyTypePrompt)]
  const bodySizePrompt = property.current.bodySize.prompt[Number(bodyTypePrompt)]
  const buttSizePrompt = property.current.buttSize.prompt[Number(bodyTypePrompt)]
  const [skinPrompt, setSkinPrompt] = useState(property.current.skinPrompt)
  const [additional, setAdditional] = useState(property.current.additional)

  const [display, setDisplay] = useState(property.current.prompts)

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
    onUpdateProps.current(prompts)
  },[
    skinPrompt,
    additional,
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