import { getRandomActionData, getRandomPosingData } from "@/app/api/func/getPropertyData"
import { LabelText } from "@/component/atoms/text"
import { DataListContext } from "@/component/context"
import { DataTable, EditItem, MultiAdditional, MultiDisplay, OrderWithCheckBox, PosingTable, RowDirection, ViewItem } from "@/component/molecules/promptItem"
import { PosingDetailProps } from "@/const/cons_promptProps"
import { Box, Divider } from "@mui/material"
import { useContext, useEffect, useState } from "react"

const ActionSettings   = (props:{orderSelect:number}) => {
  const { orderSelect } = props

  const {dataList, setDataList} = useContext(DataListContext)
  const property =  dataList.settingList[orderSelect].actionProps

  const [tier            , setTier            ] = useState(property.actionTier    )
  const [actionsInputList, setActionsInputList] = useState(property.actionsList   )
  const [additionalList  , setAdditionalList  ] = useState(property.additionalList)
  const [posingList      , setPosingList      ] = useState(Array.from({length:5},()=>getRandomPosingData()))

  const [displayList     , setDisplayList     ] = useState(property.promptList    )

  const handleChangeTierSelect = (value:number) => setTier((value!==tier)?value:0)
  const handleAdditionalChange = (val:string,id:number) => setAdditionalList(prev=>prev.map((prevItem,idx)=>(idx===id)?val:prevItem))

  const nsfwFlag = property.nsfw
  const posingListOrder = posingList.map((pose:PosingDetailProps)=>Object.values(pose).map((item)=>item))


  useEffect(()=>{
    setPosingList(prev=>prev.map(()=>getRandomPosingData()))
    setActionsInputList(prev=>prev.map(()=> `${getRandomActionData(tier)}`))
    setDataList(prev=>({ ...prev,
      settingList: prev.settingList.map((prevListItem,idx)=>{
        return (idx === orderSelect)
        ? { ...prevListItem, actionProps: {
              ...prevListItem.actionProps,
              actionTier    : tier,
            }
        } : prevListItem
      }),
    }))
  },[ setDataList, tier, nsfwFlag, orderSelect, ])
  useEffect(()=>{
    setDisplayList(prev=>prev.map((_,idx)=>`${actionsInputList[idx]}, ${additionalList[idx]}`))
    setDataList(prev=>({ ...prev,
      settingList: prev.settingList.map((prevListItem,idx)=>{
        return (idx === orderSelect)
        ? { ...prevListItem, actionProps: {
              ...prevListItem.actionProps,
              actionsList   : actionsInputList,
              additionalList: additionalList ,
            }
        } : prevListItem
      }),
    }))
  },[ setDataList, actionsInputList, additionalList, orderSelect, ])
  useEffect(()=>setDataList(prev=>({ ...prev,
    settingList: prev.settingList.map((prevListItem,idx)=>{
      return (idx === orderSelect)
      ? { ...prevListItem, actionProps: {
            ...prevListItem.actionProps,
            promptList    : displayList  ,
          }
      } : prevListItem
    }),
  })),[ setDataList, displayList, orderSelect, ])

return (<Box display={"flex"} flexDirection={"column"} gap={"0.25em"}>
    <LabelText bold text={'EmotionSetting Prompt'}/>
    <Divider/>
    <EditItem label={'Prompts Tier:' }>
      <OrderWithCheckBox order={"SFW: "  } checked={tier===1} onChange={()=>handleChangeTierSelect(1)} />
      <OrderWithCheckBox order={"NUDE: " } checked={tier===2} onChange={()=>handleChangeTierSelect(2)} />
      <OrderWithCheckBox order={"SEXY: " } checked={tier===3} onChange={()=>handleChangeTierSelect(3)} />
      <OrderWithCheckBox order={"NASTY: "} checked={tier===3} onChange={()=>handleChangeTierSelect(3)} />
    </EditItem>
    <Divider/>
    <ViewItem label={'Posing Tier:' }><PosingTable tableList={posingListOrder}/></ViewItem>
    <RowDirection>
    <ViewItem label={'Action Tier:' }><DataTable tableList={[]} label={"Action:" }/></ViewItem>
    <ViewItem label={'Emotion Tier:'}><DataTable tableList={[]} label={"Emotion:"}/></ViewItem>
    </RowDirection>
    <Divider/>
    <MultiAdditional additions={additionalList} onChange={handleAdditionalChange}/>
    <MultiDisplay prompts={displayList}/>
  </Box>)}
export default ActionSettings