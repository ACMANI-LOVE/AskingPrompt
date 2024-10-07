import { LabelText } from "@/component/atoms/text"
import { PromptField } from "@/component/atoms/textField"
import { SummaryPromptContext } from "@/component/context"
import { ViewItem, Order, EditItem, DisplayItem, OrderWithCheckBox, RowDirection, OrderWithPrompt, AdditionalItem, BlocItem } from "@/component/molecules/promptItem"
import { SceneSettingsProps } from "@/const/cons_promptProps"
import { randBetween } from "@/util"
import { Box, Divider } from "@mui/material"
import { useContext, useState, BaseSyntheticEvent, useEffect, useRef } from "react"

const SceneSettings   = (props:{orderSelect:number}) => {
  const {summaryPrompt, setSummaryPrompt} = useContext(SummaryPromptContext)
  const property      = useRef<SceneSettingsProps>(summaryPrompt[props.orderSelect].sceneProps)
  const onUpdateProps = useRef((prompts:string[])=>{
    const summaryPrompt = `${prompts.filter(prompt=>prompt!=="").join(", ")},`;
    setDisplay(summaryPrompt)
    setSummaryPrompt(prevList=>prevList.map((prev,idx)=>{
      return (idx === props.orderSelect)
      ? {
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
      } : prev
    }))
  })

  const periodOrder  = property.current.period .order
  const weatherOrder = property.current.weather.order
  const timesOrder   = property.current.times  .order

  const mainColorOrder   = property.current.mainColor
  const subColorOrder    = property.current.subColor
  const accentColorOrder = property.current.accentColor
  const locationOrder = property.current.location
  const jobOrder      = property.current.job
  const outfitOrder   = property.current.outfit
  const itemsOrder    = property.current.items

  const [chkSimple    , setChkSimple    ] = useState(property.current.simple    )
  const [condition    , setCondition    ] = useState(property.current.condition )
  const [locationInput, setLocationInput] = useState(property.current.locationPrompt)
  const [outfitInput  , setOutfitInput  ] = useState(property.current.outfitPrompt  )
  const [equipInput   , setEquipInput   ] = useState(property.current.equip     )
  const [additional   , setAdditional   ] = useState(property.current.additional)

  const [display, setDisplay] = useState(property.current.prompts)

  const handleChangeSimpleCheck     = () => setChkSimple(!chkSimple)
  const handleChangeConditionSelect = (select:string) => setCondition((select!==condition)?select:"")
  const handleLocationInputChange   = (e:BaseSyntheticEvent) => setLocationInput(e.target.value)
  const handleOutfitInputChange     = (e:BaseSyntheticEvent) => setOutfitInput  (e.target.value)
  const handleEquipInputChange      = (e:BaseSyntheticEvent) => setEquipInput   (e.target.value)
  const handleAdditionalChange      = (e:BaseSyntheticEvent) => setAdditional   (e.target.value)

  const periodPrompt  = property.current.period .prompt
  const weatherPrompt = property.current.weather.prompt
  const timesPrompt   = property.current.times  .prompt[randBetween(0,1)]

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
    onUpdateProps.current(prompts)
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