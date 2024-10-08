import { LabelText } from "@/component/atoms/text"
import { DataListContext } from "@/component/context"
import { ViewItem, EditItem, DisplayItem, OrderWithCheckBox, OrderWithInput, OrderWithPrompt, RowDirection, AdditionalItem } from "@/component/molecules/promptItem"
import { randBool } from "@/util"
import { Box, Divider } from "@mui/material"
import { useState, BaseSyntheticEvent, useEffect, useContext } from "react"

const FaceSettings    = (props:{orderSelect:number}) => {
  const {dataList, setDataList} = useContext(DataListContext)
  const property =  dataList.settingList[props.orderSelect].faceProps

  const eyesColorOrder   = property.eyesColor
  const faceLooksOrder   = property.faceLooks       .order
  const personalityOrder = property.personality.order
  const eyesShapeOrder   = property.eyesShape  .order

  const [chkRandom     , setChkRandom     ] = useState(property.random    )
  const [chkCloseEyes  , setChkCloseEyes  ] = useState(property.closeEyes )
  const [chkOpenMouth  , setChkOpenMouth  ] = useState(property.openMouth )
  const [chkTongueOut  , setChkTongueOut  ] = useState(property.tongueOut )
  const [eyesColorInput, setEyesColorInput] = useState(property.eyesColorPrompt )
  const [additional    , setAdditional    ] = useState(property.additional)

  const [display, setDisplay] = useState(property.prompts)

  const handleChangeRandomCheck    = () => setChkRandom   (!chkRandom   )
  const handleChangeCloseEyesCheck = () => setChkCloseEyes(!chkCloseEyes)
  const handleChangeOpenMouthCheck = () => setChkOpenMouth(!chkOpenMouth)
  const handleChangeTongueOutCheck = () => setChkTongueOut(!chkTongueOut)
  const handleEyesColorInputChange = (e:BaseSyntheticEvent) => setEyesColorInput(e.target.value)
  const handleAdditionalChange     = (e:BaseSyntheticEvent) => setAdditional    (e.target.value)

  const faceLooksPrompt   = property.faceLooks  .prompt
  const personalityPrompt = property.personality.prompt
  const eyesShapePrompt   = property.eyesShape  .prompt

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
    const summaryPrompt = `${prompts.filter(prompt=>prompt!=="").join(", ")},`;
    setDisplay(summaryPrompt)
    setDataList(prev=>({ ...prev,
      settingList: prev.settingList.map((prevListItem,idx)=>{
        return (idx === props.orderSelect)
        ? {
          ...prevListItem, faceProps: {
            ...prevListItem.faceProps,
            eyesColorPrompt     : eyesColorInput,
            random        : chkRandom      ,
            closeEyes     : chkCloseEyes   ,
            openMouth     : chkOpenMouth   ,
            tongueOut     : chkTongueOut   ,
            additional    : additional     ,
            prompts       : summaryPrompt  ,
          }
        } : prevListItem
      })
    }))
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