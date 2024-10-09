import { getRandomEmotionData } from "@/app/api/func/getPropertyData"
import { LabelText } from "@/component/atoms/text"
import { DataListContext } from "@/component/context"
import { EditItem, OrderWithCheckBox, MultiAdditional, MultiDisplay } from "@/component/molecules/promptItem"
import { Box, Divider } from "@mui/material"
import { useContext, useState, useEffect } from "react"

const EmotionSettings   = (props:{orderSelect:number}) => {
  const { orderSelect } = props

  const {dataList, setDataList} = useContext(DataListContext)
  const property =  dataList.settingList[orderSelect].emotionProps

  const [tier           , setTier           ] = useState(property.emoteTier     )
  const [emotesInputList, setEmotesInputList] = useState(property.emotesList    )
  const [additionalList , setAdditionalList ] = useState(property.additionalList)

  const [displayList    , setDisplayList    ] = useState(property.promptList)

  const handleChangeTierSelect = (value:number) => setTier((value!==tier)?value:0)
  const handleAdditionalChange = (val:string,id:number) => setAdditionalList(prev=>prev.map((prevItem,idx)=>(idx===id)?val:prevItem))

  const nsfwFlag = property.nsfw

  useEffect(()=>{
    setEmotesInputList(prev=>prev.map(()=> `${getRandomEmotionData(tier)}`))
    setDataList(prev=>({ ...prev,
      settingList: prev.settingList.map((prevListItem,idx)=>{
        return (idx === orderSelect)
        ? { ...prevListItem, emotionProps: {
              ...prevListItem.emotionProps,
              emoteTier     : tier,
            }
        } : prevListItem
      }),
    }))
  },[ setDataList, tier, nsfwFlag, orderSelect, ])
  useEffect(()=>{
    setDisplayList(prev=>prev.map((_,idx)=>`${emotesInputList[idx]}, ${additionalList[idx]}`))
    setDataList(prev=>({ ...prev,
      settingList: prev.settingList.map((prevListItem,idx)=>{
        return (idx === orderSelect)
        ? { ...prevListItem, emotionProps: {
              ...prevListItem.emotionProps,
              emotesList    : emotesInputList,
              additionalList: additionalList ,
            }
        } : prevListItem
      }),
    }))
  },[ setDataList, emotesInputList, additionalList, orderSelect, ])
  useEffect(()=>setDataList(prev=>({ ...prev,
    settingList: prev.settingList.map((prevListItem,idx)=>{
      return (idx === orderSelect)
      ? { ...prevListItem, emotionProps: {
            ...prevListItem.emotionProps,
          promptList    : displayList    ,
        }
      } : prevListItem
    }),
  })),[ setDataList, displayList, orderSelect, ])

return (<Box display={"flex"} flexDirection={"column"} gap={"0.25em"}>
    <LabelText bold text={'EmotionSetting Prompt'}/>
    <Divider/>
    <EditItem label={'Emote Tier:' }>
      <OrderWithCheckBox order={"Tier1: "} checked={tier===1} onChange={()=>handleChangeTierSelect(1)} />
      <OrderWithCheckBox order={"Tier2: "} checked={tier===2} onChange={()=>handleChangeTierSelect(2)} />
      <OrderWithCheckBox order={"Tier3: "} checked={tier===3} onChange={()=>handleChangeTierSelect(3)} />
    </EditItem>
    <Divider/>
    <MultiAdditional label={"Emote Prompts"} additions={additionalList} onChange={handleAdditionalChange}/>
    <MultiDisplay prompts={displayList}/>
  </Box>)}
export default EmotionSettings