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
  additionalList: string[];
  promptList    : string[];
}
export interface ActionSettingsProps  {
  nsfw          : boolean;
  actionTier    : number;
  actionsList   : string[];
  additionalList: string[];
  promptList    : string[];
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
