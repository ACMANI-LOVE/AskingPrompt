import { LabelText } from "@/component/atoms/text";
import { DataListContext } from "@/component/context";
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { EditItem, MultiAdditional, MultiDisplay, PosingTable } from "@/component/molecules/promptItem";
import { PosingDetailProps } from "@/const/cons_promptProps";
import { Box, Divider, IconButton } from "@mui/material";
import { useContext, useState, useEffect } from "react";
import { getRandomPosingData } from "@/app/api/func/getPropertyData";

const PosingSettings   = (props:{orderSelect:number}) => {
  const { orderSelect } = props

  const {dataList, setDataList} = useContext(DataListContext)
  const property =  dataList.settingList[orderSelect].posingProps

  const [posingList    , setPosingList    ] = useState(property.posingList    )
  const [additionalList, setAdditionalList] = useState(property.additionalList)

  const [displayList     , setDisplayList ] = useState(property.promptList    )

  const handleAdditionalChange = (val:string,id:number) => setAdditionalList(prev=>prev.map((prevItem,idx)=>(idx===id)?val:prevItem))

  const onClickShuffle = () => setPosingList(prev=>prev.map(()=>getRandomPosingData()))

  useEffect(()=>{
    const posingPrompt = posingList.map((posing)=>Object.values(posing).filter((item)=>item!=="-").join(', '))
    setDisplayList(prev=>prev.map((_,idx)=>posingPrompt[idx]+additionalList[idx]))
    setDataList(prev=>({ ...prev,
      settingList: prev.settingList.map((prevListItem,idx)=>{
        return (idx === orderSelect)
        ? { ...prevListItem, posingProps: {
              ...prevListItem.posingProps,
              posingList    : posingList    ,
              additionalList: additionalList,
            }
          } : prevListItem
        }),
    }))
  },[ setDataList, posingList, additionalList, orderSelect, ])
  useEffect(()=>setDataList(prev=>({ ...prev,
    settingList: prev.settingList.map((prevListItem,idx)=>{
    return (idx === orderSelect)
      ? { ...prevListItem, posingProps: {
          ...prevListItem.posingProps,
          promptList    : displayList   ,
        }
      } : prevListItem
    }),
  })),[ setDataList, displayList, orderSelect, ])

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