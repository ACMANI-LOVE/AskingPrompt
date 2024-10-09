import { ItemText, LabelText } from "@/component/atoms/text"
import { PromptField } from "@/component/atoms/textField"
import { DataListContext } from "@/component/context"
import { AdditionalItem, BlocItem, DisplayItem, EditItem, Order, OrderWithCheckBox, ViewItem } from "@/component/molecules/promptItem"
import { Box, Divider } from "@mui/material"
import { BaseSyntheticEvent, useContext, useEffect, useState } from "react"

const BaseSettings    = (props:{orderSelect:number}) => {
  const { orderSelect } = props

  const {dataList, setDataList} = useContext(DataListContext)
  const property =  dataList.settingList[orderSelect].baseProps

  const storyOrder     = property.story
  const modelOrder     = property.model
  const characterOrder = property.character
  const speciesOrder   = property.species

  const [baseInput , setBaseInput ] = useState(property.base      )
  const [chkNsfw   , setChkNsfw   ] = useState(property.nsfw      )
  const [chkSolo   , setChkSolo   ] = useState(property.solo      )
  const [chkCute   , setChkCute   ] = useState(property.cute      )
  const [additional, setAdditional] = useState(property.additional)

  const [display, setDisplay] = useState(property.prompts)

  const handleChangeNsfwCheck  = ()=>setChkNsfw(!chkNsfw)
  const handleChangeSoloCheck  = ()=>setChkSolo(!chkSolo)
  const handleChangeCuteCheck  = ()=>setChkCute(!chkCute)
  const handleBasePromptChange = (e:BaseSyntheticEvent) => setBaseInput (e.target.value)
  const handleAdditionalChange = (e:BaseSyntheticEvent) => setAdditional(e.target.value)

  useEffect(()=>{
    const prompts = [
      (chkNsfw) ? "NSFW" : "Safe content, sfw",
      (chkSolo) ? "SOLO" : "",
      (chkCute) ? "CUTE" : "",
      baseInput,
      additional,
    ]
    const summaryPrompt = `${prompts.filter(prompt=>prompt!=="").join(", ")},`;
    setDisplay(summaryPrompt)
    setDataList(prev=>({ ...prev,
      settingList: prev.settingList.map((prevListItem,idx)=>{
        return (idx === orderSelect)
        ? { ...prevListItem,
            baseProps: { ...prevListItem.baseProps,
              base      : baseInput    ,
              nsfw      : chkNsfw      ,
              solo      : chkSolo      ,
              cute      : chkCute      ,
              additional: additional   ,
              prompts   : summaryPrompt,
            },
            genitalProps: { ...prevListItem.genitalProps, nsfw: chkNsfw, },
            fluidProps  : { ...prevListItem.fluidProps  , nsfw: chkNsfw, },
            emotionProps: { ...prevListItem.emotionProps, nsfw: chkNsfw, },
            actionProps : { ...prevListItem.actionProps , nsfw: chkNsfw, },
          }
          : prevListItem
      })
    }))
  },[
    setDataList,
    orderSelect,
    baseInput  ,
    chkNsfw    ,
    chkSolo    ,
    chkCute    ,
    additional ,
  ])

  return (<Box display={"flex"} flexDirection={"column"} gap={"0.25em"}>
    <LabelText bold text={'BaseSetting Prompt'}/>
    <Divider/>
    <ViewItem label={'Story idea:'}/>
    <BlocItem><ItemText text={storyOrder}/></BlocItem>
    <Divider/>
    <ViewItem label={"Model Theme:"    }><Order order={modelOrder    }/></ViewItem>
    <ViewItem label={"Character Order:"}><Order order={characterOrder}/></ViewItem>
    <ViewItem label={"Species Detail:" }><Order order={speciesOrder  }/></ViewItem>
    <EditItem label={'Base Prompt:'}/>
    <BlocItem><PromptField value={baseInput} onChange={handleBasePromptChange}/></BlocItem>
    <Divider/>
    <EditItem  label={'Optional:'}>
      <OrderWithCheckBox order={"NSFW: "} checked={chkNsfw} onChange={handleChangeNsfwCheck}/>
      <OrderWithCheckBox order={"SOLO: "} checked={chkSolo} onChange={handleChangeSoloCheck}/>
      <OrderWithCheckBox order={"CUTE: "} checked={chkCute} onChange={handleChangeCuteCheck}/>
    </EditItem>
    <Divider/>
    <AdditionalItem additional={additional} onChange={handleAdditionalChange}/>
    <DisplayItem text={display}/>
  </Box>)
}

export default BaseSettings