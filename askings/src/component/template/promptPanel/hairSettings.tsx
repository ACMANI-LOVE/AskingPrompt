import { LabelText } from "@/component/atoms/text"
import { DataListContext } from "@/component/context"
import { ViewItem, EditItem, DisplayItem, OrderWithInput, AdditionalItem, OrderWithPrompt, ColorOrder } from "@/component/molecules/promptItem"
import { Box, Divider } from "@mui/material"
import { useState, BaseSyntheticEvent, useEffect, useContext, useRef } from "react"

const HairSettings    = (props:{orderSelect:number}) => {
  const orderSelect = useRef(props.orderSelect)
  useEffect(()=>{orderSelect.current = props.orderSelect},[props.orderSelect])
  const {dataList, setDataList} = useContext(DataListContext)
  const property =  dataList.settingList[orderSelect.current].hairProps

  const hairColorOrder  = property.hairColor
  const hairStyleOrder  = property.hairStyle
  const bangsStyleOrder = property.bangsStyle
  const hairSizeOrder   = property.hairSize .order
  const bangsSizeOrder  = property.bangsSize.order

  const [hairColorInput , setHairColorInput ] = useState(property.hairColorPrompt )
  const [hairStyleInput , setHairStyleInput ] = useState(property.hairStylePrompt )
  const [bangsStyleInput, setBangsStyleInput] = useState(property.bangsStylePrompt)
  const [additional     , setAdditional     ] = useState(property.additional)

  const [display, setDisplay] = useState(property.prompts)

  const handleHairColorInputChange  = (e:BaseSyntheticEvent) => setHairColorInput (e.target.value)
  const handleHairStyleInputChange  = (e:BaseSyntheticEvent) => setHairStyleInput (e.target.value)
  const handleBangsStyleInputChange = (e:BaseSyntheticEvent) => setBangsStyleInput(e.target.value)
  const handleAdditionalChange      = (e:BaseSyntheticEvent) => setAdditional     (e.target.value)

  const hairSizePrompt  = property.hairSize .prompt
  const bangsSizePrompt = property.bangsSize.prompt

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
    setDataList(prev=>({ ...prev,
      settingList: prev.settingList.map((prevListItem,idx)=>{
        return (idx === orderSelect.current)
        ? {
          ...prevListItem, hairProps: {
            ...prevListItem.hairProps,
            hairColorPrompt  : hairColorInput ,
            hairStylePrompt  : hairStyleInput ,
            bangsStylePrompt : bangsStyleInput,
            additional      : additional     ,
            prompts         : summaryPrompt  ,
          }
        } : prevListItem
      })
    }))
  },[
    setDataList    ,
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
    <EditItem label={'Hair color:' }>
      <ColorOrder colorText={hairColorOrder}/>
      <OrderWithInput value={hairColorInput } onChange={handleHairColorInputChange }/>
    </EditItem>
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