// +=========+=========+=========+=========+=========+=========+=========+=========+=========+=========
// Cons:EnumData
// +=========+=========+=========+=========+=========+=========+=========+=========+=========+=========
// モデル
export const Tiers = {
  Undefined :0, //
  Safe      :1, //Level:1
  Nude      :2, //Level:2
  Nasty     :3, //Level:3
  Hard      :4, //Level:4
} as const;
// BASIS SETTINGS ~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~
// モデル
export const Models = {
  Undefined  :0, //
  Female     :1, //人型（女性）,
  Futanari   :2, //人型（両性）,
  Mesukemo   :3, //獣人（メス）,
  Futakemo   :4, //獣人（両性）,
} as const;
// 時代
export const Period = {
  Undefined  :0,
  PreHistory :1, //先史,
  Ancient    :2, //古代,
  Medieval   :3, //中世,
  OldTimes   :4, //近世近代,
  Nowadays   :5, //現代,
  Future     :6, //未来,
} as const;
// 天候
export const Weather = {
  Undefined :0,
  Sunny     :1, //快晴,
  Cloudy    :2, //曇天,
  Rainy     :3, //雨天,
  Snowy     :4, //降雪,
} as const;
// 時間帯
export const Times = {
  Undefined         :0,
  MorningToSunset   :1, //朝から夕方まで,
  EveningToMidnight :2, //夕から深夜まで,
  NightToDawnBreak  :3, //夜から明方まで,
} as const;

// FACES SETTINGS ~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~
// 見た目
export const Looks = {
  Undefined :0,
  Student   :1, //女子学生
  Adult     :2, //大人びた
  Mature    :3, //成熟した
} as const;
// 性格
export const Personality = {
  Undefined   :0,
  LawGood     :1, //秩序／善良,
  LawCalm     :2, //秩序／中立,
  LawEvil     :3, //秩序／邪悪,
  NeutralGood :4, //中庸／善良,
  NeutralCalm :5, //中庸／中立,
  NeutralEvil :6, //中庸／邪悪,
  ChaosGood   :7, //混沌／善良,
  ChaosCalm   :8, //混沌／中立,
  ChaosEvil   :9, //混沌／邪悪,
} as const;
// 目
export const EyesShape = {
  Undefined :0,
  Narrow    :1, //細目,
  Jitome    :2, //ジト目,
  Tareme    :3, //タレ目,
  Tsurime   :4, //ツリ目,
} as const;
// 髪／前髪の長さ
export const HairSize = {
  Undefined :0,
  Short     :1, //ショート,
  Medium    :2, //ミディアム,
  Long      :3, //ロング,
} as const;
// BODIES SETTINGS ~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~
// 体系タイプ
export const Figure = {
  Undefined :0,
  Normal    :1, //通常,
  Solid     :2, //がっしり,
} as const;
// 体系サイズ
export const FigureSize = {
  Undefined :0,
  Large     :1, //巨乳,細身or肉厚　　　,巨尻,
  Huge      :2, //爆乳,健康的or筋肉質　,爆尻,
  Hyper     :3, //超乳,ぽっちゃりor肥満,超尻,
} as const;
// 生殖器有無
export const Genital = {
  Undefined :0,
  Yes       :1, //あり,
  Not       :2, //なし,
} as const;
// 生殖器サイズ
export const GenitalSize = {
  Undefined :0,
  Normal    :1, //普通,
  Thick     :2, //太い,
  Long      :3, //長い,
  Huge      :4, //巨大,
  Hyper     :5, //超級,
} as const;
// +=========+=========+=========+=========+=========+=========+=========+=========+=========+=========
// Types:EnumData
// +=========+=========+=========+=========+=========+=========+=========+=========+=========+=========
export type TiersTypes       = (typeof Tiers      ) [keyof typeof Tiers     ];
// BASIS SETTINGS ~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~
export type ModelsTypes      = (typeof Models     ) [keyof typeof Models     ];
export type PeriodTypes      = (typeof Period     ) [keyof typeof Period     ];
export type TimesTypes       = (typeof Times      ) [keyof typeof Times      ];
export type WeatherTypes     = (typeof Weather    ) [keyof typeof Weather    ];
// FACES SETTINGS ~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~
export type LooksTypes       = (typeof Looks      ) [keyof typeof Looks      ];
export type PersonalityTypes = (typeof Personality) [keyof typeof Personality];
export type EyesShapeTypes   = (typeof EyesShape  ) [keyof typeof EyesShape  ];
export type HairSizeTypes    = (typeof HairSize   ) [keyof typeof HairSize   ];
// BODIES SETTINGS ~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~
export type FigureTypes      = (typeof Figure     ) [keyof typeof Figure     ];
export type FigureSizeTypes  = (typeof FigureSize ) [keyof typeof FigureSize ];
export type GenitalTypes     = (typeof Genital    ) [keyof typeof Genital    ];
export type GenitalSizeTypes = (typeof GenitalSize) [keyof typeof GenitalSize];
// +=========+=========+=========+=========+=========+=========+=========+=========+=========+=========
// Getter:EnumData
// +=========+=========+=========+=========+=========+=========+=========+=========+=========+=========
export const getTiersEnum       = (enums:number) => Object.values(Tiers      ).includes(enums as TiersTypes      ) ? enums as TiersTypes       : Tiers      .Undefined
// BASIS SETTINGS ~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~
export const getModelEnum       = (enums:number) => Object.values(Models     ).includes(enums as ModelsTypes     ) ? enums as ModelsTypes      : Models     .Undefined
export const getPeriodEnum      = (enums:number) => Object.values(Period     ).includes(enums as PeriodTypes     ) ? enums as PeriodTypes      : Period     .Undefined
export const getTimesEnum       = (enums:number) => Object.values(Times      ).includes(enums as TimesTypes      ) ? enums as TimesTypes       : Times      .Undefined
export const getWeatherEnum     = (enums:number) => Object.values(Weather    ).includes(enums as WeatherTypes    ) ? enums as WeatherTypes     : Weather    .Undefined
// FACES SETTINGS ~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~
export const getLooksEnum       = (enums:number) => Object.values(Looks      ).includes(enums as LooksTypes      ) ? enums as LooksTypes       : Looks      .Undefined
export const getPersonalityEnum = (enums:number) => Object.values(Personality).includes(enums as PersonalityTypes) ? enums as PersonalityTypes : Personality.Undefined
export const getEyesShapeEnum   = (enums:number) => Object.values(EyesShape  ).includes(enums as EyesShapeTypes  ) ? enums as EyesShapeTypes   : EyesShape  .Undefined
export const getHairSizeEnum    = (enums:number) => Object.values(HairSize   ).includes(enums as HairSizeTypes   ) ? enums as HairSizeTypes    : HairSize   .Undefined
// BODIES SETTINGS ~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~
export const getFigureEnum      = (enums:number) => Object.values(Figure     ).includes(enums as FigureTypes     ) ? enums as FigureTypes      : Figure     .Undefined
export const getFigureSizeEnum  = (enums:number) => Object.values(FigureSize ).includes(enums as FigureSizeTypes ) ? enums as FigureSizeTypes  : FigureSize .Undefined
export const getGenitalEnum     = (enums:number) => Object.values(Genital    ).includes(enums as GenitalTypes    ) ? enums as GenitalTypes     : Genital    .Undefined
export const getGenitalSizeEnum = (enums:number) => Object.values(GenitalSize).includes(enums as GenitalSizeTypes) ? enums as GenitalSizeTypes : GenitalSize.Undefined
