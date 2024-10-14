import { getRandomEmotionData } from "@/app/api/func/getPropertyData"
import { LabelText } from "@/component/atoms/text"
import { DataListContext } from "@/component/context"
import { EditItem, OrderWithCheckBox, MultiAdditional, MultiDisplay, OrderWithPrompt } from "@/component/molecules/promptItem"
import { Box, Divider } from "@mui/material"
import { useContext, useState, useEffect } from "react"

const EmotionSettings   = (props:{orderSelect:number}) => {
  const { orderSelect } = props

  const {dataList, setDataList} = useContext(DataListContext)
  const property =  dataList.settingList[orderSelect].emotionProps
  const genital =  dataList.settingList[orderSelect].genitalProps

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
  const maleGenitalsOrder      = genital.maleGenitals    .order

return (<Box display={"flex"} flexDirection={"column"} gap={"0.25em"}>
    <LabelText bold text={'EmotionSetting Prompt'}/>
    <Divider/>
    <EditItem label={'Basic Tier:' }>
      <OrderWithCheckBox order={"SIMPLE Background: "} checked={tier===3} onChange={()=>handleChangeTierSelect(3)} />
      <OrderWithCheckBox order={"SOLO: "} checked={tier===2} onChange={()=>handleChangeTierSelect(2)} />
      <OrderWithCheckBox order={"CUTE: "} checked={tier===3} onChange={()=>handleChangeTierSelect(3)} />
    </EditItem>
    <EditItem label={'Face Tier:' }>
      <OrderWithCheckBox order={"Random: "} checked={tier===1} onChange={()=>handleChangeTierSelect(1)} />
      <OrderWithCheckBox order={"Winked eye: "} checked={tier===1} onChange={()=>handleChangeTierSelect(1)} />
      <OrderWithCheckBox order={"Tongue out: "} checked={tier===2} onChange={()=>handleChangeTierSelect(2)} />
    </EditItem>
    <EditItem label={'Genital Tier:' }>
      <OrderWithCheckBox order={"Random: "        } checked={tier===1} onChange={()=>handleChangeTierSelect(1)} />
      <OrderWithCheckBox order={"Public hair: "   } checked={tier===1} onChange={()=>handleChangeTierSelect(1)} />
      <OrderWithCheckBox order={"Invert nipples: "} checked={tier===3} onChange={()=>handleChangeTierSelect(3)} />
    </EditItem>
    <Divider/>
    <EditItem label={'Genital Tier:' }>
      <OrderWithCheckBox order={"Random: "} checked={tier===1} onChange={()=>handleChangeTierSelect(1)} />
      <OrderWithCheckBox order={"Sheathed penis: "} checked={tier===2} onChange={()=>handleChangeTierSelect(2)} />
    <OrderWithPrompt order={'Male Genital[MG]: '} value={maleGenitalsOrder}/>
    </EditItem>
    <Divider/>
    <MultiAdditional label={"Emote Prompts"} additions={additionalList} onChange={handleAdditionalChange}/>
    <MultiDisplay prompts={displayList}/>
  </Box>)}
export default EmotionSettings