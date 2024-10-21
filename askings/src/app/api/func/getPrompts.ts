import { PosingDetailProps, PromptDataType } from "@/const/cons_interfaces"
import { getPeriodEnum, getTimesEnum, getPersonalityEnum, getEyesShapeEnum, getWeatherEnum, getLooksEnum, getHairSizeEnum, Period, Weather, Times, Looks, Personality, EyesShape, HairSize, getFigureEnum, getFigureSizeEnum, Figure, FigureSize, getGenitalEnum, getGenitalSizeEnum, Genital, GenitalSize, Tiers, getTiersEnum } from "@/const/enum_requests"
import { getBangsSizeOrder, getBodySizeOrder, getBoobSizeOrder, getButtSizeOrder, getEyesShapeOrder, getFigureOrder, getHairsSizeOrder, getLooksOrder, getMaleGenitalOrder, getMalesSizeOrder, getModelOrder, getPeriodOrder, getPersonalityOrder, getTimesOrder, getWeatherOrder } from "./getOrders"
import { randBetween, randBool } from "@/util"

export const getModelData       = (data:number):string => getModelOrder(data)
export const getPeriodData      = (data:number):PromptDataType   => {
  const enums = getPeriodEnum(data)
  const order = getPeriodOrder(data)
  switch(enums) {
    case Period.Undefined : return { prompt:"no data"    , order }
    case Period.PreHistory: return { prompt:"pre history", order }
    case Period.Ancient   : return { prompt:"ancient"    , order }
    case Period.Medieval  : return { prompt:"medieval"   , order }
    case Period.OldTimes  : return { prompt:"old times"  , order }
    case Period.Nowadays  : return { prompt:""           , order }
    case Period.Future    : return { prompt:"the future" , order }
    default: return { prompt:"none", order}
  }
}
export const getWeatherData     = (data:number):PromptDataType   => {
  const enums = getWeatherEnum(data)
  const order = getWeatherOrder(data)
  switch(enums) {
    case Weather.Undefined : return { prompt: "no data"   , order }
    case Weather.Sunny     : return { prompt: ""          , order }
    case Weather.Cloudy    : return { prompt: "cloudy sky", order }
    case Weather.Rainy     : return { prompt: "rainy sky" , order }
    case Weather.Snowy     : return { prompt: "snowy sky" , order }
    default: return { prompt:"none", order}
  }
}
export const getTimesData       = (data:number):PromptDataType[] => {
  const enums = getTimesEnum(data)
  const order = getTimesOrder(data)
  switch(enums) {
    case Times.Undefined        : return [{prompt:"no data" ,order},{prompt:"no data",order}]
    case Times.MorningToSunset  : return [{prompt:"morning" ,order},{prompt:"sunset" ,order}]
    case Times.EveningToMidnight: return [{prompt:"evening" ,order},{prompt:"night"  ,order}]
    case Times.NightToDawnBreak : return [{prompt:"midnight",order},{prompt:"dawn"   ,order}]
    default: return [{prompt:"none",order},{prompt:"none",order}]
  }
}
export const getLooksData     = (data:number):PromptDataType   => {
  const enums = getLooksEnum(data)
  const order = getLooksOrder(data)
  switch(enums) {
    case Looks.Undefined: return { prompt:"no data"     , order }
    case Looks.Student  : return { prompt:"student girl", order }
    case Looks.Adult    : return { prompt:"adult woman" , order }
    case Looks.Mature   : return { prompt:"mature lady" , order }
    default: return { prompt:"none", order }
  }
}
export const getPersonalityData = (data:number):PromptDataType   => {
  const enums = getPersonalityEnum(data)
  const order = getPersonalityOrder(data)
  switch(enums) {
    case Personality.Undefined   : return { prompt:"no data"         , order }
    case Personality.LawGood     : return { prompt:"intelligent face", order }
    case Personality.LawCalm     : return { prompt:"innocent face"   , order }
    case Personality.LawEvil     : return { prompt:"mysterious face" , order }
    case Personality.NeutralGood : return { prompt:"friendly face"   , order }
    case Personality.NeutralCalm : return { prompt:"kindly face"     , order }
    case Personality.NeutralEvil : return { prompt:"naughty face"    , order }
    case Personality.ChaosGood   : return { prompt:"confident face"  , order }
    case Personality.ChaosCalm   : return { prompt:"crazy face"      , order }
    case Personality.ChaosEvil   : return { prompt:"evil face"       , order }
    default: return { prompt:"none", order }
  }
}
export const getEyesShapeData   = (data:number):PromptDataType   => {
  const enums = getEyesShapeEnum(data)
  const order = getEyesShapeOrder(data)
  switch(enums) {
    case EyesShape.Undefined: return { prompt:"no data"    , order }
    case EyesShape.Narrow   : return { prompt:"narrow eyes", order }
    case EyesShape.Jitome   : return { prompt:"jitome"     , order }
    case EyesShape.Tareme   : return { prompt:"tareme"     , order }
    case EyesShape.Tsurime  : return { prompt:"tsurime"    , order }
    default: return { prompt:"none", order }
  }
}
export const getHairsSizeData   = (data:number):PromptDataType   => {
  const enums = getHairSizeEnum(data)
  const order = getHairsSizeOrder(data)
  switch(enums) {
    case HairSize.Undefined: return { prompt:"none"       , order }
    case HairSize.Short    : return { prompt:"short hair" , order }
    case HairSize.Medium   : return { prompt:"medium hair", order }
    case HairSize.Long     : return { prompt:"long hair"  , order }
    default: return { prompt:"none", order }
  }
}
export const getBangsSizeData   = (data:number):PromptDataType   => {
  const enums = getHairSizeEnum(data)
  const order = getBangsSizeOrder(data)
  switch(enums) {
    case HairSize.Undefined: return { prompt:"none"        , order }
    case HairSize.Short    : return { prompt:"short bangs" , order }
    case HairSize.Medium   : return { prompt:"medium bangs", order }
    case HairSize.Long     : return { prompt:"long bangs"  , order }
    default: return { prompt:"none", order }
  }
}
export const getFigureData     = (data:number):PromptDataType   => {
  const enums = getFigureEnum(data)
  const order = getFigureOrder(data)
  switch(enums) {
    case Figure.Undefined: return { prompt:"no data"   , order }
    case Figure.Normal   : return { prompt:""          , order }
    case Figure.Solid    : return { prompt:"thick legs", order }
    default: return { prompt:"2", order }
  }
}
export const getBoobSizeData    = (data:number):PromptDataType[] => {
  const enums = getFigureSizeEnum(data)
  const order = getBoobSizeOrder(data)
  switch(enums) {
    case FigureSize.Undefined: return [{ prompt:"no data"     , order },{ prompt:"no data"                   , order },{ prompt:"no data", order }]
    case FigureSize.Large    : return [{ prompt:"large breast", order },{ prompt:"saggy breast, large breast", order },{ prompt:"err"    , order }]
    case FigureSize.Huge     : return [{ prompt:"huge breast" , order },{ prompt:"saggy breast, huge breast" , order },{ prompt:"err"    , order }]
    case FigureSize.Hyper    : return [{ prompt:"hyper breast", order },{ prompt:"saggy breast, hyper breast", order },{ prompt:"err"    , order }]
    default: return [{ prompt:"none", order },{ prompt:"none", order },{ prompt:"none", order }]
  }
}
export const getBodySizeData    = (data:number):PromptDataType[] => {
  const enums = getFigureSizeEnum(data)
  const order = getBodySizeOrder(data)
  switch(enums) {
    case FigureSize.Undefined: return [{ prompt:"no data"     , order },{ prompt:"no data"    , order },{ prompt:"no data", order }]
    case FigureSize.Large    : return [{ prompt:"slim body"   , order },{ prompt:"thick body" , order },{ prompt:"err"    , order }]
    case FigureSize.Huge     : return [{ prompt:"healthy body", order },{ prompt:"muscle body", order },{ prompt:"err"    , order }]
    case FigureSize.Hyper    : return [{ prompt:"plump body"  , order },{ prompt:"chubby body", order },{ prompt:"err"    , order }]
    default: return [{ prompt:"none", order },{ prompt:"none", order },{ prompt:"none", order }]
  }
}
export const getButtSizeData    = (data:number):PromptDataType[] => {
  const enums = getFigureSizeEnum(data)
  const order = getButtSizeOrder(data)
  switch(enums) {
    case FigureSize.Undefined: return [{ prompt:"no data"   , order },{ prompt:"no data"               , order },{ prompt:"no data", order }]
    case FigureSize.Large    : return [{ prompt:"large butt", order },{ prompt:"thick butt, large butt", order },{ prompt:"err"    , order }]
    case FigureSize.Huge     : return [{ prompt:"huge butt" , order },{ prompt:"thick butt, huge butt" , order },{ prompt:"err"    , order }]
    case FigureSize.Hyper    : return [{ prompt:"hyper butt", order },{ prompt:"thick butt, hyper butt", order },{ prompt:"err"    , order }]
    default: return [{ prompt:"none", order },{ prompt:"none", order },{ prompt:"none", order }]
  }
}
export const getMaleGenital     = (data:number):PromptDataType   => {
  const enums = getGenitalEnum(data)
  const order = getMaleGenitalOrder(data)
  switch(enums) {
    case Genital.Undefined: return { prompt:"no data", order }
    case Genital.Yes      : return { prompt:"yes"    , order }
    case Genital.Not      : return { prompt:"no"     , order }
    default: return { prompt:"none", order }
  }
}
export const getMalesSize       = (data:number):PromptDataType   => {
  const enums = getGenitalSizeEnum(data)
  const order = getMalesSizeOrder(data)
  switch(enums) {
    case GenitalSize.Undefined: return { prompt:"no data"      , order }
    case GenitalSize.Normal   : return { prompt:"penis"        , order }
    case GenitalSize.Thick    : return { prompt:"thick penis"  , order }
    case GenitalSize.Long     : return { prompt:"long penis"   , order }
    case GenitalSize.Huge     : return { prompt:"huge penis"   , order }
    case GenitalSize.Hyper    : return { prompt:"hyper penis"  , order }
    default: return { prompt:"none", order }
  }
}
export const getPosingData = () => {
  const posingList = [
    "standing" , "sitting"  , "laying on back",
    "bent over", "squatting", "crawling"      ,
    "kneeling" , "crouching", "stretching"    ,
  ]
  const handsList = [
    "hand up"     , "hand on breast", "hand on waist",
    "hand on butt", "hand on knee"  ,
  ]
  const legsList      = [ "knee up"   , "spread legs"   , "lift up leg"  , ]
  const directionList = [ "front shot", "side shot"     , "back shot"    , ]
  const angleList     = [ "-"         , "from above"    , "from below"   , ]
  const posing      = posingList   [randBetween(0,(posingList   .length - 1))]
  const direction   = directionList[randBetween(0,(directionList.length - 1))]
  const angle       = angleList    [randBetween(0,(angleList    .length - 1))]
  const focus       = (randBool()) ? "cowboy shot" : "-"
  const legsOption  = (randBool()) ? legsList [randBetween(0,(legsList .length - 1))] : "-"
  const handsOption = (randBool()) ? handsList[randBetween(0,(handsList.length - 1))] : "-"
  return {
    posing     ,
    direction  ,
    angle      ,
    focus      ,
    legsOption ,
    handsOption,
  } as PosingDetailProps
}
export const getEmotesData = (tiers:number) => {
  const emotes:string[] = []
  const tiersLv = getTiersEnum(tiers)
  const emoteLottery = (list:string[]) => list.sort(()=>0.5-Math.random()).slice(0,randBetween(1,2)).forEach(item=>emotes.push(item));
  switch(tiersLv) {
    case Tiers.Safe : emoteLottery(["no expression","light smile","horny"]);break;
    case Tiers.Nude : emoteLottery(["light smile","smile","looking pleasure","horny","embarrassed"]);break;
    case Tiers.Nasty: emoteLottery(["smile","horny","embarrassed","looking pleasure","surprised","annoyed","panting"]);break;
    case Tiers.Hard : emoteLottery(["horny","embarrassed","looking pleasure","surprised","annoyed","panting","ahegao","panting"]);break;
    default: emotes.push("no expression");break;
  }
  return emotes
}
export const getActionData = (tiers:number) => {
  const actions:string[] = []
  const tiersLv = getTiersEnum(tiers)
  const actionLottery = (list:string[]) => list.sort(()=>0.5-Math.random()).slice(0,1).forEach(item=>actions.push(item));
  switch(tiersLv) {
    case Tiers.Safe : actionLottery(["posing","bouncing"]);break;
    case Tiers.Nude : actionLottery(["posing","bouncing","dancing"]);break;
    case Tiers.Nasty: actionLottery(["bouncing","dancing","masturbation", "spread pussy", "spread anus",]);break;
    case Tiers.Hard : actionLottery(["fucking","blowjob","handjob","paizuri"]);break;
    default: actions.push("posing");break;
  }
  return actions
}