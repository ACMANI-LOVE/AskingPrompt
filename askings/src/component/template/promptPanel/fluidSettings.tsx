import { LabelText } from "@/component/atoms/text"
import { SummaryPromptContext } from "@/component/context"
import { EditItem, OrderWithCheckBox, MultiAdditional, MultiDisplay } from "@/component/molecules/promptItem"
import { FluidSettingsProps } from "@/const/cons_promptProps"
import { eightString } from "@/util"
import { Box, Divider } from "@mui/material"
import { useContext, useState, useEffect, useRef } from "react"

const FluidSettings   = (props:{orderSelect:number}) => {
  const {summaryPrompt, setSummaryPrompt} = useContext(SummaryPromptContext)
  const property      = useRef<FluidSettingsProps>(summaryPrompt[props.orderSelect].fluidProps)
  const onUpdateProps = useRef((summaryPrompt:string[])=>{
    setSummaryPrompt(prevList=>prevList.map((prev,idx)=>{
      return (idx === props.orderSelect)
      ? { ...prev, fluidProps: {
            ...prev.fluidProps,
            fluidTier     : tier,
            fluidsList    : fluidsInputList,
            additionalList: additionalList ,
            promptList    : summaryPrompt  ,
          },
      } : prev
    }))
  })

  const [tier           , setTier           ] = useState(property.current.fluidTier     )
  const [fluidsInputList, setFluidsInputList] = useState(property.current.fluidsList    )
  const [additionalList , setAdditionalList ] = useState(property.current.additionalList)

  const [displayList    , setDisplayList    ] = useState(property.current.promptList    )

  const handleChangeTierSelect = (value:number) => setTier((value!==tier)?value:0)
  const handleAdditionalChange = (val:string,id:number) => setAdditionalList(prev=>prev.map((prevItem,idx)=>(idx===id)?val:prevItem))

  const nsfwFlag = property.current.nsfw

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
  useEffect(()=>onUpdateProps.current(displayList),[displayList])

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