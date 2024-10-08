import { getRandomActionData } from "@/app/api/func/getPropertyData"
import { LabelText } from "@/component/atoms/text"
import { DataListContext } from "@/component/context"
import { EditItem, MultiAdditional, MultiDisplay, OrderWithCheckBox } from "@/component/molecules/promptItem"
import { Box, Divider } from "@mui/material"
import { useContext, useEffect, useRef, useState } from "react"

const ActionSettings   = (props:{orderSelect:number}) => {
  const orderSelect = useRef(props.orderSelect)
  useEffect(()=>{orderSelect.current = props.orderSelect},[props.orderSelect])
  const {dataList, setDataList} = useContext(DataListContext)
  const property =  dataList.settingList[orderSelect.current].actionProps

  const [tier            , setTier            ] = useState(property.actionTier    )
  const [actionsInputList, setActionsInputList] = useState(property.actionsList   )
  const [additionalList  , setAdditionalList  ] = useState(property.additionalList)

  const [displayList     , setDisplayList     ] = useState(property.promptList    )

  const handleChangeTierSelect = (value:number) => setTier((value!==tier)?value:0)
  const handleAdditionalChange = (val:string,id:number) => setAdditionalList(prev=>prev.map((prevItem,idx)=>(idx===id)?val:prevItem))

  const nsfwFlag = property.nsfw

  // TODO: Refresh EmotionList
  useEffect(()=>{
    setActionsInputList(prev=>prev.map(()=> `${getRandomActionData(tier)}`))
    setDataList(prev=>({ ...prev,
      settingList: prev.settingList.map((prevListItem,idx)=>{
        return (idx === orderSelect.current)
        ? { ...prevListItem, actionProps: {
              ...prevListItem.actionProps,
              actionTier    : tier,
            }
        } : prevListItem
      }),
    }))
  },[ setDataList, tier, nsfwFlag, ])
  useEffect(()=>{
    setDisplayList(prev=>prev.map((_,idx)=>`${actionsInputList[idx]}, ${additionalList[idx]}`))
    setDataList(prev=>({ ...prev,
      settingList: prev.settingList.map((prevListItem,idx)=>{
        return (idx === orderSelect.current)
        ? { ...prevListItem, actionProps: {
              ...prevListItem.actionProps,
              actionsList   : actionsInputList,
              additionalList: additionalList ,
            }
        } : prevListItem
      }),
    }))
  },[ setDataList, actionsInputList, additionalList, ])
  useEffect(()=>setDataList(prev=>({ ...prev,
    settingList: prev.settingList.map((prevListItem,idx)=>{
      return (idx === orderSelect.current)
      ? { ...prevListItem, actionProps: {
            ...prevListItem.actionProps,
            promptList    : displayList  ,
          }
      } : prevListItem
    }),
  })),[ setDataList, displayList ])

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