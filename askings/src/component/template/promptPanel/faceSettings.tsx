import { LabelText } from "@/component/atoms/text"
import { DataListContext } from "@/component/context"
import { ViewItem, EditItem, DisplayItem, OrderWithInput, OrderWithPrompt, AdditionalItem } from "@/component/molecules/promptItem"
import { Box, Divider } from "@mui/material"
import { useState, BaseSyntheticEvent, useEffect, useContext } from "react"

const FaceSettings    = (props:{orderSelect:number}) => {
  const { orderSelect } = props

  const {dataList, setDataList} = useContext(DataListContext)
  const face =  dataList.settingList[orderSelect].faceProps
  const hair =  dataList.settingList[orderSelect].hairProps

  const hairStyleOrder  = hair.hairStyle
  const bangsStyleOrder = hair.bangsStyle
  const hairSizeOrder   = hair.hairSize .order
  const bangsSizeOrder  = hair.bangsSize.order
  const hairSizePrompt  = hair.hairSize .prompt
  const bangsSizePrompt = hair.bangsSize.prompt

  const faceLooksOrder   = face.faceLooks  .order
  const personalityOrder = face.personality.order
  const eyesShapeOrder   = face.eyesShape  .order
  const faceLooksPrompt   = face.faceLooks  .prompt
  const personalityPrompt = face.personality.prompt
  const eyesShapePrompt   = face.eyesShape  .prompt

  const [hairStyleInput , setHairStyleInput ] = useState(hair.hairStylePrompt )
  const [bangsStyleInput, setBangsStyleInput] = useState(hair.bangsStylePrompt)
  const [additional    , setAdditional    ] = useState(face.additional)

  const [display, setDisplay] = useState(face.prompts)

  const handleHairStyleInputChange  = (e:BaseSyntheticEvent) => setHairStyleInput (e.target.value)
  const handleBangsStyleInputChange = (e:BaseSyntheticEvent) => setBangsStyleInput(e.target.value)

  const handleAdditionalChange     = (e:BaseSyntheticEvent) => setAdditional    (e.target.value)

  useEffect(()=>{
    const prompts = [
      faceLooksPrompt     ,
      personalityPrompt   ,
      eyesShapePrompt     ,
      additional          ,
    ]
    const summaryPrompt = `${prompts.filter(prompt=>prompt!=="").join(", ")},`;
    setDisplay(summaryPrompt)
    setDataList(prev=>({ ...prev,
      settingList: prev.settingList.map((prevListItem,idx)=>{
        return (idx === orderSelect)
        ? {
          ...prevListItem, faceProps: {
            ...prevListItem.faceProps,
            // eyesColorPrompt     : eyesColorInput,
            // random        : chkRandom      ,
            // closeEyes     : chkCloseEyes   ,
            // openMouth     : chkOpenMouth   ,
            // tongueOut     : chkTongueOut   ,
            additional    : additional     ,
            prompts       : summaryPrompt  ,
          }
        } : prevListItem
      })
    }))
  },[
    setDataList   ,
    orderSelect   ,
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
    <ViewItem label={'Eyes shape:' }><OrderWithPrompt order={eyesShapeOrder  } value={eyesShapePrompt  }/></ViewItem>
    {/* <Divider/>
    <EditItem label={'Eyes color:' }>
      <ColorOrder colorText={eyesColorOrder} />
      <OrderWithInput value={eyesColorInput   } onChange={handleEyesColorInputChange}/>
    </EditItem>
    <Divider/>
    <EditItem  label={'Optional:'}/>
    <RowDirection noIdent>
      <OrderWithCheckBox order={"Random: "      } checked={chkRandom   } onChange={handleChangeRandomCheck   } disabled={false}    />
      <OrderWithCheckBox order={"Closed Eyes: " } checked={chkCloseEyes} onChange={handleChangeCloseEyesCheck} disabled={chkRandom}/>
      <OrderWithCheckBox order={"Opened Mouth: "} checked={chkOpenMouth} onChange={handleChangeOpenMouthCheck} disabled={chkRandom}/>
      <OrderWithCheckBox order={"Tongue Out: "  } checked={chkTongueOut} onChange={handleChangeTongueOutCheck} disabled={chkRandom}/>
    </RowDirection> */}
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

export default FaceSettings