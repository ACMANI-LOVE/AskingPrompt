import { LabelText } from "@/component/atoms/text"
import { PromptField } from "@/component/atoms/textField"
import { DataListContext } from "@/component/context"
import { DisplayItem, EditItem, Order, OrderWithInput, OrderWithPrompt, ViewItem } from "@/component/molecules/promptItem"
import { Box, Divider } from "@mui/material"
import { BaseSyntheticEvent, useContext, useEffect, useState } from "react"

const BodySettings    = (props:{orderSelect:number}) => {
  const { orderSelect } = props

  const {dataList, setDataList} = useContext(DataListContext)
  const body    =  dataList.settingList[orderSelect].bodyProps
  const genital =  dataList.settingList[orderSelect].genitalProps

  // const mainColorOrder = property.mainBodyColor
  // const subColorOrder  = property.subBodyColor
  // const skinTypeOrder  = property.skinType.order
  const bodyTypeOrder  = body.bodyType.order
  const bodyTypePrompt = body.bodyType.prompt

  const boobSizeOrder  = body.boobSize.order [Number(bodyTypePrompt)]
  const bodySizeOrder  = body.bodySize.order [Number(bodyTypePrompt)]
  const buttSizeOrder  = body.buttSize.order [Number(bodyTypePrompt)]
  const boobSizePrompt = body.boobSize.prompt[Number(bodyTypePrompt)]
  const bodySizePrompt = body.bodySize.prompt[Number(bodyTypePrompt)]
  const buttSizePrompt = body.buttSize.prompt[Number(bodyTypePrompt)]
  // const [skinPrompt, setSkinPrompt] = useState(property.skinPrompt)

  const [pussyDetailsInput   , setPussyDetailsInput   ] = useState(genital.pussyDetails   )
  const [anusDetailsInput    , setAnusDetailsInput    ] = useState(genital.anusDetails    )
  const [genitalsDetailsInput, setGenitalsDetailsInput] = useState(genital.genitalsDetails)


  const maleGenitalsOrder      = genital.maleGenitals    .order
  const maleGenitalsSizeOrder  = genital.maleGenitalsSize.order
  const maleGenitalsSizePrompt = genital.maleGenitalsSize.prompt


  const [bodyAdd   , setBodyAdd   ] = useState(body.additional)
  const [genitalAdd, setGenitalAdd] = useState(body.additional)
  const [display, setDisplay] = useState(body.prompts)

  // const handleSkinPromptChange = (e:BaseSyntheticEvent) => setSkinPrompt(e.target.value)

  const handlePussyDetailsInputChange    = (e:BaseSyntheticEvent) => setPussyDetailsInput   (e.target.value)
  const handleAnusDetailsInputChange     = (e:BaseSyntheticEvent) => setAnusDetailsInput    (e.target.value)
  const handleGenitalsDetailsInputChange = (e:BaseSyntheticEvent) => setGenitalsDetailsInput(e.target.value)

  const handleBodyAddChange    = (e:BaseSyntheticEvent) => setBodyAdd   (e.target.value)
  const handleGenitalAddChange = (e:BaseSyntheticEvent) => setGenitalAdd(e.target.value)

  useEffect(()=>{
    const bodyPrompts = [
      // skinPrompt,
      "shiny skin, sweaty skin",
      boobSizePrompt,
      bodySizePrompt,
      buttSizePrompt,
      (bodyTypePrompt==="1") ? "thick thighs" : "",
      bodyAdd,
    ]
    const genitalPrompts = [
      pussyDetailsInput   ,
      anusDetailsInput    ,
      genitalsDetailsInput,
      maleGenitalsSizePrompt,
      genitalAdd,
    ]
    const summaryPrompt = [
      `${bodyPrompts   .filter(prompt=>prompt!=="").join(", ")},`,
      `${genitalPrompts.filter(prompt=>prompt!=="").join(", ")},`,
    ].join("\n")
    setDisplay(summaryPrompt)
    setDataList(prev=>({ ...prev,
      settingList: prev.settingList.map((prevListItem,idx)=>{
        return (idx === orderSelect)
        ? {
            ...prevListItem, bodyProps: {
              ...prevListItem.bodyProps,
              // skinInput : skinPrompt   ,
              additional  : bodyAdd   ,
              prompts   : summaryPrompt,
            }
        } : prevListItem
      })
    }))
  },[
    setDataList   ,
    orderSelect   ,
    // skinPrompt    ,
    bodyAdd    ,
    bodyTypePrompt,
    bodySizePrompt,
    boobSizePrompt,
    buttSizePrompt,
  ])

return (<Box display={"flex"} flexDirection={"column"} gap={"0.25em"}>
    {/* <Divider/>
    <ViewItem label={'Skin Type: '}><Order order={skinTypeOrder} /></ViewItem>
    <RowDirection>
    <ViewItem label={'BodyColor [Main]: '}><ColorOrder colorText={mainColorOrder} /></ViewItem>
    <ViewItem label={'BodyColor [Sub]: ' }><ColorOrder colorText={subColorOrder } /></ViewItem>
    </RowDirection>
    <EditItem label={'Skin Prompt: '}/>
    <BlocItem><PromptField value={skinPrompt} onChange={handleSkinPromptChange}/></BlocItem> */}
    <LabelText bold text={'BodySetting Prompt'}/>
    <ViewItem label={'Figure Type:'}><Order order={bodyTypeOrder} /></ViewItem>
    <ViewItem label={'Boob size: ' }><OrderWithPrompt order={boobSizeOrder} value={boobSizePrompt} /></ViewItem>
    <ViewItem label={'Body size: ' }><OrderWithPrompt order={bodySizeOrder} value={bodySizePrompt} /></ViewItem>
    <ViewItem label={'Butt size: ' }><OrderWithPrompt order={buttSizeOrder} value={buttSizePrompt} /></ViewItem>
    <Divider/>
    <EditItem label={"BodyAdd:"   }><PromptField value={bodyAdd   } onChange={handleBodyAddChange   }/></EditItem>
    <Divider/>
    <LabelText bold text={'GenitalSetting Prompt'}/>
    <EditItem label={'Pussy Details:'}><PromptField value={pussyDetailsInput} onChange={handlePussyDetailsInputChange}/></EditItem>
    <EditItem label={'Anus Details:' }><PromptField value={anusDetailsInput } onChange={handleAnusDetailsInputChange }/></EditItem>
    <Divider/>
    <ViewItem label={'Male Genital[MG]: '}><Order order={maleGenitalsOrder    }/></ViewItem>
    <ViewItem label={'MGs Size: '        }><Order order={maleGenitalsSizeOrder}/></ViewItem>
    <EditItem label={'MGs Details: '     }><OrderWithInput value={genitalsDetailsInput} onChange={handleGenitalsDetailsInputChange}/></EditItem>
    <Divider/>
    <EditItem label={"GenitalAdd:"   }><PromptField value={genitalAdd       } onChange={handleGenitalAddChange}/></EditItem>
    <Divider/>
    <DisplayItem text={display}/>
  </Box>)
}

export default BodySettings