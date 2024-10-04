import { LabelText, ItemText } from "@/component/atoms/text"
import { PromptField } from "@/component/atoms/textField"
import { SummaryPromptContext } from "@/component/context"
import { ViewItem, EditItem, DisplayItem, Order, OrderWithCheckBox, BlocItem, AdditionalItem } from "@/component/molecules/promptItem"
import { getModelsData } from "@/const/cons_promptOrder"
import { BaseSettingsProps } from "@/const/cons_promptProps"
import { Box, Divider } from "@mui/material"
import { useState, BaseSyntheticEvent, useEffect, useContext } from "react"

const BaseSettings    = () => {
  const {summaryPrompt, setSummaryPrompt} = useContext(SummaryPromptContext)
  const property = summaryPrompt.baseProps as BaseSettingsProps

  const storyOrder     = property.story
  const modelOrder     = getModelsData({enums:property.model}).order
  const characterOrder = property.character
  const speciesOrder   = property.species

  const [baseInput , setBaseInput ] = useState(property.base       ?? ""  )
  const [chkNsfw   , setChkNsfw   ] = useState(property.nsfw       ?? true)
  const [chkSolo   , setChkSolo   ] = useState(property.solo       ?? true)
  const [chkCute   , setChkCute   ] = useState(property.cute       ?? true)
  const [additional, setAdditional] = useState(property.additional ?? ""  )

  const [display, setDisplay] = useState(property.prompts ?? "")

  const handleChangeNsfwCheck  = ()=>setChkNsfw(!chkNsfw)
  const handleChangeSoloCheck  = ()=>setChkSolo(!chkSolo)
  const handleChangeCuteCheck  = ()=>setChkCute(!chkCute)
  const handleBasePromptChange = (e:BaseSyntheticEvent) => setBaseInput(e.target.value)
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
    setSummaryPrompt(prev=>({
      ...prev, baseProps: {
        ...prev.baseProps,
        base     : baseInput    ,
        nsfw      : chkNsfw      ,
        solo      : chkSolo      ,
        cute      : chkCute      ,
        additional  : additional   ,
        prompts   : summaryPrompt,
      },
    }))
  },[
    baseInput ,
    chkNsfw   ,
    chkSolo   ,
    chkCute   ,
    additional,
    setSummaryPrompt,
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