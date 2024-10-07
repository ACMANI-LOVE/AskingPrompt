// =========+=========+=========+=========+=========+=========+=========+=========+=========+=========+
//
// =========+=========+=========+=========+=========+=========+=========+=========+=========+=========+
export const ORDERS = 7;
export const ITEMS  = 5;
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
  { type: 0, species: 'アジア系' },
  { type: 0, species: 'ヨーロッパ系' },
  { type: 0, species: '褐色系' },
  { type: 0, species: '宇宙人' },
];
const FantasyRaces = [
  { type: 0, species: 'エルフ' },
  { type: 0, species: '妖精' },
  { type: 0, species: '獣耳系' },
  { type: 0, species: '鬼' },
  { type: 0, species: '妖怪' },
];
const MythRaces = [
  { type: 0, species: '女神' },
  { type: 0, species: '天使' },
  { type: 0, species: '魔人' },
  { type: 0, species: '精霊' },
  { type: 0, species: '悪魔' },
];
const NonlifeRaces = [
  { type: 0, species: '幽霊' },
  { type: 0, species: 'ゾンビ' },
  { type: 0, species: '人形' },
  { type: 0, species: 'ゴーレム' },
  { type: 0, species: 'メカ' },
];

const CanineRaces = [
  { type: 1, species: 'イヌ科' },
  { type: 1, species: '犬' },
  { type: 1, species: 'オオカミ' },
  { type: 1, species: 'ハイエナ' },
  { type: 1, species: 'コヨーテ' },
];
const FelineRaces = [
  { type: 1, species: 'ネコ科' },
  { type: 1, species: '猫' },
  { type: 1, species: '狐' },
  { type: 1, species: '虎' },
  { type: 1, species: 'ライオン' },
];
const HorsesRaces = [
  { type: 1, species: 'ウマ科' },
  { type: 1, species: '馬' },
  { type: 1, species: 'キリン' },
  { type: 1, species: 'シマウマ' },
  { type: 1, species: '鹿' },
];
const BovidaeRaces = [
  { type: 1, species: 'ウシ科' },
  { type: 1, species: '牛' },
  { type: 1, species: '山羊' },
  { type: 1, species: '羊' },
];
const MammalRaces = [
  { type: 1, species: '哺乳類動物' },
  { type: 1, species: '熊' },
  { type: 1, species: '兎' },
  { type: 1, species: 'ブタ' },
];
const ScalyRaces = [
  { type: 2, species: '爬虫類' },
  { type: 2, species: '両生類' },
  { type: 2, species: 'ドラゴン' },
  { type: 2, species: '海獣' },
  { type: 2, species: '水棲' },
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
