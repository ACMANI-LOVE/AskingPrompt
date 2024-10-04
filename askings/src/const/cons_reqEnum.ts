// +=========+=========+=========+=========+=========+=========+=========+=========+=========+=========
// Cons:EnumTypes
// +=========+=========+=========+=========+=========+=========+=========+=========+=========+=========
// model settings ~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~
// モデル
export const Models = {
  Undefined  :0,
  Female     :1,
  Futanari   :2,
  Mesukemo   :3,
  Futakemo   :4,
} as const;

// face settings ~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~
// 顔年齢
export const Ages = {
  Undefined :0,
  Young     :1,
  Adult     :2,
  Mature    :3,
} as const;
// 性格
export const Mind = {
  Undefined   :0,
  LawGood     :1,
  LawCalm     :2,
  LawEvil     :3,
  NeutralGood :4,
  NeutralCalm :5,
  NeutralEvil :6,
  ChaosGood   :7,
  ChaosCalm   :8,
  ChaosEvil   :9,
} as const;
// 目
export const EyesShape = {
  Undefined :0,
  Narrow    :1,
  Jitome    :2,
  Tareme    :3,
  Tsurime   :4,
} as const;

// hair settings ~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~
// 髪／前髪の長さ
export const HairSize = {
  Undefined :0,
  Short     :1,
  Medium    :2,
  Long      :3,
} as const;

// hair settings ~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~
// 肌タイプ
export const Skin = {
  Undefined :0,
  Skiny     :1,
  Furry     :2,
  Scaly     :3,
} as const;
// 体系タイプ
export const Figure = {
  Undefined :0,
  Normal    :1,
  Solid     :2,
} as const;
// 体系サイズ
export const FigureSize = {
  Undefined :0,
  Normal    :1,
  Large     :2,
  Huge      :3,
} as const;

// genital settings ~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~
// 生殖器有無
export const Genital = {
  Undefined :0,
  Yes       :1,
  Not       :2,
} as const;
// 生殖器サイズ
export const GenitalSize = {
  Undefined :0,
  Normal    :1,
  Short     :2,
  Thick     :3,
  Long      :4,
  Huge      :5,
} as const;

// scene settings ~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~
// 時代
export const Period = {
  Undefined  :0,
  PreHistory :1,
  Ancient    :2,
  Medieval   :3,
  OldTimes   :4,
  Nowadays   :5,
  Future     :6,
} as const;
// 時間帯
export const Times = {
  Undefined         :0,
  MorningToSunset   :1,
  EveningToMidnight :2,
  NightToDawnbreak  :3,
} as const;
// 天候
export const Weathers = {
  Undefined :0,
  Sunny     :1,
  Cloudy    :2,
  Rainy     :3,
  Thunder   :4,
  Snowy     :5,
} as const;
