import { getAgesData, getBangsSizeData, getBodySizeData, getBoobSizeData, getButtSizeData, getEyesShapeData, getFigureData, getGenitalData, getGenitalSizeData, getHairSizeData, getMindData, getModelsData, getPeriodData, getRandomPosingData, getSkinData, getTimesData, getWeatherData } from "@/const/cons_promptOrder"
import { ActionSettingsProps, BaseSettingsProps, BodySettingsProps, EmotionSettingsProps, FaceSettingsProps, FluidSettingsProps, GenitalSettingsProps, HairSettingsProps, PosingSettingsProps, SceneSettingsProps, SummaryPromptType } from "@/const/cons_promptProps"

const usePromptProperties = (props:{order?:string}) => {
  const order = props.order ?? undefined
  const emptyPrompt = (!order) ? Array.from({length:5},()=>"") : []
  const emptyStrings = "- empty -"
  const baseProps   :BaseSettingsProps    = {
    story    : emptyStrings,
    model    : getModelsData({ enums: 0 }).order,
    character: emptyStrings,
    species  : emptyStrings,
    base       : "",
    nsfw       : false,
    solo       : false,
    cute       : false,
    additional : "",
    prompts    : ""
  }
  const hairProps   :HairSettingsProps    = {
    hairColor : emptyStrings,
    hairSize  : getHairSizeData ({ enums: 0 }),
    bangsSize : getBangsSizeData({ enums: 0 }),
    hairStyle : emptyStrings,
    bangsStyle: emptyStrings,
    hairColorPrompt : "",
    hairStylePrompt : "",
    bangsStylePrompt: "",
    additional     : "",
    prompts        : ""
  }
  const faceProps   :FaceSettingsProps    = {
    faceLooks       : getAgesData({ enums: 0 }),
    personality: getMindData({ enums: 0 }),
    eyesShape  : getEyesShapeData({ enums: 0 }),
    eyesColor  : emptyStrings,
    eyesColorPrompt : "",
    random    : false,
    closeEyes : false,
    openMouth : false,
    tongueOut : false,
    additional: "",
    prompts   : ""
  }
  const bodyProps   :BodySettingsProps    = {
    skinType     : getSkinData({ enums: 0 }),
    bodyType     : getFigureData({ enums: 0 }),
    mainBodyColor: emptyStrings,
    subBodyColor : emptyStrings,
    boobSize     : getBoobSizeData({ enums: 0 }),
    bodySize     : getBodySizeData({ enums: 0 }),
    buttSize     : getButtSizeData({ enums: 0 }),
    skinPrompt: "",
    additional: "",
    prompts   : ""
  }
  const sceneProps  :SceneSettingsProps   = {
    location   : emptyStrings,
    job        : emptyStrings,
    outfit     : emptyStrings,
    items      : emptyStrings,
    mainColor  : emptyStrings,
    subColor   : emptyStrings,
    accentColor: emptyStrings,
    period     : getPeriodData({ enums: 0 }),
    weather    : getWeatherData({ enums: 0 }),
    times      : getTimesData({ enums: 0 }),
    simple        : false,
    locationPrompt: "",
    outfitPrompt  : "",
    condition     : "",
    equip         : "",
    additional    : "",
    prompts       : ""
  }
  const genitalProps:GenitalSettingsProps = {
    maleGenitals    : getGenitalData({ enums: 0 }),
    maleGenitalsSize: getGenitalSizeData({ enums: 0 }),
    genitalsColor   : emptyStrings,
    nsfw           : false,
    random         : false,
    publicHair     : false,
    invertNipple   : false,
    sheathPenis    : false,
    genitalColor   : "",
    pussyDetails   : "",
    anusDetails    : "",
    genitalsDetails: "",
    additional     : "",
    prompts        : ""
  }
  const fluidProps  :FluidSettingsProps   = {
    nsfw          : false,
    fluidTier     : 0,
    fluidsList    : emptyPrompt,
    additionalList: emptyPrompt,
    promptList    : emptyPrompt
  }
  const emotionProps:EmotionSettingsProps = {
    nsfw          : false,
    emoteTier     : 0,
    additionalList: emptyPrompt,
    emotesList    : emptyPrompt,
    promptList    : emptyPrompt
  }
  const posingProps :PosingSettingsProps  = {
    posingList    : emptyPrompt.map(()=>getRandomPosingData()),
    additionalList: emptyPrompt,
    promptList    : emptyPrompt
  }
  const actionProps :ActionSettingsProps  = {
    nsfw          : false,
    actionTier    : 0,
    actionsList   : emptyPrompt,
    additionalList: emptyPrompt,
    promptList    : emptyPrompt
  }
  return {
    baseProps   ,
    hairProps   ,
    faceProps   ,
    bodyProps   ,
    sceneProps  ,
    genitalProps,
    fluidProps  ,
    emotionProps,
    posingProps ,
    actionProps ,
  } as SummaryPromptType
}

export default usePromptProperties