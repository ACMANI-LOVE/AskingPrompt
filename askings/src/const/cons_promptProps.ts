import { AgesTypes, MindTypes, EyesShapeTypes, ModelsTypes, HairSizeTypes, FigureSizeTypes, FigureTypes, SkinTypes, TimesTypes, PeriodTypes, WeathersTypes, GenitalTypes, GenitalSizeTypes } from "./cons_requestTypes";
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
  requestList : string[],
  orderList   : string[],
  promptLabel : string[],
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
  model     : ModelsTypes ;
  character : string ;
  species   : string ;
  base?       : string ;
  nsfw?       : boolean;
  solo?       : boolean;
  cute?       : boolean;
  additional? : string ;
  prompts?    : string ;
}
export interface HairSettingsProps    {
  hairColor  :string;
  hairSize   :HairSizeTypes;
  bangsSize  :HairSizeTypes;
  hairStyle  :string;
  bangsStyle :string;
  hairColorInput?  :string;
  hairStyleInput?  :string;
  bangsStyleInput? :string;
  additional? :string;
  prompts?    :string;
}
export interface FaceSettingsProps    {
  faceLooks   :AgesTypes;
  personalityOrder :MindTypes;
  eyesShapeOrder   :EyesShapeTypes;
  eyesColorOrder   :string;
  eyesColor?  :string;
  random?     :boolean;
  closeEyes?  :boolean;
  openMouth?  :boolean;
  tongueOut?  :boolean;
  additional? :string;
  prompts?    :string;
}
export interface BodySettingsProps    {
  skinTypeOrder :SkinTypes;
  mainBodyColor :string;
  subBodyColor  :string;
  bodyTypeOrder :FigureTypes;
  boobSizeOrder :FigureSizeTypes;
  bodySizeOrder :FigureSizeTypes;
  buttSizeOrder :FigureSizeTypes;
  skinPrompt? :string;
  additional? :string;
  prompts?    :string;
}
export interface SceneSettingsProps   {
  jobOrder         :string;
  outfitOrder      :string;
  itemsOrder       :string;
  mainColorOrder   :string;
  subColorOrder    :string;
  accentColorOrder :string;
  locationOrder    :string;
  periodOrder      :PeriodTypes;
  weatherOrder     :WeathersTypes;
  timesOrder       :TimesTypes;
  simple?     :boolean;
  location?   :string;
  condition?  :string;
  outfit?     :string;
  equip?      :string;
  additional? :string;
  prompts?    :string;
}
export interface GenitalSettingsProps {
  maleGenitalsOrder     :GenitalTypes;
  maleGenitalsSizeOrder :GenitalSizeTypes;
  genitalsColorOrder    :string;
  nsfw?            :boolean;
  random?          :boolean;
  publicHair?      :boolean;
  invertNipple?    :boolean;
  sheathPenis?     :boolean;
  genitalColor?    :string;
  pussyDetails?    :string;
  anusDetails?     :string;
  genitalsDetails? :string;
  additional?      :string;
  prompts?         :string;
}
export interface FluidSettingsProps   {
  nsfw            : boolean;
  fluidTier?      : number;
  fluidsList?     : string[];
  additionalList? : string[];
  promptList?     : string[];
}
export interface EmotionSettingsProps {
  nsfw            : boolean;
  emoteTier?      : number;
  emotesList?     : string[];
  additionalList? : string[];
  promptList?     : string[];
}
export interface ActionSettingsProps  {
  nsfw            : boolean;
  actionTier?     : number;
  actionsList?    : string[];
  additionalList? : string[];
  promptList?     : string[];
}
export interface PosingSettingsProps  {
  posingList: PosingDetailProps[];
  additionalList: string[];
  promptList: string[]; order?:string; optional?:string; prompts?:string 
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
