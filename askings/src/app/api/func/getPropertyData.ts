// +=========+=========+=========+=========+=========+=========+=========+=========+=========+=========
// Cons:Switches
// +=========+=========+=========+=========+=========+=========+=========+=========+=========+=========
// base settings ~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~
import { PosingDetailProps } from "@/const/cons_promptProps"
import { Models, Ages, Mind, EyesShape, HairSize, Genital, GenitalSize, Skin, Figure, FigureSize, Period, Times, Weathers } from "@/const/cons_reqEnum"
import { ModelsTypes, PromptDataType, AgesTypes, MindTypes, EyesShapeTypes, HairSizeTypes, GenitalTypes, GenitalSizeTypes, SkinTypes, FigureTypes, FigureSizeTypes, PromptListType, PeriodTypes, TimesTypes, PromptCmpxType, WeathersTypes } from "@/const/cons_requestTypes"
import { Posing, Hands, Legs, Direction, Angle, Focus, Emote, Fluids, Action } from "@/init/init"
import { lotteryList, randBetween, randBool } from "@/util"

// 顔年齢
export const getModelsData = (props:{ enums:ModelsTypes}):PromptDataType => {
  switch(props.enums) {
    case Models.Female    : return { prompt:"", order:"人型（女性）"}
    case Models.Futanari  : return { prompt:"", order:"人型（両性）"}
    case Models.Mesukemo  : return { prompt:"", order:"獣人（メス）"}
    case Models.Futakemo  : return { prompt:"", order:"獣人（両性）"}
    default: return { prompt: "none", order:"無効" }
  }
}
// face settings ~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~
// 顔年齢
export const getAgesData = (props:{ enums:AgesTypes}):PromptDataType => {
  switch(props.enums) {
    case Ages.Young : return { prompt:"young face" , order:"若々しい" }
    case Ages.Adult : return { prompt:"adult face" , order:"年頃の"   }
    case Ages.Mature: return { prompt:"mature face", order:"成熟した" }
    default: return { prompt: "none", order:"無効" }
  }
}
// 性格
export const getMindData = (props:{ enums:MindTypes}):PromptDataType => {
  switch(props.enums) {
    case Mind.LawGood    : return { prompt:"intelligent face", order:"秩序／善良" }
    case Mind.LawCalm    : return { prompt:"innocent face"   , order:"秩序／中立" }
    case Mind.LawEvil    : return { prompt:"mysterious face" , order:"秩序／邪悪" }
    case Mind.NeutralGood: return { prompt:"friendly face"   , order:"中庸／善良" }
    case Mind.NeutralCalm: return { prompt:"kindly face"     , order:"中庸／中立" }
    case Mind.NeutralEvil: return { prompt:"naughty face"    , order:"中庸／邪悪" }
    case Mind.ChaosGood  : return { prompt:"confident face"  , order:"混沌／善良" }
    case Mind.ChaosCalm  : return { prompt:"crazy face"      , order:"混沌／中立" }
    case Mind.ChaosEvil  : return { prompt:"evil face"       , order:"混沌／邪悪" }
    default: return { prompt: "none", order:"無効" }
  }
}
// 目
export const getEyesShapeData = (props:{ enums:EyesShapeTypes}):PromptDataType => {
  switch(props.enums) {
    case  EyesShape.Narrow : return { prompt:"narrow eyes", order:"細目"   }
    case  EyesShape.Jitome : return { prompt:"jitome"     , order:"ジト目" }
    case  EyesShape.Tareme : return { prompt:"tareme"     , order:"タレ目" }
    case  EyesShape.Tsurime: return { prompt:"tsurime"    , order:"ツリ目" }
    default: return { prompt: "none", order:"無効" }
  }
}
// hair settings ~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~
// 髪の長さ
export const getHairSizeData = (props:{ enums:HairSizeTypes}):PromptDataType => {
  switch(props.enums) {
    case HairSize.Short : return { prompt:"short hair" , order:"ショート"   }
    case HairSize.Medium: return { prompt:"medium hair", order:"ミディアム" }
    case HairSize.Long  : return { prompt:"long hair"  , order:"ロング"     }
    default: return { prompt: "none", order:"無効" }
  }
}
// 前髪の長さ
export const getBangsSizeData = (props:{ enums:HairSizeTypes}):PromptDataType => {
  switch(props.enums) {
    case HairSize.Short : return { prompt:"short bangs" , order:"ショート"   }
    case HairSize.Medium: return { prompt:"medium bangs", order:"ミディアム" }
    case HairSize.Long  : return { prompt:"long bangs"  , order:"ロング"     }
    default: return { prompt: "none", order:"無効" }
  }
}

// genital settings ~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~
// 生殖器有無
export const getGenitalData = (props:{ enums:GenitalTypes}):PromptDataType => {
  switch(props.enums) {
    case Genital.Yes: return { prompt:"yes", order:"あり" }
    case Genital.Not: return { prompt:"no" , order:"なし" }
    default: return { prompt: "none", order:"無効" }
  }
}
// 生殖器サイズ
export const getGenitalSizeData = (props:{ enums:GenitalSizeTypes}):PromptDataType => {
  switch(props.enums) {
    case GenitalSize.Normal: return { prompt:""     , order:"普通" }
    case GenitalSize.Short : return { prompt:"short", order:"短小" }
    case GenitalSize.Thick : return { prompt:"thick", order:"根太" }
    case GenitalSize.Long  : return { prompt:"long" , order:"長竿" }
    case GenitalSize.Huge  : return { prompt:"huge" , order:"巨大" }
    default: return { prompt: "none", order:"無効" }
  }
}

