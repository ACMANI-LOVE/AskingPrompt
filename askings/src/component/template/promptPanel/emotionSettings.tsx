import { LabelText } from "@/component/atoms/text"
import { DataListContext } from "@/component/context"
import { EditItem, OrderWithCheckBox, MultiAdditional, MultiDisplay } from "@/component/molecules/promptItem"
import { eightString } from "@/util"
import { Box, Divider } from "@mui/material"
import { useContext, useState, useEffect } from "react"

const EmotionSettings   = (props:{orderSelect:number}) => {
  const {dataList, setDataList} = useContext(DataListContext)
  const property =  dataList.settingList[props.orderSelect].emotionProps

  const [tier           , setTier           ] = useState(property.emoteTier     )
  const [emotesInputList, setEmotesInputList] = useState(property.emotesList    )
  const [additionalList , setAdditionalList ] = useState(property.additionalList)

  const [displayList    , setDisplayList    ] = useState(property.promptList)

  const handleChangeTierSelect = (value:number) => setTier((value!==tier)?value:0)
  const handleAdditionalChange = (val:string,id:number) => setAdditionalList(prev=>prev.map((prevItem,idx)=>(idx===id)?val:prevItem))

  const nsfwFlag = property.nsfw

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
  useEffect(()=>setDataList(prev=>({ ...prev,
    settingList: prev.settingList.map((prevListItem,idx)=>{
      return (idx === props.orderSelect)
      ? { ...prevListItem, emotionProps: {
            ...prevListItem.emotionProps,
          emoteTier     : tier,
          emotesList    : emotesInputList,
          additionalList: additionalList ,
          promptList    : displayList    ,
        }
      } : prevListItem
    }),
  })),[displayList])

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