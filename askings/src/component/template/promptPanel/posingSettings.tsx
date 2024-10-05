import { LabelText } from "@/component/atoms/text";
import { SummaryPromptContext } from "@/component/context";
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { EditItem, MultiAdditional, MultiDisplay, PosingTable } from "@/component/molecules/promptItem";
import { PosingDetailProps, PosingSettingsProps } from "@/const/cons_promptProps";
import { Box, Divider, IconButton } from "@mui/material";
import { useContext, useState, useEffect, useRef } from "react";
import { getRandomPosingData } from "@/const/cons_promptOrder";

const PosingSettings   = () => {
  const {summaryPrompt, setSummaryPrompt} = useContext(SummaryPromptContext)
  const property      = useRef<PosingSettingsProps>(summaryPrompt.posingProps)
  const onUpdateProps = useRef((summaryPrompt:string[])=>{
    setSummaryPrompt(prev=>({
      ...prev, posingProps: {
        ...prev.posingProps,
        posingList    : posingList    ,
        additionalList: additionalList,
        promptList    : summaryPrompt ,
      },
    }))
  })
  const [posingList    , setPosingList    ] = useState(property.current.posingList    )
  const [additionalList, setAdditionalList] = useState(property.current.additionalList)

  const [displayList     , setDisplayList ] = useState(property.current.promptList    )

  const handleAdditionalChange = (val:string,id:number) => setAdditionalList(prev=>prev.map((prevItem,idx)=>(idx===id)?val:prevItem))

  const onClickShuffle = () => setPosingList(prev=>prev.map(()=>getRandomPosingData()))

  useEffect(()=>{
    const posingPrompt = posingList.map((posing)=>Object.values(posing).filter((item)=>item!=="-").join(', '))
    setDisplayList(prev=>prev.map((_,idx)=>posingPrompt[idx]+additionalList[idx]))
  },[
    posingList    ,
    additionalList,
  ])
  useEffect(()=>onUpdateProps.current(displayList),[displayList])

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