import { LabelText } from "@/component/atoms/text"
import { SummaryPromptContext } from "@/component/context"
import { ViewItem, EditItem, DisplayItem, OrderWithCheckBox, OrderWithInput, OrderWithPrompt, RowDirection, AdditionalItem } from "@/component/molecules/promptItem"
import { FaceSettingsProps } from "@/const/cons_promptProps"
import { randBool } from "@/util"
import { Box, Divider } from "@mui/material"
import { useState, BaseSyntheticEvent, useEffect, useContext, useRef } from "react"

const FaceSettings    = (props:{orderSelect:number}) => {
  const {summaryPrompt, setSummaryPrompt} = useContext(SummaryPromptContext)
  const property      = useRef<FaceSettingsProps>(summaryPrompt[props.orderSelect].faceProps)
  const onUpdateProps = useRef((prompts:string[])=>{
    const summaryPrompt = `${prompts.filter(prompt=>prompt!=="").join(", ")},`;
    setDisplay(summaryPrompt)
    setSummaryPrompt(prevList=>prevList.map((prev,idx)=>{
      return (idx === props.orderSelect)
      ? {
        ...prev, faceProps: {
          ...prev.faceProps,
          eyesColorPrompt     : eyesColorInput,
          random        : chkRandom      ,
          closeEyes     : chkCloseEyes   ,
          openMouth     : chkOpenMouth   ,
          tongueOut     : chkTongueOut   ,
          additional    : additional     ,
          prompts       : summaryPrompt  ,
        },
      } : prev
    }))
  })

  const eyesColorOrder   = property.current.eyesColor
  const faceLooksOrder   = property.current.faceLooks       .order
  const personalityOrder = property.current.personality.order
  const eyesShapeOrder   = property.current.eyesShape  .order

  const [chkRandom     , setChkRandom     ] = useState(property.current.random    )
  const [chkCloseEyes  , setChkCloseEyes  ] = useState(property.current.closeEyes )
  const [chkOpenMouth  , setChkOpenMouth  ] = useState(property.current.openMouth )
  const [chkTongueOut  , setChkTongueOut  ] = useState(property.current.tongueOut )
  const [eyesColorInput, setEyesColorInput] = useState(property.current.eyesColorPrompt )
  const [additional    , setAdditional    ] = useState(property.current.additional)

  const [display, setDisplay] = useState(property.current.prompts)

  const handleChangeRandomCheck    = () => setChkRandom   (!chkRandom   )
  const handleChangeCloseEyesCheck = () => setChkCloseEyes(!chkCloseEyes)
  const handleChangeOpenMouthCheck = () => setChkOpenMouth(!chkOpenMouth)
  const handleChangeTongueOutCheck = () => setChkTongueOut(!chkTongueOut)
  const handleEyesColorInputChange = (e:BaseSyntheticEvent) => setEyesColorInput(e.target.value)
  const handleAdditionalChange     = (e:BaseSyntheticEvent) => setAdditional    (e.target.value)

  const faceLooksPrompt   = property.current.faceLooks       .prompt
  const personalityPrompt = property.current.personality.prompt
  const eyesShapePrompt   = property.current.eyesShape  .prompt

  useEffect(()=>{
    const checkCloseEyesPrompt = (chkRandom) ? (randBool() ? "closed eyes"  : "") : ((chkCloseEyes) ? "closed eyes"  : "")
    const checkOpenMouthPrompt = (chkRandom) ? (randBool() ? "opened mouth" : "") : ((chkOpenMouth) ? "opened mouth" : "")
    const checkTongueOutPrompt = (chkRandom) ? (randBool() ? "tongue out"   : "") : ((chkTongueOut) ? "tongue out"   : "")
    const prompts = [
      faceLooksPrompt     ,
      personalityPrompt   ,
      eyesShapePrompt     ,
      eyesColorInput      ,
      checkCloseEyesPrompt,
      checkOpenMouthPrompt,
      checkTongueOutPrompt,
      additional          ,
    ]
    onUpdateProps.current(prompts)
  },[
    chkRandom     ,
    chkCloseEyes  ,
    chkOpenMouth  ,
    chkTongueOut  ,
    eyesColorInput,
    additional    ,
    faceLooksPrompt  ,
    personalityPrompt,
    eyesShapePrompt  ,
  ])

  return (<Box display={"flex"} flexDirection={"column"} gap={"0.25em"}>
    <LabelText bold text={'FaceSetting Prompt'}/>
    <Divider/>
    <ViewItem label={'Face looks:' }><OrderWithPrompt order={faceLooksOrder  } value={faceLooksPrompt  }/></ViewItem>
    <ViewItem label={'Personality:'}><OrderWithPrompt order={personalityOrder} value={personalityPrompt}/></ViewItem>
    <Divider/>
    <ViewItem label={'Eyes shape:' }><OrderWithPrompt order={eyesShapeOrder  } value={eyesShapePrompt  }/></ViewItem>
    <EditItem label={'Eyes color:' }><OrderWithInput  order={eyesColorOrder  } value={eyesColorInput   } onChange={handleEyesColorInputChange}/></EditItem>
    <Divider/>
    <EditItem  label={'Optional:'}/>
    <RowDirection noIdent>
      <OrderWithCheckBox order={"Random: "      } checked={chkRandom   } onChange={handleChangeRandomCheck   } disabled={false}    />
      <OrderWithCheckBox order={"Closed Eyes: " } checked={chkCloseEyes} onChange={handleChangeCloseEyesCheck} disabled={chkRandom}/>
      <OrderWithCheckBox order={"Opened Mouth: "} checked={chkOpenMouth} onChange={handleChangeOpenMouthCheck} disabled={chkRandom}/>
      <OrderWithCheckBox order={"Tongue Out: "  } checked={chkTongueOut} onChange={handleChangeTongueOutCheck} disabled={chkRandom}/>
    </RowDirection>
    <Divider/>
    <AdditionalItem additional={additional} onChange={handleAdditionalChange}/>
    <DisplayItem text={display}/>
  </Box>)
}

export default FaceSettings