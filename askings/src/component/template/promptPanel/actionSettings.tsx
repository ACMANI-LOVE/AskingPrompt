import { LabelText } from "@/component/atoms/text"
import { SummaryPromptContext } from "@/component/context"
import { EditItem, MultiAdditional, MultiDisplay, OrderWithCheckBox } from "@/component/molecules/promptItem"
import { ActionSettingsProps } from "@/const/cons_promptProps"
import { eightString } from "@/util"
import { Box, Divider } from "@mui/material"
import { useContext, useEffect, useState } from "react"

const ActionSettings   = () => {
  const {summaryPrompt, setSummaryPrompt} = useContext(SummaryPromptContext)
  const property = summaryPrompt.actionProps as ActionSettingsProps
  const emptyPrompt = Array.from({length:5},()=>"")

  const [tier            , setTier            ] = useState(property.actionTier      ?? 0   )
  const [actionsInputList, setActionsInputList] = useState(property.actionsList     ?? emptyPrompt  )
  const [additionalList  , setAdditionalList  ] = useState(property.additionalList  ?? emptyPrompt  )

  const [displayList     , setDisplayList     ] = useState(property.promptList      ?? emptyPrompt  )

  const handleChangeTierSelect = (value:number) => setTier((value!==tier)?value:0)
  const handleAdditionalChange = (val:string,id:number) => setAdditionalList(prev=>prev.map((prevItem,idx)=>(idx===id)?val:prevItem))

  useEffect(()=>{
    const actionsPromptList = actionsInputList.map(()=>(property.nsfw) ? eightString() : eightString())
    setActionsInputList(actionsPromptList)
    setSummaryPrompt(prev=>({
      ...prev, actionProps: {
        ...prev.actionProps,
        actionTier  : tier,
        actionsList : actionsPromptList,
      },
    }))
  },[
    tier,
    actionsInputList,
    property.nsfw,
    setSummaryPrompt,
  ])
  useEffect(()=>{
    const summaryPrompt = displayList.map((_,idx)=>actionsInputList[idx]+additionalList[idx])
    setDisplayList(summaryPrompt)
    setSummaryPrompt(prev=>({
      ...prev, actionProps: {
        ...prev.actionProps,
        additionalList: additionalList ,
        promptList    : summaryPrompt  ,
      },
    }))
  },[
    actionsInputList,
    additionalList  ,
    displayList,
    setSummaryPrompt,
  ])
return (<Box display={"flex"} flexDirection={"column"} gap={"0.25em"}>
    <LabelText bold text={'EmotionSetting Prompt'}/>
    <Divider/>
    <EditItem label={'Action Tier:' }>
      <OrderWithCheckBox order={"Tier1: "} checked={tier===1} onChange={()=>handleChangeTierSelect(1)} />
      <OrderWithCheckBox order={"Tier2: "} checked={tier===2} onChange={()=>handleChangeTierSelect(2)} />
      <OrderWithCheckBox order={"Tier3: "} checked={tier===3} onChange={()=>handleChangeTierSelect(3)} />
    </EditItem>
    <Divider/>
    <MultiAdditional additions={additionalList} onChange={handleAdditionalChange}/>
    <MultiDisplay prompts={displayList}/>
  </Box>)}
export default ActionSettings