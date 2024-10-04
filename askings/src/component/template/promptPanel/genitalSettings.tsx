import { LabelText } from "@/component/atoms/text"
import { PromptField } from "@/component/atoms/textField"
import { SummaryPromptContext } from "@/component/context"
import { ViewItem, Order, EditItem, DisplayItem, OrderWithInput, OrderWithCheckBox, BlocItem, AdditionalItem } from "@/component/molecules/promptItem"
import { getGenitalData, getGenitalSizeData } from "@/const/cons_promptOrder"
import { GenitalSettingsProps } from "@/const/cons_promptProps"
import { randBool } from "@/util"
import { Box, Divider } from "@mui/material"
import { BaseSyntheticEvent, useContext, useEffect, useState } from "react"

const GenitalSettings = () => {
  const {summaryPrompt, setSummaryPrompt} = useContext(SummaryPromptContext)
  const property = summaryPrompt.genitalProps as GenitalSettingsProps

  const genitalsColorOrder    = property.genitalsColorOrder
  const maleGenitalsOrder     = getGenitalData    ({enums:property.maleGenitalsOrder    }).order
  const maleGenitalsSizeOrder = getGenitalSizeData({enums:property.maleGenitalsSizeOrder}).order

  const [chkRandom      , setChkRandom      ] = useState(property.random       ?? false)
  const [chkPublicHair  , setChkPublicHair  ] = useState(property.publicHair   ?? false)
  const [chkInvertNipple, setChkInvertNipple] = useState(property.invertNipple ?? false)
  const [chkSheathPenis , setChkSheathPenis ] = useState(property.sheathPenis  ?? false)
  const [genitalColorInput   , setGenitalColorInput   ] = useState(property.genitalColor    ?? ""  )
  const [pussyDetailsInput   , setPussyDetailsInput   ] = useState(property.pussyDetails    ?? ""  )
  const [anusDetailsInput    , setAnusDetailsInput    ] = useState(property.anusDetails     ?? ""  )
  const [genitalsDetailsInput, setGenitalsDetailsInput] = useState(property.genitalsDetails ?? ""  )
  const [additional          , setAdditional] = useState(property.additional    ?? ""  )

  const [display,    setDisplay   ] = useState(property.prompts     ?? ""  )

  const handleChangeRandomCheck          = () => setChkRandom      (!chkRandom      )
  const handleChangePublicHairCheck      = () => setChkPublicHair  (!chkPublicHair  )
  const handleChangeInvertNippleCheck    = () => setChkInvertNipple(!chkInvertNipple)
  const handleChangeSheathPenisCheck     = () => setChkSheathPenis (!chkSheathPenis )
  const handleGenitalColorInputChange    = (e:BaseSyntheticEvent) => setGenitalColorInput   (e.target.value)
  const handlePussyDetailsInputChange    = (e:BaseSyntheticEvent) => setPussyDetailsInput   (e.target.value)
  const handleAnusDetailsInputChange     = (e:BaseSyntheticEvent) => setAnusDetailsInput    (e.target.value)
  const handleGenitalsDetailsInputChange = (e:BaseSyntheticEvent) => setGenitalsDetailsInput(e.target.value)
  const handleAdditionalChange = (e:BaseSyntheticEvent) => setAdditional(e.target.value)

  const maleGenitalsPrompt     = getGenitalData    ({enums:property.maleGenitalsOrder    }).prompt === "yes"
  const maleGenitalsSizePrompt = getGenitalSizeData({enums:property.maleGenitalsSizeOrder}).prompt

  useEffect(()=>{
    const nipplePrompt  = (!property.nsfw) ? `${genitalColorInput} nipples` : "no nipples"
    const pussyPrompt   = (!property.nsfw) ? `${genitalColorInput} pussy, ${pussyDetailsInput} pussy` : ""
    const anusPrompt    = (!property.nsfw) ? `${genitalColorInput} anus, ${anusDetailsInput} anus`    : ""
    const genitalPrompt = (!property.nsfw) ? `${genitalColorInput} penis, ${maleGenitalsSizePrompt} penis, ${anusDetailsInput} penis,` : `${maleGenitalsSizePrompt} bulge`
    const checkPublicHair    = (!property.nsfw) ? ((chkRandom) ? (randBool() ? "closed eyes"  : "") : ((chkPublicHair  ) ? "closed eyes"  : "")) : ""
    const checkInvertNipple  = (!property.nsfw) ? ((chkRandom) ? (randBool() ? "opened mouth" : "") : ((chkInvertNipple) ? "opened mouth" : "")) : ""
    const checkSheathPenis   = (!property.nsfw) ? ((chkRandom) ? (randBool() ? "tongue out"   : "") : ((chkSheathPenis ) ? "tongue out"   : "")) : ""
    const prompts = [
      nipplePrompt     ,
      checkInvertNipple,
      pussyPrompt      ,
      anusPrompt       ,
      checkPublicHair  ,
      (maleGenitalsPrompt) ? [
        genitalPrompt   ,
        checkSheathPenis,
      ] : "",
      additional,
    ]
    const summaryPrompt = `${prompts.filter(prompt=>prompt!=="").join(", ")},`;
    setDisplay(summaryPrompt)
    setSummaryPrompt(prev=>({
      ...prev, genitalProps: {
        ...prev.genitalProps,
        random      :chkRandom      ,
        publicHair  :chkPublicHair  ,
        invertNipple:chkInvertNipple,
        sheathPenis :chkSheathPenis ,
        genitalColor   : genitalColorInput   ,
        pussyDetails   : pussyDetailsInput   ,
        anusDetails    : anusDetailsInput    ,
        genitalsDetails: genitalsDetailsInput,
        additional  : additional     ,
        prompts     : summaryPrompt  ,
      },
    }))
  },[
    chkRandom      ,
    chkPublicHair  ,
    chkInvertNipple,
    chkSheathPenis ,
    genitalColorInput   ,
    pussyDetailsInput   ,
    anusDetailsInput    ,
    genitalsDetailsInput,
    additional          ,
    maleGenitalsPrompt    ,
    maleGenitalsSizePrompt,
    property.nsfw   ,
    setSummaryPrompt,
  ])

  return (<Box display={"flex"} flexDirection={"column"} gap={"0.25em"}>
    <LabelText bold text={'GenitalSetting Prompt'}/>
    <Divider/>
    <EditItem label={'Genital color:'  }><OrderWithInput value={genitalColorInput   } onChange={handleGenitalColorInputChange} order={genitalsColorOrder}/></EditItem>
    <EditItem label={'Pussy Details:'  }><PromptField    value={pussyDetailsInput   } onChange={handlePussyDetailsInputChange}/></EditItem>
    <EditItem label={'Anus Details:'   }><PromptField    value={anusDetailsInput    } onChange={handleAnusDetailsInputChange }/></EditItem>
    <Divider/>
    <ViewItem label={'Male Genital[MG]: '}><Order order={maleGenitalsOrder    }/></ViewItem>
    <ViewItem label={'MGs Size: '        }><Order order={maleGenitalsSizeOrder}/></ViewItem>
    <EditItem label={'MGs Details: '     }><OrderWithInput value={genitalsDetailsInput} onChange={handleGenitalsDetailsInputChange}/></EditItem>

    <Divider/>
    <EditItem label={'Optional:'}/>
    <BlocItem>
      <OrderWithCheckBox order={"Random: "      } checked={chkRandom      } onChange={handleChangeRandomCheck      } disabled={false}/>
      <OrderWithCheckBox order={"Closed Eyes: " } checked={chkPublicHair  } onChange={handleChangePublicHairCheck  } disabled={chkRandom}/>
      <OrderWithCheckBox order={"Opened Mouth: "} checked={chkInvertNipple} onChange={handleChangeInvertNippleCheck} disabled={chkRandom}/>
      <OrderWithCheckBox order={"Tongue Out: "  } checked={chkSheathPenis } onChange={handleChangeSheathPenisCheck } disabled={chkRandom}/>
    </BlocItem>
    <Divider/>
    <AdditionalItem additional={additional} onChange={handleAdditionalChange}/>
    <DisplayItem text={display}/>
  </Box>)
}

export default GenitalSettings