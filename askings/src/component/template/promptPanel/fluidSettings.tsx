import { LabelText } from "@/component/atoms/text"
import { SummaryPromptContext } from "@/component/context"
import { EditItem, OrderWithCheckBox, MultiAdditional, MultiDisplay } from "@/component/molecules/promptItem"
import { FluidSettingsProps } from "@/const/cons_promptProps"
import { eightString } from "@/util"
import { Box, Divider } from "@mui/material"
import { useContext, useState, useEffect } from "react"

const FluidSettings   = () => {
  const {summaryPrompt, setSummaryPrompt} = useContext(SummaryPromptContext)
  const property = summaryPrompt.fluidProps as FluidSettingsProps
  const emptyPrompt = Array.from({length:5},()=>"")

  const [tier           , setTier           ] = useState(property.fluidTier      ?? 0   )
  const [fluidsInputList, setFluidsInputList] = useState(property.fluidsList     ?? emptyPrompt  )
  const [additionalList , setAdditionalList ] = useState(property.additionalList ?? emptyPrompt  )

  const [displayList    , setDisplayList    ] = useState(property.promptList     ?? emptyPrompt  )

  const handleChangeTierSelect = (value:number) => setTier((value!==tier)?value:0)
  const handleAdditionalChange = (val:string,id:number) => setAdditionalList(prev=>prev.map((prevItem,idx)=>(idx===id)?val:prevItem))

  useEffect(()=>{
    const fluidsPromptList = fluidsInputList.map(()=>(property.nsfw) ? eightString() : eightString())
    setFluidsInputList(fluidsPromptList)
    setSummaryPrompt(prev=>({
      ...prev, fluidProps: {
        ...prev.fluidProps,
        fluidTier  : tier,
        fluidsList : fluidsPromptList,
      },
    }))
  },[
    tier,
    fluidsInputList,
    property.nsfw,
    setSummaryPrompt,
  ])
  useEffect(()=>{
    const summaryPrompt = displayList.map((_,idx)=>fluidsInputList[idx]+additionalList[idx])
    setDisplayList(summaryPrompt)
    setSummaryPrompt(prev=>({
      ...prev, fluidProps: {
        ...prev.fluidProps,
        additionalList: additionalList ,
        promptList    : summaryPrompt  ,
      },
    }))
  },[
    fluidsInputList,
    additionalList ,
    displayList,
    setSummaryPrompt,
  ])
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