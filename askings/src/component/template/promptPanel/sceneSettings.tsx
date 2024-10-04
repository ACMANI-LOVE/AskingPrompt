import { LabelText } from "@/component/atoms/text"
import { PromptField } from "@/component/atoms/textField"
import { SummaryPromptContext } from "@/component/context"
import { ViewItem, Order, EditItem, DisplayItem, OrderWithCheckBox, RowDirection, OrderWithPrompt, AdditionalItem, BlocItem } from "@/component/molecules/promptItem"
import { getPeriodData, getTimesData, getWeatherData } from "@/const/cons_promptOrder"
import { SceneSettingsProps } from "@/const/cons_promptProps"
import { Box, Divider } from "@mui/material"
import { useContext, useState, BaseSyntheticEvent, useEffect } from "react"

const SceneSettings   = () => {
  const {summaryPrompt, setSummaryPrompt} = useContext(SummaryPromptContext)
  const property = summaryPrompt.sceneProps as SceneSettingsProps

  const periodOrder   = getPeriodData ({enums:property.periodOrder }).order
  const weatherOrder  = getWeatherData({enums:property.weatherOrder}).order
  const timesOrder    = getTimesData  ({enums:property.timesOrder  }).order

  const locationOrder    = property.locationOrder
  const mainColorOrder   = property.mainColorOrder
  const subColorOrder    = property.subColorOrder
  const accentColorOrder = property.accentColorOrder
  const jobOrder    = property.jobOrder
  const outfitOrder = property.outfitOrder
  const itemsOrder  = property.itemsOrder

  const [chkSimple    , setChkSimple    ] = useState(property.simple     ?? false)
  const [condition    , setCondition    ] = useState(property.condition  ?? ""  )
  const [locationInput, setLocationInput] = useState(property.location   ?? ""  )
  const [outfitInput  , setOutfitInput  ] = useState(property.outfit     ?? ""  )
  const [equipInput   , setEquipInput   ] = useState(property.equip      ?? ""  )
  const [additional   , setAdditional   ] = useState(property.additional ?? ""  )

  const [display, setDisplay] = useState(property.prompts ?? "")

  const handleChangeSimpleCheck     = () => setChkSimple(!chkSimple)
  const handleChangeConditionSelect = (select:string) => setCondition((select!==condition)?select:"")
  const handleLocationInputChange   = (e:BaseSyntheticEvent) => setLocationInput(e.target.value)
  const handleOutfitInputChange     = (e:BaseSyntheticEvent) => setOutfitInput  (e.target.value)
  const handleEquipInputChange      = (e:BaseSyntheticEvent) => setEquipInput   (e.target.value)
  const handleAdditionalChange      = (e:BaseSyntheticEvent) => setAdditional   (e.target.value)

  const periodPrompt  = getPeriodData ({enums:property.periodOrder }).prompt
  const weatherPrompt = getWeatherData({enums:property.weatherOrder}).prompt
  const timesPrompt   = getTimesData  ({enums:property.timesOrder  }).prompt

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
    setSummaryPrompt(prev=>({
      ...prev, sceneProps: {
        ...prev.sceneProps,
          simple        : chkSimple    ,
          conditionInput: condition    ,
          locationInput : locationInput,
          outfitInput   : outfitInput  ,
          equipInput    : equipInput   ,
          additional    : additional   ,
          prompts       : summaryPrompt,
      },
    }))
  },[
    chkSimple    ,
    periodPrompt ,
    timesPrompt  ,
    weatherPrompt,
    condition    ,
    locationInput,
    outfitInput  ,
    equipInput   ,
    additional   ,
    setSummaryPrompt,
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
      <OrderWithPrompt order={'Main: '  } value={mainColorOrder  }/>
      <OrderWithPrompt order={'Sub: '   } value={subColorOrder   }/>
      <OrderWithPrompt order={'Accent: '} value={accentColorOrder}/>
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