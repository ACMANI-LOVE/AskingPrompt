// =========+=========+=========+=========+=========+=========+=========+=========+=========+=========+
//
// =========+=========+=========+=========+=========+=========+=========+=========+=========+=========+
export const ORDERS = 7;
export const ITEMS  = 5;
// =========+=========+=========+=========+=========+=========+=========+=========+=========+=========+
const t1emote = [ "no expression", "light smile", "looking pleasure", ]
const t2emote = [ "light smile", "looking pleasure", "smile", "horny", "embarrassed", "panting", "annoyed", ]
const t3emote = [ "horny", "embarrassed", "expected", "panting", "surprised", "ahegao", ]
const t1action = [ "posing", ]
const t2action = [ "posing", "masturbation", "spread pussy", "spread anus",]
const t3action = [ "sex", "blowjob", "handjob", "paizuri" ]
const t1fluid = [ "steamy sweat", "sweat drop", "drool", ]
const t2fluid = [ "precum", "squirt", "pussy juice", "pee" ]
const t3fluid = [ "cum on body", "cum on face", "cum on breast", "bukkake"]
export const Emote  = [t1emote ,t2emote ,t3emote ,]
export const Action = [t1action,t2action,t3action,]
export const Fluids = [t1fluid ,t2fluid ,t3fluid ,]
// =========+=========+=========+=========+=========+=========+=========+=========+=========+=========+
const standingPose = ["standing"      ,"bent over","kneeling"  ,]
const sittingPose  = ["sitting"       ,"squatting","crouching" ,]
const layingPose   = ["laying on back","crawling" ,"stretching",]
export const Posing = [
  ...standingPose,
  ...sittingPose ,
  ...layingPose  ,]
export const Hands = [
  "hand up",
  "hand on breast",
  "hand on waist",
  "hand on butt",
  "hand on knee",]
export const Legs = [
  "knee up",
  "spread legs",
  "lift up leg",]
export const Direction = ["front shot","side shot","back shot",]
export const Angle     = ["-","from above","from below",]
export const Focus     = ["-","cowboy shot",]
// =========+=========+=========+=========+=========+=========+=========+=========+=========+=========+
const HumanRaces = [
  { type: 1, species: 'アジア系' },
  { type: 1, species: 'ヨーロッパ系' },
  { type: 1, species: '褐色系' },
  { type: 1, species: '宇宙人' },
];
const FantasyRaces = [
  { type: 1, species: 'エルフ' },
  { type: 1, species: '妖精' },
  { type: 1, species: '獣耳系' },
  { type: 1, species: '鬼' },
  { type: 1, species: '妖怪' },
];
const MythRaces = [
  { type: 1, species: '女神' },
  { type: 1, species: '天使' },
  { type: 1, species: '魔人' },
  { type: 1, species: '精霊' },
  { type: 1, species: '悪魔' },
];
const NonlifeRaces = [
  { type: 1, species: '幽霊' },
  { type: 1, species: 'ゾンビ' },
  { type: 1, species: '人形' },
  { type: 1, species: 'ゴーレム' },
  { type: 1, species: 'メカ' },
];

const CanineRaces = [
  { type: 2, species: 'イヌ科' },
  { type: 2, species: '犬' },
  { type: 2, species: 'オオカミ' },
  { type: 2, species: 'ハイエナ' },
  { type: 2, species: 'コヨーテ' },
];
const FelineRaces = [
  { type: 2, species: 'ネコ科' },
  { type: 2, species: '猫' },
  { type: 2, species: '狐' },
  { type: 2, species: '虎' },
  { type: 2, species: 'ライオン' },
];
const HorsesRaces = [
  { type: 2, species: 'ウマ科' },
  { type: 2, species: '馬' },
  { type: 2, species: 'キリン' },
  { type: 2, species: 'シマウマ' },
  { type: 2, species: '鹿' },
];
const BovidaeRaces = [
  { type: 2, species: 'ウシ科' },
  { type: 2, species: '牛' },
  { type: 2, species: '山羊' },
  { type: 2, species: '羊' },
];
const MammalRaces = [
  { type: 2, species: '哺乳類動物' },
  { type: 2, species: '熊' },
  { type: 2, species: '兎' },
  { type: 2, species: 'ブタ' },
];
const ScalyRaces = [
  { type: 3, species: '爬虫類' },
  { type: 3, species: '両生類' },
  { type: 3, species: 'ドラゴン' },
  { type: 3, species: '海獣' },
  { type: 3, species: '水棲' },
];
// =========+=========+=========+=========+=========+=========+=========+=========+=========+=========+
export const Humanoids = [
  ...HumanRaces,
  ...FantasyRaces,
  ...MythRaces,
  ...NonlifeRaces];
export const Animaloid = [
  ...CanineRaces,
  ...CanineRaces,
  ...FelineRaces,
  ...FelineRaces,
  ...HorsesRaces,
  ...HorsesRaces,
  ...BovidaeRaces,
  ...BovidaeRaces,
  ...MammalRaces,
  ...ScalyRaces,
  ...ScalyRaces,
  ...ScalyRaces,];
