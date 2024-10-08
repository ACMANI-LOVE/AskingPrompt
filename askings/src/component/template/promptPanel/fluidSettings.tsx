import { LabelText } from "@/component/atoms/text"
import { DataListContext } from "@/component/context"
import { EditItem, OrderWithCheckBox, MultiAdditional, MultiDisplay } from "@/component/molecules/promptItem"
import { eightString } from "@/util"
import { Box, Divider } from "@mui/material"
import { useContext, useState, useEffect } from "react"

const FluidSettings   = (props:{orderSelect:number}) => {
  const {dataList, setDataList} = useContext(DataListContext)
  const property =  dataList.settingList[props.orderSelect].fluidProps

  const [tier           , setTier           ] = useState(property.fluidTier     )
  const [fluidsInputList, setFluidsInputList] = useState(property.fluidsList    )
  const [additionalList , setAdditionalList ] = useState(property.additionalList)

  const [displayList    , setDisplayList    ] = useState(property.promptList    )

  const handleChangeTierSelect = (value:number) => setTier((value!==tier)?value:0)
  const handleAdditionalChange = (val:string,id:number) => setAdditionalList(prev=>prev.map((prevItem,idx)=>(idx===id)?val:prevItem))

  const nsfwFlag = property.nsfw

  // TODO: Refresh EmotionList
  useEffect(()=>setFluidsInputList(prev=>prev.map(()=>(nsfwFlag) ? eightString() : eightString()))
  ,[
    tier,
    nsfwFlag,
  ])
  useEffect(()=>setDisplayList(prev=>prev.map((_,idx)=>fluidsInputList[idx]+additionalList[idx]))
  ,[
    fluidsInputList,
    additionalList ,
  ])
  useEffect(()=>setDataList(prev=>({ ...prev,
    settingList: prev.settingList.map((prevListItem,idx)=>{
      return (idx === props.orderSelect)
      ? { ...prevListItem, fluidProps: {
            ...prevListItem.fluidProps,
          fluidTier     : tier,
          fluidsList    : fluidsInputList,
          additionalList: additionalList ,
          promptList    : displayList    ,
        }
      } : prevListItem
    }),
  })),[displayList])

return (<Box display={"flex"} flexDirection={"column"} gap={"0.25em"}>
    <LabelText bold text={'FluidsSetting Prompt'}/>
    <Divider/>
    <EditItem label={'Fluids Tier:' }>
      <OrderWithCheckBox order={"Tier1: "} checked={tier===1} onChange={()=>handleChangeTierSelect(1)} />
      <OrderWithCheckBox order={"Tier2: "} checked={tier===2} onChange={()=>handleChangeTierSelect(2)} />
      <OrderWithCheckBox order={"Tier3: "} checked={tier===3} onChange={()=>handleChangeTierSelect(3)} />
    </EditItem>
    <Box display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>
    </Box>
    <Divider/>
    <MultiAdditional additions={additionalList} onChange={handleAdditionalChange}/>
    <MultiDisplay prompts={displayList}/>
  </Box>)}
export default FluidSettings