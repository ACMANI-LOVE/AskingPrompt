// +=========+=========+=========+=========+=========+=========+=========+=========+=========+=========
// Contexts Properties
// +=========+=========+=========+=========+=========+=========+=========+=========+=========+=========
export interface SelectionType {
  menuSelect    : number,
  requestSelect : number,
  orderSelect   : number,
  settingSelect : number,
}
export interface DataListType {
  promptList   : string[],
  requestList  : string[],
  orderList    : string[],
  settingList  : SummaryPromptType[],
}
export interface SummaryPromptType {
  basisProps  : BasisSettingsProps  ,
  facesProps  : FacesSettingsProps  ,
  bodiesProps : BodiesSettingsProps ,
  optionsProps: OptionsSettingsProps,
  detailsProps: DetailsSettingsProps,
  promptsProps: PromptsSettingsProps,
}

// +=========+=========+=========+=========+=========+=========+=========+=========+=========+=========
// Orders Properties
// +=========+=========+=========+=========+=========+=========+=========+=========+=========+=========
export interface PromptDataType   { prompt:string,   order:string   }
export interface BodyDataSettings {
  skinType   : string;
  figureType : string;
  bustSize   : string;
  waistSize  : string;
  hipsSize   : string;
  legsSize   : string;
};
export interface BasisOrders   {
  basisSettings: {
    story    : string,
    jobs     : string,
    model    : number,
    character: string,
    species  : string,
    locate   : string,
    outfit   : string,
    equips   : string,
  },
  sceneSettings: {
    period : number,
    weather: number,
    times  : number,
  }
}
export interface FacesOrders   {
  facesSettings: {
    looks    : number,
    personality: number,
    eyesShape  : number,
  },
  hairsSettings: {
    hairsSize  : number,
    bangsSize  : number,
    hairsStyle : string,
    bangsStyle : string,
  },
}
export interface BodiesOrders  {
  bodiesSettings: {
    skinType: number,
    figures : number,
    boobSize: number,
    bodySize: number,
    buttSize: number,
  },
  genitalSettings: {
    maleGenital: number,
    malesSize  : number,
  },
}
export interface DetailsOrders {
  ordersData: {
    skinType: string,
    outfits : string,
    equips  : string,
  }
  colorsData: {
    randomColorAlpha    : string,
    randomColorBeta     : string,
    randomColorGamma1   : string,
    randomColorGamma2   : string,
    randomColorDelta1   : string,
    randomColorDelta2   : string,
    randomColorEpsilon1 : string,
    randomColorEpsilon2 : string,
    randomColorZeta     : string,
  }
}
export interface OptionsOrders {
  optionSettings: {
    maleGenital: number
  }
}
// +=========+=========+=========+=========+=========+=========+=========+=========+=========+=========
// Settings Properties
// +=========+=========+=========+=========+=========+=========+=========+=========+=========+=========
export interface BasisSettingsProps  {
  basis: {
    model    :string
    character:string
    species  :string
    story    :string
    jobs     :string
  }
  scene: {
    period :PromptDataType
    weather:PromptDataType
    times  :PromptDataType
    locate :string
  },
  input:{
    basisInput :string
    locateInput:string
  }
}
export interface FacesSettingsProps  {
  face: {
    looks    :PromptDataType
    personality:PromptDataType
    eyesShape  :PromptDataType
  }
  hair: {
    hairsSize :PromptDataType
    bangsSize :PromptDataType
    hairsStyle:string
    bangsStyle:string
  },
  input:{
    faceOptionInput:string
    hairsStyleInput:string
    bangsStyleInput:string
    hairOptionInput:string
  }
}
export interface BodiesSettingsProps {
  body: {
    figures :PromptDataType
    boobSize:PromptDataType
    bodySize:PromptDataType
    buttSize:PromptDataType
  }
  genital: {
    maleGenital:PromptDataType
    malesSize  :PromptDataType
  }
  input:{
    bodyOptionInput   :string
    pussyDetailsInput :string
    anusDetailsInput  :string
    malesDetailsInput :string
    genitalOptionInput:string
  }
}
export interface OptionsSettingsProps{
  basis:{
    simple:boolean
    solo  :boolean
    cute  :boolean
  }
  face:{
    random:boolean
    winked:boolean
    tongue:boolean
  }
  genital:{
    random :boolean
    pubHair:boolean
    inverts:boolean
  }
  males:{
    genital:PromptDataType
    random :boolean
    sheath :boolean
  }
  input:{
    optionInput:string
  }
}
export interface DetailsSettingsProps {
  order:{
    skinType:string
    outfits :string
    equips  :string
  },
  color:{
    hair      :string
    eyes      :string
    skinMain  :string
    skinSub   :string
    outfitMain:string
    outfitSub :string
    equipsMain:string
    equipsSub :string
    genital   :string
  }
  input:{
    hairColor   :string
    eyesColor   :string
    skinInput   :string
    genitalColor:string
    outfitInput :string
    equipsInput :string
  }
}
export interface PromptsSettingsProps{
  additional:string
  promptTier:number
  posingList:PosingDetailProps[]
  emotesList:string[][]
  actionList:string[][]
  promptList:string[]
}
// +~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~

export interface PosingDetailProps {
  posing     : string;
  direction  : string;
  angle      : string;
  focus      : string;
  legsOption : string;
  handsOption: string;
}
