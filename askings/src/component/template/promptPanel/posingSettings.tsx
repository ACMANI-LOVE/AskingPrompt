import { LabelText } from "@/component/atoms/text";
import { SummaryPromptContext } from "@/component/context";
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { EditItem, MultiAdditional, MultiDisplay, PosingTable } from "@/component/molecules/promptItem";
import { PosingDetailProps, PosingSettingsProps } from "@/const/cons_promptProps";
import { Box, Divider, IconButton } from "@mui/material";
import { useContext, useState, useEffect } from "react";
import { getRandomPosingData } from "@/const/cons_promptOrder";

const PosingSettings   = () => {
  const {summaryPrompt, setSummaryPrompt} = useContext(SummaryPromptContext)
  const property = summaryPrompt.posingProps as PosingSettingsProps

  const [posingList    , setPosingList    ] = useState(property.posingList     ?? [])
  const [additionalList, setAdditionalList] = useState(property.additionalList ?? [])

  const [displayList     , setDisplayList     ] = useState(property.promptList ?? [])

  const handleAdditionalChange = (val:string,id:number) => setAdditionalList(prev=>prev.map((prevItem,idx)=>(idx===id)?val:prevItem))

  const onClickShuffle = () => setPosingList(prev=>prev.map(()=>getRandomPosingData()))

  useEffect(()=>{
    const posingPrompt = posingList.map((posing)=>Object.values(posing).filter((item)=>item!=="-").join(', '))
    const summaryPrompt = displayList.map((_,idx)=>posingPrompt[idx]+additionalList[idx])
    setDisplayList(summaryPrompt)
    setSummaryPrompt(prev=>({
      ...prev, posingProps: {
        ...prev.posingProps,
        posingList    : posingList    ,
        additionalList: additionalList,
        promptList    : summaryPrompt ,
      },
    }))
  },[
    posingList    ,
    additionalList,
    displayList   ,
    setSummaryPrompt,
  ])
  const posingListOrder = posingList.map((pose:PosingDetailProps)=>Object.values(pose).map((item)=>item))
  return (<Box display={"flex"} flexDirection={"column"} gap={"0.25em"}>
    <LabelText bold text={'PosingSetting Prompt'}/>
    <Divider/>
    <EditItem label={"Reload Pose"}><IconButton onClick={onClickShuffle}><AutorenewIcon color="primary" fontSize="small"/></IconButton></EditItem>
    <Divider/>
    <PosingTable tableList={posingListOrder}/>
    <MultiAdditional additions={additionalList} onChange={handleAdditionalChange}/>
    <MultiDisplay prompts={displayList}/>
  </Box>)}
export default PosingSettings