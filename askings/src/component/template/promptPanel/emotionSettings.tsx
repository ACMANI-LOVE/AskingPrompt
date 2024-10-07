import { LabelText } from "@/component/atoms/text"
import { SummaryPromptContext } from "@/component/context"
import { EditItem, OrderWithCheckBox, MultiAdditional, MultiDisplay } from "@/component/molecules/promptItem"
import { EmotionSettingsProps } from "@/const/cons_promptProps"
import { eightString } from "@/util"
import { Box, Divider } from "@mui/material"
import { useContext, useState, useEffect, useRef } from "react"

const EmotionSettings   = (props:{orderSelect:number}) => {
  const {summaryPrompt, setSummaryPrompt} = useContext(SummaryPromptContext)
  const property      = useRef<EmotionSettingsProps>(summaryPrompt[props.orderSelect].emotionProps)
  const onUpdateProps = useRef((summaryPrompt:string[])=>{
    setSummaryPrompt(prevList=>prevList.map((prev,idx)=>{
      return (idx === props.orderSelect)
      ? { ...prev, emotionProps: {
            ...prev.emotionProps,
            emoteTier     : tier,
            emotesList    : emotesInputList,
            additionalList: additionalList ,
            promptList    : summaryPrompt  ,
          },
        } : prev
      }))
    })

  const [tier           , setTier           ] = useState(property.current.emoteTier     )
  const [emotesInputList, setEmotesInputList] = useState(property.current.emotesList    )
  const [additionalList , setAdditionalList ] = useState(property.current.additionalList)

  const [displayList    , setDisplayList    ] = useState(property.current.promptList)

  const handleChangeTierSelect = (value:number) => setTier((value!==tier)?value:0)
  const handleAdditionalChange = (val:string,id:number) => setAdditionalList(prev=>prev.map((prevItem,idx)=>(idx===id)?val:prevItem))

  const nsfwFlag = property.current.nsfw

  // TODO: Refresh EmotionList
  useEffect(()=>setEmotesInputList(prev=>prev.map(()=>(nsfwFlag) ? eightString() : eightString()))
  ,[
    tier,
    nsfwFlag,
  ])
  useEffect(()=>setDisplayList(prev=>prev.map((_,idx)=>emotesInputList[idx]+additionalList[idx]))
  ,[
    emotesInputList,
    additionalList ,
  ])
  useEffect(()=>onUpdateProps.current(displayList),[displayList])

return (<Box display={"flex"} flexDirection={"column"} gap={"0.25em"}>
    <LabelText bold text={'EmotionSetting Prompt'}/>
    <Divider/>
    <EditItem label={'Emote Tier:' }>
      <OrderWithCheckBox order={"Tier1: "} checked={tier===1} onChange={()=>handleChangeTierSelect(1)} />
      <OrderWithCheckBox order={"Tier2: "} checked={tier===2} onChange={()=>handleChangeTierSelect(2)} />
      <OrderWithCheckBox order={"Tier3: "} checked={tier===3} onChange={()=>handleChangeTierSelect(3)} />
    </EditItem>
    <Divider/>
    <MultiAdditional additions={additionalList} onChange={handleAdditionalChange}/>
    <MultiDisplay prompts={displayList}/>
  </Box>)}
export default EmotionSettings