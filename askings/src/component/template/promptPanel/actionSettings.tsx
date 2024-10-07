import { LabelText } from "@/component/atoms/text"
import { SummaryPromptContext } from "@/component/context"
import { EditItem, MultiAdditional, MultiDisplay, OrderWithCheckBox } from "@/component/molecules/promptItem"
import { ActionSettingsProps } from "@/const/cons_promptProps"
import { eightString } from "@/util"
import { Box, Divider } from "@mui/material"
import { useContext, useEffect, useRef, useState } from "react"

const ActionSettings   = (props:{orderSelect:number}) => {
  const {summaryPrompt, setSummaryPrompt} = useContext(SummaryPromptContext)
  const property      = useRef<ActionSettingsProps>(summaryPrompt[props.orderSelect].actionProps)
  const onUpdateProps = useRef((summaryPrompt:string[])=>{
    setSummaryPrompt(prevList=>prevList.map((prev,idx)=>{
      return (idx === props.orderSelect)
      ? { ...prev, actionProps: {
            ...prev.actionProps,
            actionTier    : tier,
            actionsList   : actionsInputList,
            additionalList: additionalList ,
            promptList    : summaryPrompt  ,
          },
      } : prev
    }))
  })
  const [tier            , setTier            ] = useState(property.current.actionTier    )
  const [actionsInputList, setActionsInputList] = useState(property.current.actionsList   )
  const [additionalList  , setAdditionalList  ] = useState(property.current.additionalList)

  const [displayList     , setDisplayList     ] = useState(property.current.promptList    )

  const handleChangeTierSelect = (value:number) => setTier((value!==tier)?value:0)
  const handleAdditionalChange = (val:string,id:number) => setAdditionalList(prev=>prev.map((prevItem,idx)=>(idx===id)?val:prevItem))

  const nsfwFlag = property.current.nsfw

  // TODO: Refresh EmotionList
  useEffect(()=>setActionsInputList(prev=>prev.map(()=>(nsfwFlag) ? eightString() : eightString()))
  ,[
    tier,
    nsfwFlag,
  ])
  useEffect(()=>setDisplayList(prev=>prev.map((_,idx)=>actionsInputList[idx]+additionalList[idx]))
  ,[
    actionsInputList,
    additionalList ,
  ])
  useEffect(()=>onUpdateProps.current(displayList),[displayList])

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