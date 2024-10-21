import { EyesShape, Figure, FigureSize, Genital, GenitalSize, HairSize, Looks, Models, Period, Personality, Tiers, Times, Weather } from "@/const/enum_requests";
// BASIS SETTINGS ~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~
export const getModelOrder = (enums:number) => {
  switch(enums) {
    case Models.Undefined: return "データなし"
    case Models.Female   : return "人型（女性）"
    case Models.Futanari : return "人型（両性）"
    case Models.Mesukemo : return "獣人（メス）"
    case Models.Futakemo : return "獣人（両性）"
    default: return "Invalid"
  }
}
export const getPeriodOrder   = (enums:number  ) => {
  switch(enums) {
    case Period.Undefined : return "データなし"
    case Period.PreHistory: return "先史時代"
    case Period.Ancient   : return "古代時代"
    case Period.Medieval  : return "中世時代"
    case Period.OldTimes  : return "近世近代時代"
    case Period.Nowadays  : return "現代時代"
    case Period.Future    : return "未来時代"
    default: return "Invalid"
  }
}
export const getWeatherOrder = (enums:number) => {
  switch(enums) {
    case Weather.Undefined : return "データなし"
    case Weather.Sunny     : return "快晴"
    case Weather.Cloudy    : return "曇天"
    case Weather.Rainy     : return "雨天"
    case Weather.Snowy     : return "降雪"
    default: return "Invalid"
  }
}
export const getTimesOrder    = (enums:number   ) => {
  switch(enums) {
    case Times.Undefined        : return "データなし"
    case Times.MorningToSunset  : return "朝から夕方まで"
    case Times.EveningToMidnight: return "夕から深夜まで"
    case Times.NightToDawnBreak : return "夜から明方まで"
    default: return "Invalid"
  }
}
// FACES SETTINGS ~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~
export const getLooksOrder     = (enums:number    ) => {
  switch(enums) {
    case Looks.Undefined: return "データなし"
    case Looks.Student  : return "女子学生"
    case Looks.Adult    : return "大人びた"
    case Looks.Mature   : return "成熟した"
    default: return "Invalid"
  }
}
export const getPersonalityOrder = (enums:number) => {
  switch(enums) {
    case Personality.Undefined   : return "データなし"
    case Personality.LawGood     : return "秩序／善良"
    case Personality.LawCalm     : return "秩序／中立"
    case Personality.LawEvil     : return "秩序／邪悪"
    case Personality.NeutralGood : return "中庸／善良"
    case Personality.NeutralCalm : return "中庸／中立"
    case Personality.NeutralEvil : return "中庸／邪悪"
    case Personality.ChaosGood   : return "混沌／善良"
    case Personality.ChaosCalm   : return "混沌／中立"
    case Personality.ChaosEvil   : return "混沌／邪悪"
    default: return "Invalid"
  }
}
export const getEyesShapeOrder   = (enums:number  ) => {
  switch(enums) {
    case EyesShape.Undefined: return "データなし"
    case EyesShape.Narrow   : return "細目"
    case EyesShape.Jitome   : return "ジト目"
    case EyesShape.Tareme   : return "タレ目"
    case EyesShape.Tsurime  : return "ツリ目"
    default: return "Invalid"
  }
}
export const getHairsSizeOrder = (enums:number) =>{
  switch(enums) {
    case HairSize.Undefined: return "データなし"
    case HairSize.Short    : return "ショート"
    case HairSize.Medium   : return "ミディアム"
    case HairSize.Long     : return "ロング"
    default: return "Invalid"
  }
}
export const getBangsSizeOrder = (enums:number) =>{
  switch(enums) {
    case HairSize.Undefined: return "データなし"
    case HairSize.Short    : return "ショート"
    case HairSize.Medium   : return "ミディアム"
    case HairSize.Long     : return "ロング"
    default: return "Invalid"
  }
}
export const getFigureOrder  = (enums:number    ) => {
  switch(enums) {
    case Figure.Undefined: return "データなし"
    case Figure.Normal   : return "通常"
    case Figure.Solid    : return "がっしり"
    default: return "Invalid"
  }
}
export const getBoobSizeOrder = (enums:number) => {
  switch(enums) {
    case FigureSize.Undefined: return "データなし"
    case FigureSize.Large    : return "巨乳"
    case FigureSize.Huge     : return "爆乳"
    case FigureSize.Hyper    : return "超乳"
    default: return "Invalid"
  }
}
export const getBodySizeOrder = (enums:number) => {
  switch(enums) {
    case FigureSize.Undefined: return "データなし"
    case FigureSize.Large    : return "細身or肉厚"
    case FigureSize.Huge     : return "健康的or筋肉質"
    case FigureSize.Hyper    : return "ぽっちゃりor肥満"
    default: return "Invalid"
  }
}
export const getButtSizeOrder = (enums:number) => {
  switch(enums) {
    case FigureSize.Undefined: return "データなし"
    case FigureSize.Large    : return "巨尻"
    case FigureSize.Huge     : return "爆尻"
    case FigureSize.Hyper    : return "超尻"
    default: return "Invalid"
  }
}
export const getMaleGenitalOrder = (enums:number    ) => {
  switch(enums) {
    case Genital.Undefined: return "データなし"
    case Genital.Yes      : return "あり"
    case Genital.Not      : return "なし"
    default: return "Invalid"
  }
}
export const getMalesSizeOrder   = (enums:number) => {
  switch(enums) {
    case GenitalSize.Undefined: return "データなし"
    case GenitalSize.Normal   : return "普通"
    case GenitalSize.Thick    : return "太い"
    case GenitalSize.Long     : return "長い"
    case GenitalSize.Huge     : return "巨大"
    case GenitalSize.Hyper    : return "超級"
    default: return "Invalid"
  }
}
export const getTierOrder   = (enums:number) => {
  switch(enums) {
    case Tiers.Undefined : return "選択無し"
    case Tiers.Safe      : return "Safety"
    case Tiers.Nude      : return "Nudity"
    case Tiers.Nasty     : return "Naughty"
    case Tiers.Hard      : return "Hardcore"
    default: return "Invalid"
  }
}