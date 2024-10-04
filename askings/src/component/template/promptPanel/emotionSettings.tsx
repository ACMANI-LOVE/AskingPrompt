import { LabelText } from "@/component/atoms/text"
import { SummaryPromptContext } from "@/component/context"
import { EditItem, OrderWithCheckBox, MultiAdditional, MultiDisplay } from "@/component/molecules/promptItem"
import { EmotionSettingsProps } from "@/const/cons_promptProps"
import { eightString } from "@/util"
import { Box, Divider } from "@mui/material"
import { useContext, useState, useEffect } from "react"

const EmotionSettings   = () => {
  const {summaryPrompt, setSummaryPrompt} = useContext(SummaryPromptContext)
  const property = summaryPrompt.emotionProps as EmotionSettingsProps
  const emptyPrompt = Array.from({length:5},()=>"")

  const [tier           , setTier           ] = useState(property.emoteTier      ?? 0   )
  const [emotesInputList, setEmotesInputList] = useState(property.emotesList     ?? emptyPrompt  )
  const [additionalList , setAdditionalList ] = useState(property.additionalList ?? emptyPrompt  )

  const [displayList    , setDisplayList    ] = useState(property.promptList     ?? emptyPrompt  )

  const handleChangeTierSelect = (value:number) => setTier((value!==tier)?value:0)
  const handleAdditionalChange = (val:string,id:number) => setAdditionalList(prev=>prev.map((prevItem,idx)=>(idx===id)?val:prevItem))

  useEffect(()=>{
    const emotesPromptList = emotesInputList.map(()=>(property.nsfw) ? eightString() : eightString())
    setEmotesInputList(emotesPromptList)
    setSummaryPrompt(prev=>({
      ...prev, emotionProps: {
        ...prev.emotionProps,
        emoteTier  : tier,
        emotesList : emotesPromptList,
      },
    }))
  },[
    tier,
    emotesInputList,
    property.nsfw,
    setSummaryPrompt,
  ])
  useEffect(()=>{
    const summaryPrompt = displayList.map((_,idx)=>emotesInputList[idx]+additionalList[idx])
    setDisplayList(summaryPrompt)
    setSummaryPrompt(prev=>({
      ...prev, emotionProps: {
        ...prev.emotionProps,
        additionalList: additionalList ,
        promptList    : summaryPrompt  ,
      },
    }))
  },[
    emotesInputList,
    additionalList ,
    displayList,
    setSummaryPrompt,
  ])
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