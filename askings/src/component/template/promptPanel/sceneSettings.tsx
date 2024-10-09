import { LabelText } from "@/component/atoms/text"
import { PromptField } from "@/component/atoms/textField"
import { DataListContext } from "@/component/context"
import { AdditionalItem, BlocItem, ColorOrder, DisplayItem, EditItem, Order, OrderWithCheckBox, OrderWithPrompt, RowDirection, ViewItem } from "@/component/molecules/promptItem"
import { randBetween } from "@/util"
import { Box, Divider } from "@mui/material"
import { BaseSyntheticEvent, useContext, useEffect, useState } from "react"

const SceneSettings   = (props:{orderSelect:number}) => {
  const { orderSelect } = props

  const {dataList, setDataList} = useContext(DataListContext)
  const property =  dataList.settingList[orderSelect].sceneProps

  const periodOrder  = property.period .order
  const weatherOrder = property.weather.order
  const timesOrder   = property.times  .order

  const mainColorOrder   = property.mainColor
  const subColorOrder    = property.subColor
  const accentColorOrder = property.accentColor
  const locationOrder = property.location
  const jobOrder      = property.job
  const outfitOrder   = property.outfit
  const itemsOrder    = property.items

  const [chkSimple    , setChkSimple    ] = useState(property.simple    )
  const [condition    , setCondition    ] = useState(property.condition )
  const [locationInput, setLocationInput] = useState(property.locationPrompt)
  const [outfitInput  , setOutfitInput  ] = useState(property.outfitPrompt  )
  const [equipInput   , setEquipInput   ] = useState(property.equip     )
  const [additional   , setAdditional   ] = useState(property.additional)

  const [display, setDisplay] = useState(property.prompts)

  const handleChangeSimpleCheck     = () => setChkSimple(!chkSimple)
  const handleChangeConditionSelect = (select:string) => setCondition((select!==condition)?select:"")
  const handleLocationInputChange   = (e:BaseSyntheticEvent) => setLocationInput(e.target.value)
  const handleOutfitInputChange     = (e:BaseSyntheticEvent) => setOutfitInput  (e.target.value)
  const handleEquipInputChange      = (e:BaseSyntheticEvent) => setEquipInput   (e.target.value)
  const handleAdditionalChange      = (e:BaseSyntheticEvent) => setAdditional   (e.target.value)

  const periodPrompt  = property.period .prompt
  const weatherPrompt = property.weather.prompt
  const timesPrompt   = property.times  .prompt[randBetween(0,1)]

  useEffect(()=>{
    const period   = (chkSimple) ? ""                        : periodPrompt
    const weather  = (chkSimple) ? ""                        : weatherPrompt
    const times    = (chkSimple) ? ""                        : timesPrompt
    const location = (chkSimple) ? "white simple background" : locationInput
    const outfit   = [outfitInput, equipInput].filter(prompt=>prompt!=="").join(", ")
    const prompts = [
      period    ,
      condition ,
      outfit    ,
      weather   ,
      times     ,
      location  ,
      additional,
    ]
    const summaryPrompt = `${prompts.filter(prompt=>prompt!=="").join(", ")},`;
    setDisplay(summaryPrompt)
    setDataList(prev=>({ ...prev,
      settingList: prev.settingList.map((prevListItem,idx)=>{
        return (idx === orderSelect)
        ? {
        ...prevListItem, sceneProps: {
          ...prevListItem.sceneProps,
            simple        : chkSimple    ,
            conditionInput: condition    ,
            locationInput : locationInput,
            outfitInput   : outfitInput  ,
            equipInput    : equipInput   ,
            additional    : additional   ,
            prompts       : summaryPrompt,
          }
        } : prevListItem
      })
    }))
  },[
    setDataList  ,
    orderSelect  ,
    chkSimple    ,
    periodPrompt ,
    timesPrompt  ,
    weatherPrompt,
    condition    ,
    locationInput,
    outfitInput  ,
    equipInput   ,
    additional   ,
  ])

  return (<Box display={"flex"} flexDirection={"column"} gap={"0.25em"}>
    <LabelText bold text={'SceneSetting Prompt'}/>
    <Divider/>
    <ViewItem label={'Period: ' }><Order order={periodOrder }/></ViewItem>
    <ViewItem label={'Weather: '}><Order order={weatherOrder}/></ViewItem>
    <ViewItem label={'Times: '  }><Order order={timesOrder  }/></ViewItem>
    <Divider/>
    <EditItem label={'Location: '}>
      <OrderWithCheckBox order={'Simple Background: '} checked={chkSimple} onChange={handleChangeSimpleCheck  } />
      <Order order={locationOrder}/>
    </EditItem>
    <BlocItem><PromptField value={locationInput} onChange={handleLocationInputChange} /></BlocItem>
    <Divider/>
    <ViewItem label={'Color Config: '}/>
    <RowDirection noIdent>
      <BlocItem><Order order={'Main: '  } /><ColorOrder colorText=  {mainColorOrder  }/></BlocItem>
      <BlocItem><Order order={'Sub: '   } /><ColorOrder colorText=  {subColorOrder   }/></BlocItem>
      <BlocItem><Order order={'Accent: '} /><ColorOrder colorText=  {accentColorOrder}/></BlocItem>
    </RowDirection>
    <EditItem  label={'Optional:'}>
      <OrderWithCheckBox order={'Nude: '          } checked={(condition==="nude"          )} onChange={()=>handleChangeConditionSelect("nude"          )} />
      <OrderWithCheckBox order={'Undressing: '    } checked={(condition==="undressing"    )} onChange={()=>handleChangeConditionSelect("undressing"    )} />
      <OrderWithCheckBox order={'Fully Clothing: '} checked={(condition==="fully clothing")} onChange={()=>handleChangeConditionSelect("fully clothing")} />
    </EditItem>
    <Divider/>
    <ViewItem label={'Job: '          }><Order       order={jobOrder   } /></ViewItem>
    <ViewItem label={'Outfit: '       }><Order       order={outfitOrder} /></ViewItem>
    <EditItem label={'Outfit Prompt: '}><PromptField value={outfitInput} onChange={handleOutfitInputChange }/></EditItem>
    <Divider/>
    <ViewItem label={'Items: '        }><Order       order={itemsOrder } /></ViewItem>
    <EditItem label={'Equip Prompt: ' }><PromptField value={equipInput } onChange={handleEquipInputChange  }/></EditItem>
    <Divider/>
    <AdditionalItem additional={additional} onChange={handleAdditionalChange}/>
    <DisplayItem text={display}/>
  </Box>)
}
export default SceneSettings