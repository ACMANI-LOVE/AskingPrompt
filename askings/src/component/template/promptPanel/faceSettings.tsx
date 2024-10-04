import { LabelText } from "@/component/atoms/text"
import { SummaryPromptContext } from "@/component/context"
import { ViewItem, EditItem, DisplayItem, OrderWithCheckBox, OrderWithInput, OrderWithPrompt, RowDirection, AdditionalItem } from "@/component/molecules/promptItem"
import { getAgesData, getEyesShapeData, getMindData } from "@/const/cons_promptOrder"
import { FaceSettingsProps } from "@/const/cons_promptProps"
import { randBool } from "@/util"
import { Box, Divider } from "@mui/material"
import { useState, BaseSyntheticEvent, useEffect, useContext } from "react"

const FaceSettings    = () => {
  const {summaryPrompt, setSummaryPrompt} = useContext(SummaryPromptContext)
  const property = summaryPrompt.faceProps as FaceSettingsProps

  const eyesColorOrder   = property.eyesColorOrder
  const faceLooksOrder   = getAgesData     ({enums:property.faceLooks  }).order
  const personalityOrder = getMindData     ({enums:property.personalityOrder}).order
  const eyesShapeOrder   = getEyesShapeData({enums:property.eyesShapeOrder  }).order

  const [chkRandom   ,   setChkRandom     ] = useState(property.random     ?? false)
  const [chkCloseEyes,   setChkCloseEyes  ] = useState(property.closeEyes  ?? false)
  const [chkOpenMouth,   setChkOpenMouth  ] = useState(property.openMouth  ?? false)
  const [chkTongueOut,   setChkTongueOut  ] = useState(property.tongueOut  ?? false)
  const [eyesColorInput, setEyesColorInput] = useState(property.eyesColor  ?? ""   )
  const [additional  ,   setAdditional    ] = useState(property.additional ?? ""   )

  const [display, setDisplay] = useState(property.prompts ?? "")

  const handleChangeRandomCheck    = () => setChkRandom   (!chkRandom   )
  const handleChangeCloseEyesCheck = () => setChkCloseEyes(!chkCloseEyes)
  const handleChangeOpenMouthCheck = () => setChkOpenMouth(!chkOpenMouth)
  const handleChangeTongueOutCheck = () => setChkTongueOut(!chkTongueOut)
  const handleEyesColorInputChange = (e:BaseSyntheticEvent) => setEyesColorInput(e.target.value)
  const handleAdditionalChange     = (e:BaseSyntheticEvent) => setAdditional    (e.target.value)

  const faceLooksPrompt   = getAgesData     ({enums:property.faceLooks  }).prompt
  const personalityPrompt = getMindData     ({enums:property.personalityOrder}).prompt
  const eyesShapePrompt   = getEyesShapeData({enums:property.eyesShapeOrder  }).prompt

  useEffect(()=>{
    const eyesColorPrompt      = (eyesColorInput)  ? eyesColorInput      : ""
    const checkCloseEyesPrompt = (chkRandom) ? (randBool() ? "closed eyes"  : "") : ((chkCloseEyes) ? "closed eyes"  : "")
    const checkOpenMouthPrompt = (chkRandom) ? (randBool() ? "opened mouth" : "") : ((chkOpenMouth) ? "opened mouth" : "")
    const checkTongueOutPrompt = (chkRandom) ? (randBool() ? "tongue out"   : "") : ((chkTongueOut) ? "tongue out"   : "")
    const prompts = [
      faceLooksPrompt     ,
      personalityPrompt   ,
      eyesShapePrompt     ,
      eyesColorPrompt     ,
      checkCloseEyesPrompt,
      checkOpenMouthPrompt,
      checkTongueOutPrompt,
      additional          ,
    ]
    const summaryPrompt = `${prompts.filter(prompt=>prompt!=="").join(", ")},`;
    setDisplay(summaryPrompt)
    setSummaryPrompt(prev=>({
      ...prev, faceProps: {
        ...prev.faceProps,
        eyesColor: eyesColorPrompt,
        random        : chkRandom      ,
        closeEyes     : chkCloseEyes   ,
        openMouth     : chkOpenMouth   ,
        tongueOut     : chkTongueOut   ,
        additional      : additional     ,
        prompts       : summaryPrompt  ,
      },
    }))
  },[
    chkRandom     ,
    chkCloseEyes  ,
    chkOpenMouth  ,
    chkTongueOut  ,
    eyesColorInput,
    eyesShapePrompt,
    faceLooksPrompt,
    personalityPrompt,
    additional    ,
    setSummaryPrompt,
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