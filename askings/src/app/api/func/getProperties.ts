import { BasisSettingsProps, FacesSettingsProps, BodiesSettingsProps, OptionsSettingsProps, DetailsSettingsProps, PromptsSettingsProps, PromptDataType, BasisOrders, BodiesOrders, DetailsOrders, FacesOrders, OptionsOrders } from "@/const/cons_interfaces"
import { parseNum, randBool } from "@/util"
import { getModelData, getLooksData, getPersonalityData, getHairsSizeData, getFigureData, getMaleGenital, getMalesSize, getPeriodData, getBangsSizeData, getBodySizeData, getBoobSizeData, getButtSizeData, getEyesShapeData, getTimesData, getWeatherData } from "./getPrompts"
import LABEL_TEXT from "@/const/LABEL_TEXT"

export const getBasisInitialProps   = (data:BasisOrders  ):BasisSettingsProps   => {
  const basisSettings = data?.basisSettings ?? undefined
  const sceneSettings = data?.sceneSettings ?? undefined
  const model   = getModelData  (basisSettings?.model   ?? 0)
  const period  = getPeriodData (sceneSettings?.period  ?? 0)
  const weather = getWeatherData(sceneSettings?.weather ?? 0)
  const times   = getTimesData  (sceneSettings?.times   ?? 0)[randBool()?0:1]
  const props:BasisSettingsProps   = {
    basis: {
      model    : model,
      character: basisSettings?.character ?? LABEL_TEXT.empty,
      species  : basisSettings?.species   ?? LABEL_TEXT.empty,
      story    : basisSettings?.story     ?? LABEL_TEXT.empty,
      jobs     : basisSettings?.jobs      ?? LABEL_TEXT.empty,
    },
    scene: {
      period : period ,
      weather: weather,
      times  : times  ,
      locate : basisSettings?.locate ?? LABEL_TEXT.empty
    },
    input: {
      basisInput:  "",
      locateInput: ""
    }
  }
  return props;
}
export const getFacesInitialProps   = (data:FacesOrders  ):FacesSettingsProps   => {
  const facesSettings = data?.facesSettings
  const hairsSettings = data?.hairsSettings
  const looks     = getLooksData    (facesSettings?.looks    )
  const personality = getPersonalityData(facesSettings?.personality)
  const eyesShape   = getEyesShapeData  (facesSettings?.eyesShape  )
  const hairsSize   = getHairsSizeData  (hairsSettings?.hairsSize)
  const bangsSize   = getBangsSizeData  (hairsSettings?.bangsSize)
  const props:FacesSettingsProps   = {
    face: {
      looks      : looks    ,
      personality: personality,
      eyesShape  : eyesShape  ,
    },
    hair: {
      hairsSize: hairsSize,
      bangsSize: bangsSize,
      hairsStyle: hairsSettings?.hairsStyle ?? LABEL_TEXT.empty,
      bangsStyle: hairsSettings?.bangsStyle ?? LABEL_TEXT.empty
    },
    input: {
      faceOptionInput: "",
      hairsStyleInput: "",
      bangsStyleInput: "",
      hairOptionInput: ""
    }
  }
  return props;
}
export const getBodiesInitialProps  = (data:BodiesOrders ):BodiesSettingsProps  => {
  const bodiesSettings  = data?.bodiesSettings
  const genitalSettings = data?.genitalSettings
  const figures     = getFigureData (bodiesSettings?.figures )
  const index       = parseNum(figures.prompt,2)
  const boobSize    = getBoobSizeData(bodiesSettings?.boobSize)[index]
  const bodySize    = getBodySizeData(bodiesSettings?.bodySize)[index]
  const buttSize    = getButtSizeData(bodiesSettings?.buttSize)[index]
  const maleGenital = getMaleGenital (genitalSettings?.maleGenital)
  const malesSize   = getMalesSize   (genitalSettings?.malesSize  )
  const props:BodiesSettingsProps  = {
    body: {
      figures : figures.order ?? LABEL_TEXT.empty,
      boobSize: boobSize,
      bodySize: bodySize,
      buttSize: buttSize,
    },
    genital: {
      maleGenital: maleGenital,
      malesSize  : malesSize  ,
    },
    input: {
      bodyOptionInput   : "",
      pussyDetailsInput : "",
      anusDetailsInput  : "",
      malesDetailsInput : "",
      genitalOptionInput: ""
    }
  }
  return props;
}
export const getDetailsInitialProps = (data:DetailsOrders):DetailsSettingsProps => {
  const ordersData = data?.ordersData
  const colorsData = data?.colorsData
  const props:DetailsSettingsProps = {
    order: {
      skinType: ordersData?.skinType ?? LABEL_TEXT.empty,
      outfits : ordersData?.outfits  ?? LABEL_TEXT.empty,
      equips  : ordersData?.equips   ?? LABEL_TEXT.empty,
    },
    color: {
      hair      : colorsData?.hairColor         ?? LABEL_TEXT.empty,
      eyes      : colorsData?.eyesColor         ?? LABEL_TEXT.empty,
      skinMain  : colorsData?.skinMainColor     ?? LABEL_TEXT.empty,
      skinSub   : colorsData?.skinAccentColor   ?? LABEL_TEXT.empty,
      outfitMain: colorsData?.outfitMainColor   ?? LABEL_TEXT.empty,
      outfitSub : colorsData?.outfitAccentColor ?? LABEL_TEXT.empty,
      equipsMain: colorsData?.equipsMainColor   ?? LABEL_TEXT.empty,
      equipsSub : colorsData?.equipsAccentColor ?? LABEL_TEXT.empty,
      genital   : colorsData?.randomAccentColor ?? LABEL_TEXT.empty,
    },
    input: {
      hairColor   : "",
      eyesColor   : "",
      skinColor   : "",
      genitalColor: "",
      outfitInput : "",
      equipsInput : ""
    }
  }
  return props;
}
export const getOptionsInitialProps = (data:OptionsOrders):OptionsSettingsProps => {
  const optionSettings = data?.optionSettings
  const maleGenital = getMaleGenital(optionSettings?.maleGenital)
  const props:OptionsSettingsProps = {
    basis: {
      simple: true,
      solo  : true,
      cute  : true
    },
    face: {
      random: false,
      winked: false,
      tongue: false
    },
    genital: {
      random : false,
      pubHair: false,
      inverts: false
    },
    males: {
      genital: maleGenital,
      random : false,
      sheath : false
    },
    input: {
      optionInput: ""
    }
  }
  return props;
}
export const getPromptsInitialProps = ():PromptsSettingsProps => {
  const props:PromptsSettingsProps = {
    promptTier: 0,
    posingList: [],
    emotesList: [],
    actionList: [],
    promptList: []
  }
  return props;
}

