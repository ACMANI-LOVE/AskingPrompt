import { LabelText } from "@/component/atoms/text"
import { SummaryPromptContext } from "@/component/context"
import { ViewItem, EditItem, DisplayItem, OrderWithInput, AdditionalItem, OrderWithPrompt } from "@/component/molecules/promptItem"
import { getHairSizeData, getBangsSizeData } from "@/const/cons_promptOrder"
import { HairSettingsProps } from "@/const/cons_promptProps"
import { Box, Divider } from "@mui/material"
import { useState, BaseSyntheticEvent, useEffect, useContext } from "react"

const HairSettings    = () => {
  const {summaryPrompt, setSummaryPrompt} = useContext(SummaryPromptContext)
  const property = summaryPrompt.hairProps as HairSettingsProps

  const hairColorOrder  = property.hairColor
  const hairStyleOrder  = property.hairStyle
  const bangsStyleOrder = property.bangsStyle
  const hairSizeOrder   = getHairSizeData ({enums:property.hairSize }).order
  const bangsSizeOrder  = getBangsSizeData({enums:property.bangsSize}).order

  const [hairColorInput , setHairColorInput ] = useState(property.hairColor  ?? "")
  const [hairStyleInput , setHairStyleInput ] = useState(property.hairStyle  ?? "")
  const [bangsStyleInput, setBangsStyleInput] = useState(property.bangsStyle ?? "")
  const [additional     , setAdditional     ] = useState(property.additional ?? "")

  const [display, setDisplay] = useState(property.prompts ?? "")

  const handleHairColorInputChange  = (e:BaseSyntheticEvent) => setHairColorInput (e.target.value)
  const handleHairStyleInputChange  = (e:BaseSyntheticEvent) => setHairStyleInput (e.target.value)
  const handleBangsStyleInputChange = (e:BaseSyntheticEvent) => setBangsStyleInput(e.target.value)
  const handleAdditionalChange      = (e:BaseSyntheticEvent) => setAdditional     (e.target.value)

  const hairSizePrompt  = getHairSizeData ({enums:property.hairSize }).prompt
  const bangsSizePrompt = getBangsSizeData({enums:property.bangsSize}).prompt

  useEffect(()=>{
    const prompts = [
      hairColorInput ,
      hairSizePrompt ,
      hairStyleInput ,
      bangsSizePrompt,
      bangsStyleInput,
      additional     ,
    ]
    const summaryPrompt = `${prompts.filter(prompt=>prompt!=="").join(", ")},`;
    setDisplay(summaryPrompt)
    setSummaryPrompt(prev=>({
      ...prev, hairProps: {
        ...prev.hairProps,
        hairColorInput  : hairColorInput ,
        hairStyleInput  : hairStyleInput ,
        bangsStyleInput : bangsStyleInput,
        additional      : additional     ,
        prompts         : summaryPrompt  ,
      },
    }))
  },[
    hairColorInput ,
    hairStyleInput ,
    bangsStyleInput,
    hairSizePrompt ,
    bangsSizePrompt,
    additional     ,
    setSummaryPrompt,
  ])

  return (<Box display={"flex"} flexDirection={"column"} gap={"0.25em"}>
    <LabelText bold text={'HairSetting Prompt'}/>
    <Divider/>
    <EditItem label={'Hair color:' }><OrderWithInput order={hairColorOrder } value={hairColorInput } onChange={handleHairColorInputChange }/></EditItem>
    <Divider/>
    <ViewItem label={'Hair size:'  }><OrderWithPrompt order={hairSizeOrder  } value={hairSizePrompt} /></ViewItem>
    <EditItem label={'Hair style:' }><OrderWithInput  order={hairStyleOrder } value={hairStyleInput} onChange={handleHairStyleInputChange }/></EditItem>
    <Divider/>
    <ViewItem label={'Bangs size:' }><OrderWithPrompt order={bangsSizeOrder } value={bangsSizePrompt} /></ViewItem>
    <EditItem label={'Bangs style:'}><OrderWithInput  order={bangsStyleOrder} value={bangsStyleInput} onChange={handleBangsStyleInputChange}/></EditItem>
    <Divider/>
    <AdditionalItem additional={additional} onChange={handleAdditionalChange}/>
    <DisplayItem text={display}/>
  </Box>)
}

export default HairSettings