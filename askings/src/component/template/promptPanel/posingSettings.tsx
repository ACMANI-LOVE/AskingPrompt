import { LabelText } from "@/component/atoms/text";
import { DataListContext } from "@/component/context";
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { EditItem, MultiAdditional, MultiDisplay, PosingTable } from "@/component/molecules/promptItem";
import { PosingDetailProps } from "@/const/cons_promptProps";
import { Box, Divider, IconButton } from "@mui/material";
import { useContext, useState, useEffect } from "react";
import { getRandomPosingData } from "@/const/cons_promptOrder";

const PosingSettings   = (props:{orderSelect:number}) => {
  const {dataList, setDataList} = useContext(DataListContext)
  const property =  dataList.settingList[props.orderSelect].posingProps

  const [posingList    , setPosingList    ] = useState(property.posingList    )
  const [additionalList, setAdditionalList] = useState(property.additionalList)

  const [displayList     , setDisplayList ] = useState(property.promptList    )

  const handleAdditionalChange = (val:string,id:number) => setAdditionalList(prev=>prev.map((prevItem,idx)=>(idx===id)?val:prevItem))

  const onClickShuffle = () => setPosingList(prev=>prev.map(()=>getRandomPosingData()))

  useEffect(()=>{
    const posingPrompt = posingList.map((posing)=>Object.values(posing).filter((item)=>item!=="-").join(', '))
    setDisplayList(prev=>prev.map((_,idx)=>posingPrompt[idx]+additionalList[idx]))
  },[
    posingList    ,
    additionalList,
  ])
  useEffect(()=>setDataList(prev=>({ ...prev,
    settingList: prev.settingList.map((prevListItem,idx)=>{
      return (idx === props.orderSelect)
    ? { ...prevListItem, posingProps: {
          ...prevListItem.posingProps,
          posingList    : posingList    ,
          additionalList: additionalList,
          promptList    : displayList   ,
        }
      } : prevListItem
    }),
  })),[displayList])

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