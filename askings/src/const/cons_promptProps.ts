import { PromptDataType, PromptCmpxType, PromptListType } from "./cons_requestTypes";
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
// Settings Properties _fix
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
    looking    :PromptDataType
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
    boobSize:PromptListType
    bodySize:PromptListType
    buttSize:PromptListType
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
    skinColor   :string
    genitalColor:string
    outfitInput:string
    equipsInput:string
  }
}
export interface PromptsSettingsProps{
  promptTier:number
  posingList:PosingDetailProps[]
  emotesList:string[]
  actionList:string[]
  promptList:string[]
}
// +~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~

export interface PosingDetailProps {
  posing   : string;
  hands    : string;
  legs     : string;
  direction: string;
  angle    : string;
  focus    : string;
}
