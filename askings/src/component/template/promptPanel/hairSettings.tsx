import { LabelText } from "@/component/atoms/text"
import { SummaryPromptContext } from "@/component/context"
import { ViewItem, EditItem, DisplayItem, OrderWithInput, AdditionalItem, OrderWithPrompt } from "@/component/molecules/promptItem"
import { HairSettingsProps } from "@/const/cons_promptProps"
import { Box, Divider } from "@mui/material"
import { useState, BaseSyntheticEvent, useEffect, useContext, useRef } from "react"

const HairSettings    = (props:{orderSelect:number}) => {
  const {summaryPrompt, setSummaryPrompt} = useContext(SummaryPromptContext)
  const property      = useRef<HairSettingsProps>(summaryPrompt[props.orderSelect].hairProps)
  const onUpdateProps = useRef((prompts:string[])=>{
    const summaryPrompt = `${prompts.filter(prompt=>prompt!=="").join(", ")},`;
    setDisplay(summaryPrompt)
    setSummaryPrompt(prevList=>prevList.map((prev,idx)=>{
      return (idx === props.orderSelect)
      ? {
        ...prev, hairProps: {
          ...prev.hairProps,
          hairColorPrompt  : hairColorInput ,
          hairStylePrompt  : hairStyleInput ,
          bangsStylePrompt : bangsStyleInput,
          additional      : additional     ,
          prompts         : summaryPrompt  ,
        },
      } : prev
    }))
  })
  const hairColorOrder  = property.current.hairColor
  const hairStyleOrder  = property.current.hairStyle
  const bangsStyleOrder = property.current.bangsStyle
  const hairSizeOrder   = property.current.hairSize .order
  const bangsSizeOrder  = property.current.bangsSize.order

  const [hairColorInput , setHairColorInput ] = useState(property.current.hairColorPrompt )
  const [hairStyleInput , setHairStyleInput ] = useState(property.current.hairStylePrompt )
  const [bangsStyleInput, setBangsStyleInput] = useState(property.current.bangsStylePrompt)
  const [additional     , setAdditional     ] = useState(property.current.additional)

  const [display, setDisplay] = useState(property.current.prompts)

  const handleHairColorInputChange  = (e:BaseSyntheticEvent) => setHairColorInput (e.target.value)
  const handleHairStyleInputChange  = (e:BaseSyntheticEvent) => setHairStyleInput (e.target.value)
  const handleBangsStyleInputChange = (e:BaseSyntheticEvent) => setBangsStyleInput(e.target.value)
  const handleAdditionalChange      = (e:BaseSyntheticEvent) => setAdditional     (e.target.value)

  const hairSizePrompt  = property.current.hairSize .prompt
  const bangsSizePrompt = property.current.bangsSize.prompt

  useEffect(()=>{
    const prompts = [
      hairColorInput ,
      hairSizePrompt ,
      hairStyleInput ,
      bangsSizePrompt,
      bangsStyleInput,
      additional     ,
    ]
    onUpdateProps.current(prompts)
  },[
    hairColorInput ,
    hairStyleInput ,
    bangsStyleInput,
    additional     ,
    hairSizePrompt ,
    bangsSizePrompt,
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