// hair settings ~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~
// 肌タイプ
export const getSkinData = (props:{ enums:SkinTypes}):PromptDataType => {
  switch(props.enums) {
    case Skin.Skiny: return { prompt:"", order:"人肌" }
    case Skin.Furry: return { prompt:"", order:"毛皮" }
    case Skin.Scaly: return { prompt:"", order:"鱗肌" }
    default: return { prompt: "none", order:"無効" }
  }
}
// 体系タイプ
export const getFigureData = (props:{ enums:FigureTypes}):PromptDataType => {
  switch(props.enums) {
    case Figure.Normal: return { prompt:"0", order:"通常"     }
    case Figure.Solid : return { prompt:"1", order:"がっしり" }
    default: return { prompt: "2", order:"無効" }
  }
}
// 体系サイズ
export const getBoobSizeData = (props:{ enums:FigureSizeTypes}):PromptListType => {
  switch(props.enums) {
    case FigureSize.Normal: return { prompt:[""            ,"saggy breast"              ,""], order:["普通","普通"] }
    case FigureSize.Large : return { prompt:["large breast","saggy breast, large breast",""], order:["巨乳","巨乳"] }
    case FigureSize.Huge  : return { prompt:["huge breast" ,"saggy breast, huge breast" ,""], order:["爆乳","爆乳"] }
    default: return { prompt: ["none1","none2","invalid"], order:["なし","なし","無効"] }
  }
}
export const getBodySizeData = (props:{ enums:FigureSizeTypes}):PromptListType => {
  switch(props.enums) {
    case FigureSize.Normal: return { prompt:["slim body"   ,"thick body" ,""], order:["細身","肉厚"]       }
    case FigureSize.Large : return { prompt:["healthy body","muscle body",""], order:["健康的","筋肉質"]   }
    case FigureSize.Huge  : return { prompt:["plump body"  ,"chubby body",""], order:["ぽっちゃり","肥満"] }
    default: return { prompt: ["none1","none2","invalid"], order:["なし","なし","無効"] }
  }
}
export const getButtSizeData = (props:{ enums:FigureSizeTypes}):PromptListType => {
  switch(props.enums) {
    case FigureSize.Normal: return { prompt:[""          ,"thick butt"            ,""], order:["普通","普通"] }
    case FigureSize.Large : return { prompt:["large butt","thick butt, large butt",""], order:["巨尻","巨尻"] }
    case FigureSize.Huge  : return { prompt:["huge butt" ,"thick butt, huge butt" ,""], order:["爆尻","爆尻"] }
    default: return { prompt: ["none1","none2","invalid"], order:["なし","なし","無効"] }
  }
}

// scene settings ~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~
// 時代
export const getPeriodData = (props:{ enums:PeriodTypes}):PromptDataType => {
  switch(props.enums) {
    case Period.PreHistory: return { prompt: "pre-history", order: "先史時代" }
    case Period.Ancient   : return { prompt: "ancient"    , order: "古代"     }
    case Period.Medieval  : return { prompt: "medieval"   , order: "中世"     }
    case Period.OldTimes  : return { prompt: "old times"  , order: "近世近代" }
    case Period.Nowadays  : return { prompt: "none"           , order: "現代"     }
    case Period.Future    : return { prompt: "the future" , order: "未来"     }
    default: return { prompt: "none", order:"無効" }
  }
}
// 時間帯
export const getTimesData = (props:{ enums:TimesTypes}):PromptCmpxType => {
  switch(props.enums) {
    case Times.MorningToSunset  : return  { prompt:["morning" ,"sunset"], order:"午前から夕方まで" }
    case Times.EveningToMidnight: return  { prompt:["evening" ,"night" ], order:"夕刻から深夜まで" }
    case Times.NightToDawnbreak : return  { prompt:["midnight","dawn"  ], order:"夜中から明方まで" }
    default: return { prompt: ["",""], order:"無効" }
  }
}
// 天候
export const getWeatherData = (props:{ enums:WeathersTypes}):PromptDataType => {
  switch(props.enums) {
    case Weathers.Sunny   : return { prompt: "none"           , order: "晴天" }
    case Weathers.Cloudy  : return { prompt: "cloudy sky" , order: "曇天" }
    case Weathers.Rainy   : return { prompt: "rainy sky"  , order: "雨天" }
    case Weathers.Thunder : return { prompt: "thunder sky", order: "雷雨" }
    case Weathers.Snowy   : return { prompt: "snowy sky"  , order: "降雪" }
    default: return { prompt: "none", order:"無効" }
  }
}

// emotion settings ~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~
export const getRandomEmotionData = (tierLv:number):string => lotteryList(Emote [tierLv-1],randBetween(1,2)).filter((item)=>item!=="").join(", ")
export const getRandomActionData  = (tierLv:number):string => lotteryList(Action[tierLv-1]).filter((item)=>item!=="").join(", ")
export const getRandomFluidsData  = (tierLv:number):string => lotteryList(Fluids[tierLv-1],randBetween(1,2)).filter((item)=>item!=="").join(", ")
// posing settings ~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~
export const getRandomPosingData = ():PosingDetailProps => {
  return {
    posing   : Posing[randBetween(0,(Posing.length - 1))],
    hands    : (randBool()) ? Hands[randBetween(0,(Hands.length - 1))] : "-",
    legs     : (randBool()) ? Legs [randBetween(0,(Legs .length - 1))] : "-",
    direction: Direction[randBetween(0,(Direction.length - 1))],
    angle    : Angle[randBetween(0,(Angle.length - 1))],
    focus    : Focus[randBetween(0,(Focus.length - 1))],
  }
}