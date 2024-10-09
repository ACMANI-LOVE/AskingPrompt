import { Models, Ages, Mind, EyesShape, HairSize, Skin, Figure, FigureSize, Genital, GenitalSize, Period, Times, Weathers } from "./cons_reqEnum";

export type ModelsTypes      = (typeof Models)     [keyof typeof Models     ];
export type AgesTypes        = (typeof Ages)       [keyof typeof Ages       ];
export type MindTypes        = (typeof Mind)       [keyof typeof Mind       ];
export type EyesShapeTypes   = (typeof EyesShape)  [keyof typeof EyesShape  ];
export type HairSizeTypes    = (typeof HairSize)   [keyof typeof HairSize   ];
export type SkinTypes        = (typeof Skin)       [keyof typeof Skin       ];
export type FigureTypes      = (typeof Figure)     [keyof typeof Figure     ];
export type FigureSizeTypes  = (typeof FigureSize) [keyof typeof FigureSize ];
export type GenitalTypes     = (typeof Genital)    [keyof typeof Genital    ];
export type GenitalSizeTypes = (typeof GenitalSize)[keyof typeof GenitalSize];
export type PeriodTypes      = (typeof Period)     [keyof typeof Period     ];
export type TimesTypes       = (typeof Times)      [keyof typeof Times      ];
export type WeathersTypes    = (typeof Weathers)   [keyof typeof Weathers   ];

export type PromptDataType = { prompt:string,   order:string   }
export type PromptListType = { prompt:string[], order:string[] }
export type PromptCmpxType = { prompt:string[], order:string   }

// =========+=========+=========+=========+=========+=========+=========+=========+=========+=========+
export type SpeciesType = {
  type    : number;
  species : string;
};
export type BasicSettings = {
  models  : string;
  species : string;
  skin    : number
};
export type GenitalSettings = {
  maleGenital : string;
  genitalSize : string;
};
export type SituationSettings = {
  period  : string;
  weather : string;
  time    : string;
};
export type FaceDataSettings = {
  face : string;
  eyes : string;
  mind : string;
};
export type HairDataSettings = {
  hairSize  : string;
  bangsSize : string;
};
export type BodyDataSettings = {
  skinType   : string;
  figureType : string;
  bustSize   : string;
  waistSize  : string;
  hipsSize   : string;
  legsSize   : string;
};