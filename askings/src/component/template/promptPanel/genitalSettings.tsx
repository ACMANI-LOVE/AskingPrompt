import { LabelText } from "@/component/atoms/text"
import { PromptField } from "@/component/atoms/textField"
import { SummaryPromptContext } from "@/component/context"
import { ViewItem, Order, EditItem, DisplayItem, OrderWithInput, OrderWithCheckBox, BlocItem, AdditionalItem } from "@/component/molecules/promptItem"
import { GenitalSettingsProps } from "@/const/cons_promptProps"
import { randBool } from "@/util"
import { Box, Divider } from "@mui/material"
import { BaseSyntheticEvent, useContext, useEffect, useRef, useState } from "react"

const GenitalSettings = () => {
  const {summaryPrompt, setSummaryPrompt} = useContext(SummaryPromptContext)
  const property      = useRef<GenitalSettingsProps>(summaryPrompt.genitalProps)
  const onUpdateProps = useRef((prompts:string[])=>{
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
  })

  const genitalsColorOrder    = property.current.genitalsColor
  const maleGenitalsOrder     = property.current.maleGenitals    .order
  const maleGenitalsSizeOrder = property.current.maleGenitalsSize.order

  const [chkRandom      , setChkRandom      ] = useState(property.current.random      )
  const [chkPublicHair  , setChkPublicHair  ] = useState(property.current.publicHair  )
  const [chkInvertNipple, setChkInvertNipple] = useState(property.current.invertNipple)
  const [chkSheathPenis , setChkSheathPenis ] = useState(property.current.sheathPenis )
  const [genitalColorInput   , setGenitalColorInput   ] = useState(property.current.genitalColor   )
  const [pussyDetailsInput   , setPussyDetailsInput   ] = useState(property.current.pussyDetails   )
  const [anusDetailsInput    , setAnusDetailsInput    ] = useState(property.current.anusDetails    )
  const [genitalsDetailsInput, setGenitalsDetailsInput] = useState(property.current.genitalsDetails)
  const [additional          , setAdditional] = useState(property.current.additional)

  const [display,    setDisplay   ] = useState(property.current.prompts)

  const handleChangeRandomCheck          = () => setChkRandom      (!chkRandom      )
  const handleChangePublicHairCheck      = () => setChkPublicHair  (!chkPublicHair  )
  const handleChangeInvertNippleCheck    = () => setChkInvertNipple(!chkInvertNipple)
  const handleChangeSheathPenisCheck     = () => setChkSheathPenis (!chkSheathPenis )
  const handleGenitalColorInputChange    = (e:BaseSyntheticEvent) => setGenitalColorInput   (e.target.value)
  const handlePussyDetailsInputChange    = (e:BaseSyntheticEvent) => setPussyDetailsInput   (e.target.value)
  const handleAnusDetailsInputChange     = (e:BaseSyntheticEvent) => setAnusDetailsInput    (e.target.value)
  const handleGenitalsDetailsInputChange = (e:BaseSyntheticEvent) => setGenitalsDetailsInput(e.target.value)
  const handleAdditionalChange = (e:BaseSyntheticEvent) => setAdditional(e.target.value)

  const nsfwFag = property.current.nsfw
  const maleGenitalsPrompt     = property.current.maleGenitals    .prompt === "yes"
  const maleGenitalsSizePrompt = property.current.maleGenitalsSize.prompt

  useEffect(()=>{
    const nipplePrompt  = (nsfwFag) ? `${genitalColorInput} nipples` : "no nipples"
    const pussyPrompt   = (nsfwFag) ? `${genitalColorInput} pussy, ${pussyDetailsInput} pussy` : ""
    const anusPrompt    = (nsfwFag) ? `${genitalColorInput} anus, ${anusDetailsInput} anus`    : ""
    const genitalPrompt = (nsfwFag) ? `${genitalColorInput} penis, ${maleGenitalsSizePrompt} penis, ${anusDetailsInput} penis,` : `${maleGenitalsSizePrompt} bulge`
    const checkPublicHair    = (nsfwFag) ? ((chkRandom) ? (randBool() ? "closed eyes"  : "") : ((chkPublicHair  ) ? "closed eyes"  : "")) : ""
    const checkInvertNipple  = (nsfwFag) ? ((chkRandom) ? (randBool() ? "opened mouth" : "") : ((chkInvertNipple) ? "opened mouth" : "")) : ""
    const checkSheathPenis   = (nsfwFag) ? ((chkRandom) ? (randBool() ? "tongue out"   : "") : ((chkSheathPenis ) ? "tongue out"   : "")) : ""
    const prompts = [
      nipplePrompt     ,
      checkInvertNipple,
      pussyPrompt      ,
      anusPrompt       ,
      checkPublicHair  ,
      (maleGenitalsPrompt) ? genitalPrompt    : "",
      (maleGenitalsPrompt) ? checkSheathPenis : "",
      additional,
    ]
    onUpdateProps.current(prompts)
  },[
    nsfwFag               ,
    chkInvertNipple       ,
    chkPublicHair         ,
    chkRandom             ,
    chkSheathPenis        ,
    anusDetailsInput      ,
    pussyDetailsInput     ,
    genitalColorInput     ,
    maleGenitalsPrompt    ,
    maleGenitalsSizePrompt,
    additional            ,
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