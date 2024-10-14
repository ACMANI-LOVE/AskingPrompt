import { ItemText, LabelText } from "@/component/atoms/text"
import { PromptField } from "@/component/atoms/textField"
import { DataListContext } from "@/component/context"
import { BlocItem, DisplayItem, EditItem, Order, ViewItem } from "@/component/molecules/promptItem"
import { Box, Divider } from "@mui/material"
import { BaseSyntheticEvent, useContext, useEffect, useState } from "react"

const BaseSettings    = (props:{orderSelect:number}) => {
  const { orderSelect } = props

  const {dataList, setDataList} = useContext(DataListContext)
  const base  = dataList.settingList[orderSelect].baseProps
  const scene = dataList.settingList[orderSelect].sceneProps

  const storyOrder     = base.story
  const modelOrder     = base.model
  const characterOrder = base.character
  const speciesOrder   = base.species

  const periodOrder   = scene.period .order
  const weatherOrder  = scene.weather.order
  const timesOrder    = scene.times  .order
  const locationOrder = scene.location

  const [baseInput  , setBaseInput  ] = useState(base.base)
  const [locateInput, setLocateInput] = useState(base.base)

  const [display, setDisplay] = useState(base.prompts)

  const handleBaseInputChange   = (e:BaseSyntheticEvent) => setBaseInput   (e.target.value)
  const handleLocateInputChange = (e:BaseSyntheticEvent) => setLocateInput (e.target.value)

  useEffect(()=>{
    const prompts = [
      baseInput,
      locateInput,
    ]
    const summaryPrompt = `${prompts.filter(prompt=>prompt!=="").join(", ")},`;
    setDisplay(summaryPrompt)
    setDataList(prev=>({ ...prev,
      settingList: prev.settingList.map((prevListItem,idx)=>{
        return (idx === orderSelect)
        ? { ...prevListItem,
          baseProps: { ...prevListItem.baseProps,
            base      : baseInput    ,
            prompts   : summaryPrompt,
          },
        }: prevListItem
      })
    }))
  },[
    setDataList,
    orderSelect,
    baseInput  ,
    locateInput,
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
    <EditItem label={'Base Prompt:'    }/>
    <BlocItem><PromptField value={baseInput} onChange={handleBaseInputChange}/></BlocItem>
    <Divider/>
    <ViewItem label={'Period:'  }><Order order={periodOrder  }/></ViewItem>
    <ViewItem label={'Weather:' }><Order order={weatherOrder }/></ViewItem>
    <ViewItem label={'Times:'   }><Order order={timesOrder   }/></ViewItem>
    <EditItem label={'Location:'}><Order order={locationOrder}/></EditItem>
    <BlocItem><PromptField value={locateInput} onChange={handleLocateInputChange}/></BlocItem>
    <Divider/>
    <DisplayItem text={display}/>
  </Box>)
}

export default BaseSettings