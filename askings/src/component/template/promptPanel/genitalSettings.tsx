import { LabelText } from "@/component/atoms/text"
import { PromptField } from "@/component/atoms/textField"
import { DataListContext } from "@/component/context"
import { ViewItem, Order, EditItem, DisplayItem, OrderWithInput, OrderWithCheckBox, BlocItem, AdditionalItem, ColorOrder } from "@/component/molecules/promptItem"
import { randBool } from "@/util"
import { Box, Divider } from "@mui/material"
import { BaseSyntheticEvent, useContext, useEffect, useRef, useState } from "react"

const GenitalSettings = (props:{orderSelect:number}) => {
  const orderSelect = useRef(props.orderSelect)
  useEffect(()=>{orderSelect.current = props.orderSelect},[props.orderSelect])
  const {dataList, setDataList} = useContext(DataListContext)
  const property =  dataList.settingList[orderSelect.current].genitalProps

  const genitalsColorOrder    = property.genitalsColor
  const maleGenitalsOrder     = property.maleGenitals    .order
  const maleGenitalsSizeOrder = property.maleGenitalsSize.order

  const [chkRandom      , setChkRandom      ] = useState(property.random      )
  const [chkPublicHair  , setChkPublicHair  ] = useState(property.publicHair  )
  const [chkInvertNipple, setChkInvertNipple] = useState(property.invertNipple)
  const [chkSheathPenis , setChkSheathPenis ] = useState(property.sheathPenis )
  const [genitalColorInput   , setGenitalColorInput   ] = useState(property.genitalColor   )
  const [pussyDetailsInput   , setPussyDetailsInput   ] = useState(property.pussyDetails   )
  const [anusDetailsInput    , setAnusDetailsInput    ] = useState(property.anusDetails    )
  const [genitalsDetailsInput, setGenitalsDetailsInput] = useState(property.genitalsDetails)
  const [additional          , setAdditional] = useState(property.additional)

  const [display,    setDisplay   ] = useState(property.prompts)

  const handleChangeRandomCheck          = () => setChkRandom      (!chkRandom      )
  const handleChangePublicHairCheck      = () => setChkPublicHair  (!chkPublicHair  )
  const handleChangeInvertNippleCheck    = () => setChkInvertNipple(!chkInvertNipple)
  const handleChangeSheathPenisCheck     = () => setChkSheathPenis (!chkSheathPenis )
  const handleGenitalColorInputChange    = (e:BaseSyntheticEvent) => setGenitalColorInput   (e.target.value)
  const handlePussyDetailsInputChange    = (e:BaseSyntheticEvent) => setPussyDetailsInput   (e.target.value)
  const handleAnusDetailsInputChange     = (e:BaseSyntheticEvent) => setAnusDetailsInput    (e.target.value)
  const handleGenitalsDetailsInputChange = (e:BaseSyntheticEvent) => setGenitalsDetailsInput(e.target.value)
  const handleAdditionalChange = (e:BaseSyntheticEvent) => setAdditional(e.target.value)

  const nsfwFag = property.nsfw
  const maleGenitalsPrompt     = property.maleGenitals    .prompt === "yes"
  const maleGenitalsSizePrompt = property.maleGenitalsSize.prompt

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
    const summaryPrompt = `${prompts.filter(prompt=>prompt!=="").join(", ")},`;
    setDisplay(summaryPrompt)
    setDataList(prev=>({ ...prev,
      settingList: prev.settingList.map((prevListItem,idx)=>{
        return (idx === orderSelect.current)
        ? {
            ...prevListItem, genitalProps: {
              ...prevListItem.genitalProps,
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
          }
        } : prevListItem
      })
    }))
  },[
    setDataList           ,
    nsfwFag               ,
    chkInvertNipple       ,
    chkPublicHair         ,
    chkRandom             ,
    chkSheathPenis        ,
    anusDetailsInput      ,
    pussyDetailsInput     ,
    genitalsDetailsInput  ,
    genitalColorInput     ,
    maleGenitalsPrompt    ,
    maleGenitalsSizePrompt,
    additional            ,
  ])

  return (<Box display={"flex"} flexDirection={"column"} gap={"0.25em"}>
    <LabelText bold text={'GenitalSetting Prompt'}/>
    <Divider/>
    <EditItem label={'Genital color:'  }>
      <ColorOrder colorText={genitalsColorOrder}/>
      <OrderWithInput value={genitalColorInput   } onChange={handleGenitalColorInputChange}/>
    </EditItem>
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