import { getAgesData, getBangsSizeData, getBodySizeData, getBoobSizeData, getButtSizeData, getEyesShapeData, getFigureData, getGenitalData, getGenitalSizeData, getHairSizeData, getMindData, getModelsData, getPeriodData, getRandomPosingData, getSkinData, getTimesData, getWeatherData } from "@/const/cons_promptOrder"
import { ActionSettingsProps, BaseSettingsProps, BodySettingsProps, EmotionSettingsProps, FaceSettingsProps, FluidSettingsProps, GenitalSettingsProps, HairSettingsProps, PosingSettingsProps, SceneSettingsProps, SummaryPromptType } from "@/const/cons_promptProps"
import { ITEMS } from "@/init/init"

const getPromptProperties = (props:{order?:string}) => {
  const emptyStrings = "- empty -"
  const initialNSFW = true
  const emptyList = Array.from({length:ITEMS},()=>"")
  const data = JSON.parse(props.order ?? "{}")
  const otherInfo = data?.OTHER_INFO ?? undefined
  const charaInfo = data?.CHARA_INFO ?? undefined

  const baseProps   :BaseSettingsProps    = {
    story    : otherInfo?.story ?? emptyStrings,
    model    : getModelsData({ enums: data?.baseSettings?.model ?? 0 }).order,
    character: otherInfo?.baseSettings?.character ?? emptyStrings,
    species  : otherInfo?.baseSettings?.species   ?? emptyStrings,
    base       : "",
    nsfw       : initialNSFW,
    solo       : true,
    cute       : true,
    additional : "",
    prompts    : ""
  }
  const hairProps   :HairSettingsProps    = {
    hairColor : otherInfo?.colorSettings?.hairStyleColor ?? emptyStrings,
    hairSize  : getHairSizeData ({ enums: charaInfo?.hairSettings?.hairSize  ?? 0 }),
    bangsSize : getBangsSizeData({ enums: charaInfo?.hairSettings?.bangsSize ?? 0 }),
    hairStyle : charaInfo?.hairSettings?.hairStyle  ?? emptyStrings,
    bangsStyle: charaInfo?.hairSettings?.bangsStyle ?? emptyStrings,
    hairColorPrompt : "",
    hairStylePrompt : "",
    bangsStylePrompt: "",
    additional      : "",
    prompts         : ""
  }
  const faceProps   :FaceSettingsProps    = {
    faceLooks   : getAgesData     ({ enums: charaInfo?.faceSettings?.faceLooks   ?? 0 }),
    personality : getMindData     ({ enums: charaInfo?.faceSettings?.personality ?? 0 }),
    eyesShape   : getEyesShapeData({ enums: charaInfo?.faceSettings?.eyesShape   ?? 0 }),
    eyesColor   : otherInfo?.colorSettings?.eyesStyleColor ?? emptyStrings,
    eyesColorPrompt : "",
    random          : false,
    closeEyes       : false,
    openMouth       : false,
    tongueOut       : false,
    additional      : "",
    prompts         : ""
  }
  const bodyProps   :BodySettingsProps    = {
    skinType     : getSkinData  ({ enums: charaInfo?.bodySettings?.skin   ?? 0 }),
    bodyType     : getFigureData({ enums: charaInfo?.bodySettings?.figure ?? 0 }),
    mainBodyColor: otherInfo?.colorSettings?.mainSkinColor ?? emptyStrings,
    subBodyColor : otherInfo?.colorSettings?.subSkinColor  ?? emptyStrings,
    boobSize     : getBoobSizeData({ enums: charaInfo?.bodySettings?.boob ?? 0 }),
    bodySize     : getBodySizeData({ enums: charaInfo?.bodySettings?.body ?? 0 }),
    buttSize     : getButtSizeData({ enums: charaInfo?.bodySettings?.butt ?? 0 }),
    skinPrompt: "",
    additional: "",
    prompts   : ""
  }
  const sceneProps  :SceneSettingsProps   = {
    location   : otherInfo?.background?.location ?? emptyStrings,
    outfit     : otherInfo?.background?.outfit   ?? emptyStrings,
    job        : otherInfo?.background?.job      ?? emptyStrings,
    items      : [
      otherInfo?.background?.items1 ?? "",
      otherInfo?.background?.items2 ?? "",
      otherInfo?.background?.items3 ?? "",
    ].filter((item)=>item!=="").join(', ') ?? emptyStrings,
    mainColor  : otherInfo?.colorSettings?.mainThemeColor   ?? emptyStrings,
    subColor   : otherInfo?.colorSettings?.subThemeColor    ?? emptyStrings,
    accentColor: otherInfo?.colorSettings?.accentThemeColor ?? emptyStrings,
    period     : getPeriodData ({ enums: otherInfo?.situation?.period  ?? 0 }),
    times      : getTimesData  ({ enums: otherInfo?.situation?.times   ?? 0 }),
    weather    : getWeatherData({ enums: otherInfo?.situation?.weather ?? 0 }),
    simple        : false,
    locationPrompt: "",
    outfitPrompt  : "",
    condition     : "",
    equip         : "",
    additional    : "",
    prompts       : ""
  }
  const genitalProps:GenitalSettingsProps = {
    maleGenitals    : getGenitalData    ({ enums: charaInfo?.genitalSettings?.maleGenital ?? 0 }),
    maleGenitalsSize: getGenitalSizeData({ enums: charaInfo?.genitalSettings?.genitalSize ?? 0 }),
    genitalsColor   : otherInfo?.colorSettings?.cosmeticSkinColor ?? emptyStrings,
    nsfw           : initialNSFW,
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
    nsfw          : initialNSFW,
    fluidTier     : 0,
    fluidsList    : emptyList,
    additionalList: emptyList,
    promptList    : emptyList
  }
  const emotionProps:EmotionSettingsProps = {
    nsfw          : initialNSFW,
    emoteTier     : 0,
    additionalList: emptyList,
    emotesList    : emptyList,
    promptList    : emptyList
  }
  const posingProps :PosingSettingsProps  = {
    posingList    : emptyList.map(()=>getRandomPosingData()),
    additionalList: emptyList,
    promptList    : emptyList
  }
  const actionProps :ActionSettingsProps  = {
    nsfw          : initialNSFW,
    actionTier    : 0,
    actionsList   : emptyList,
    additionalList: emptyList,
    promptList    : emptyList
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

export default getPromptProperties