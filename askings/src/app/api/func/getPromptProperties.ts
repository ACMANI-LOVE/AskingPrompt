import { ITEMS } from "@/init/init"
import { getModelsData, getHairSizeData, getBangsSizeData, getAgesData, getMindData, getEyesShapeData, getSkinData, getFigureData, getBoobSizeData, getBodySizeData, getButtSizeData, getPeriodData, getTimesData, getWeatherData, getGenitalData, getGenitalSizeData, getRandomPosingData } from "./getPropertyData"
import { convertJsonStrings } from "@/util"
import { BasisSettingsProps, FacesSettingsProps, BodiesSettingsProps, DetailsSettingsProps, OptionsSettingsProps, PromptsSettingsProps, SummaryPromptType } from "@/const/cons_promptProps"

const getPromptProperties = (props:{order?:string}) => {
  const emptyStrings = "- empty -"
  const initialNSFW = true
  const emptyList = Array.from({length:ITEMS},()=>"")
  const data = convertJsonStrings(props.order ?? "{}") as any
  const otherInfo = data?.OTHER_INFO ?? undefined
  const charaInfo = data?.CHARA_INFO ?? undefined

  const basisProps: BasisSettingsProps = {
    basis: {
      story    : "",
      jobs     : "",
      model    : "",
      character: "",
      species  : "",
    },
    scene: {
      period : { order:"", prompt:"", },
      weather: { order:"", prompt:"", },
      times  : { order:"", prompt:"", },
      locate : "",
    },
    input: {
      basisInput : "",
      locateInput: ""
    }
  }
  const facesProps: FacesSettingsProps =  {
    face: {
      looking    : { order:"", prompt:"", },
      personality: { order:"", prompt:"", },
      eyesShape  : { order:"", prompt:"", },
    },
    hair: {
      hairsSize : { order:"", prompt:"", },
      bangsSize : { order:"", prompt:"", },
      hairsStyle: "",
      bangsStyle: "",
    },
    input: {
      faceOptionInput: "",
      hairsStyleInput: "",
      bangsStyleInput: "",
      hairOptionInput: ""
    }
  }
  const bodiesProps: BodiesSettingsProps =  {
    body: {
      figures : { prompt: "none", order: "なし" },
      boobSize: { prompt: ["none1","none2","invalid"], order: ["なし","なし","無効"] },
      bodySize: { prompt: ["none1","none2","invalid"], order: ["なし","なし","無効"] },
      buttSize: { prompt: ["none1","none2","invalid"], order: ["なし","なし","無効"] }
    },
    genital: {
      maleGenital: { prompt: "none", order: "なし" },
      malesSize  : { prompt: "none", order: "なし" }
    },
    input: {
      bodyOptionInput   : "",
      pussyDetailsInput : "",
      anusDetailsInput  : "",
      malesDetailsInput : "",
      genitalOptionInput: ""
    }
  }
  const detailsProps: DetailsSettingsProps =  {
    order: {
      skinType: "",
      outfits : "",
      equips  : ""
    },
    color: {
      hair      : "#1debca",
      eyes      : "#2cfad9",
      skinMain  : "#3b10e8",
      skinSub   : "#3b10e8",
      outfitMain: "#4a29f7",
      outfitSub : "#4a29f7",
      equipsMain: "#503816",
      equipsSub : "#694725",
      genital   : "#785634"
    },
    input: {
      hairColor   : "",
      eyesColor   : "",
      skinColor   : "",
      genitalColor: "",
      outfitInput : "",
      equipsInput : "",
    }
  }
  const optionsProps: OptionsSettingsProps = {
    basis: {
      simple: true,
      solo  : true,
      cute  : true
    },
    face: {
      random: false,
      winked: false,
      tongue: false
    },
    genital: {
      random : false,
      pubHair: false,
      inverts: false
    },
    males: {
      genital: { prompt: "none", order: "なし" },
      random : false,
      sheath : false
    },
    input: {
      optionInput: ""
    }
  }
  const promptsProps: PromptsSettingsProps = {
    promptTier: 0,
    posingList: [],
    emotesList: [],
    actionList: [],
    promptList: []
  }
// +---------+---------+---------+---------+---------+---------+---------+---------+---------+---------
  return {
    basisProps,
    facesProps,
    bodiesProps,
    optionsProps,
    promptsProps,
    detailsProps,
  } as SummaryPromptType
}

export default getPromptProperties