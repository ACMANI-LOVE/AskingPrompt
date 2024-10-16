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
  baseProps   : BaseSettingsProps   ,
  hairProps   : HairSettingsProps   ,
  faceProps   : FaceSettingsProps   ,
  bodyProps   : BodySettingsProps   ,
  sceneProps  : SceneSettingsProps  ,
  genitalProps: GenitalSettingsProps,
  fluidProps  : FluidSettingsProps  ,
  emotionProps: EmotionSettingsProps,
  posingProps : PosingSettingsProps ,
  actionProps : ActionSettingsProps ,
}
// +=========+=========+=========+=========+=========+=========+=========+=========+=========+=========
// Settings Properties _fix
// +=========+=========+=========+=========+=========+=========+=========+=========+=========+=========
export interface BasisSettingsProps  {
  basis: {
    story    :string
    model    :string
    character:string
    species  :string
  }
  scene: {
    period :string
    weather:string
    times  :string
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
    hairsStyle:PromptDataType
    bangsStyle:PromptDataType
  },
  input:{
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
    ButtSize:PromptListType
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
    maleGenital:string
    random:boolean
    sheath:boolean
  }
  input:{
    optionInput:string
  }
}
export interface ColorsSettingsProps {
  order:{
    hair   :string
    eyes   :string
    skin   :string
    outfit :string
    eqMain :string
    eqSub  :string
    genital:string
  }
  input:{
    hair   :string
    eyes   :string
    skin   :string
    outfit :string
    equips :string
    genital:string
  }
}
export interface PromptsSettingsProps{
  promptTier:number
  posingList:PosingDetailProps[]
  emotesList:string[]
  actionList:string[]
  promptList:string[]
}
// +=========+=========+=========+=========+=========+=========+=========+=========+=========+=========
// Settings Properties
// +=========+=========+=========+=========+=========+=========+=========+=========+=========+=========
export interface BaseSettingsProps    {
  story     : string ;
  model     : string ;
  character : string ;
  species   : string ;
  base      : string ;
  nsfw      : boolean;
  solo      : boolean;
  cute      : boolean;
  additional: string ;
  prompts   : string ;
}
export interface HairSettingsProps    {
  hairColor  :string;
  hairSize   :PromptDataType;
  bangsSize  :PromptDataType;
  hairStyle  :string;
  bangsStyle :string;
  hairColorPrompt :string;
  hairStylePrompt :string;
  bangsStylePrompt:string;
  additional     :string;
  prompts        :string;
}
export interface FaceSettingsProps    {
  eyesColor   :string;
  faceLooks   :PromptDataType;
  personality :PromptDataType;
  eyesShape   :PromptDataType;
  eyesColorPrompt:string;
  random         :boolean;
  closeEyes      :boolean;
  openMouth      :boolean;
  tongueOut      :boolean;
  additional     :string;
  prompts        :string;
}
export interface BodySettingsProps    {
  skinType :PromptDataType;
  bodyType :PromptDataType;
  mainBodyColor :string;
  subBodyColor  :string;
  boobSize :PromptListType;
  bodySize :PromptListType;
  buttSize :PromptListType;
  skinPrompt :string;
  additional :string;
  prompts    :string;
}
export interface SceneSettingsProps   {
  job         :string;
  outfit      :string;
  items       :string;
  location    :string;
  mainColor   :string;
  subColor    :string;
  accentColor :string;
  period      :PromptDataType;
  weather     :PromptDataType;
  times       :PromptCmpxType;
  simple        :boolean;
  locationPrompt:string;
  outfitPrompt  :string;
  condition     :string;
  equip         :string;
  additional    :string;
  prompts       :string;
}
export interface GenitalSettingsProps {
  maleGenitals     :PromptDataType;
  maleGenitalsSize :PromptDataType;
  genitalsColor    :string;
  nsfw           :boolean;
  random         :boolean;
  publicHair     :boolean;
  invertNipple   :boolean;
  sheathPenis    :boolean;
  genitalColor   :string;
  pussyDetails   :string;
  anusDetails    :string;
  genitalsDetails:string;
  additional     :string;
  prompts        :string;
}
export interface FluidSettingsProps   {
  nsfw          : boolean;
  fluidTier     : number;
  fluidsList    : string[];
  additionalList: string[];
  promptList    : string[];
}
export interface EmotionSettingsProps {
  nsfw          : boolean;
  emoteTier     : number;
  emotesList    : string[];
  additional: string[];
  promptList    : string[];
}
export interface ActionSettingsProps  {
  nsfw          : boolean;
  actionTier    : number;
  actionsList   : string[];
  additionalList: string[];
  promptList    : string[];
  posingList    : PosingDetailProps[];
}
export interface PosingSettingsProps  {
  posingList    : PosingDetailProps[];
  additionalList: string[];
  promptList    : string[];
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
