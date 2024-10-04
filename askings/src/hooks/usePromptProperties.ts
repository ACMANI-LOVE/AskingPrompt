import { getRandomPosingData } from "@/const/cons_promptOrder"
import { ActionSettingsProps, BaseSettingsProps, BodySettingsProps, EmotionSettingsProps, FaceSettingsProps, FluidSettingsProps, GenitalSettingsProps, HairSettingsProps, PosingSettingsProps, SceneSettingsProps, SummaryPromptType } from "@/const/cons_promptProps"

const usePromptProperties = (props:{order?:string}) => {
  const order = props.order ?? undefined
  const emptyPrompt = (!order) ? Array.from({length:5},()=>"") : []

  const baseProps   :BaseSettingsProps    = {
    story    : "@@@empty story@@@",
    model    : 0,
    character: "@@@empty character@@@",
    species  : "@@@empty species@@@"
  }
  const hairProps   :HairSettingsProps    = {
    hairColor : "@@@empty hairColor@@@",
    hairSize  : 0,
    bangsSize : 0,
    hairStyle : "@@@empty hairStyle@@@",
    bangsStyle: "@@@empty bangsStyle@@@"
  }
  const faceProps   :FaceSettingsProps    = {
    faceLooks   : 0,
    personalityOrder : 0,
    eyesShapeOrder   : 0,
    eyesColorOrder   : "@@@empty eyesColor@@@"
  }
  const bodyProps   :BodySettingsProps    = {
    skinTypeOrder: 0,
    mainBodyColor: "@@@main color@@@",
    subBodyColor:  "@@@sub color@@@",
    bodyTypeOrder: 0,
    boobSizeOrder: 0,
    bodySizeOrder: 0,
    buttSizeOrder: 0
  }
  const sceneProps  :SceneSettingsProps   = {
    periodOrder     : 0,
    weatherOrder    : 0,
    timesOrder      : 0,
    mainColorOrder  : "@@@empty mainColorOrder@@@",
    subColorOrder   : "@@@empty subColorOrder@@@",
    accentColorOrder: "@@@empty accentColorOrder@@@",
    locationOrder   : "@@@empty locationOrder@@@",
    jobOrder        : "@@@empty jobOrder@@@",
    outfitOrder     : "@@@empty outfitOrder@@@",
    itemsOrder      : "@@@empty itemsOrder@@@"
  }
  const genitalProps:GenitalSettingsProps = {
    maleGenitalsOrder    : 0,
    maleGenitalsSizeOrder: 0,
    genitalsColorOrder   : "@@@empty genitalsColorOrder@@@"
  }
  const fluidProps  :FluidSettingsProps   = {
    nsfw: false
  }
  const emotionProps:EmotionSettingsProps = {
    nsfw: false
  }
  const posingProps :PosingSettingsProps  = {
    posingList: emptyPrompt.map(()=>getRandomPosingData()),
    additionalList: emptyPrompt,
    promptList: emptyPrompt
  }
  const actionProps :ActionSettingsProps  = {
    nsfw: false
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