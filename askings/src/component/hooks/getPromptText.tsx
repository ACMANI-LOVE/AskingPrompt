import { Tiers } from "@/const/enum_requests"
import LABEL_TEXT from "@/const/LABEL_TEXT"
import { randBool } from "@/util"
import { useContext } from "react"
import { DataListContext } from "../context"

const useGetPromptText = (props:{ init:string[], orderSelect:number, promptSelect:number, tier:number }) => {
  const { init, orderSelect, promptSelect, tier } = props
  const { dataList } = useContext(DataListContext)
  const basis   = dataList.settingList[orderSelect].basisProps
  const faces   = dataList.settingList[orderSelect].facesProps
  const bodies  = dataList.settingList[orderSelect].bodiesProps
  const options = dataList.settingList[orderSelect].optionsProps
  const colors  = dataList.settingList[orderSelect].detailsProps
  const prompts = dataList.settingList[orderSelect].promptsProps
  const basisLine     = [
    (tier===Tiers.Safe ) ? "safe content, safety" : "NSFW",
    (options.basis.solo) ? "SOLO" : "",
    (options.basis.cute) ? "CUTE" : "",
    basis.input.basisInput,
  ].filter(item=>item!=="").join(", ")
  const facesLine = [
    faces.face.looks      .prompt,
    faces.face.personality.prompt,
    (colors.input.eyesColor) ? `${colors.input.eyesColor} eyes` : "",
    faces.face.eyesShape  .prompt,
    (options.face.winked) ? "winking"    : "",
    (options.face.tongue) ? "tongue out" : "",
    faces.input.faceOptionInput,
  ].filter(item=>item!=="").join(", ")
  const hairsLine = [
    (colors.input.hairColor) ? `${colors.input.hairColor} hair` : "",
    faces.hair.hairsSize.prompt,
    faces.input.hairsStyleInput,
    faces.hair.bangsSize.prompt,
    faces.input.bangsStyleInput,
    faces.input.hairOptionInput,
  ].filter(item=>item!=="").join(", ")
  const bodiesLine = [
    (colors.input.skinInput) ? colors.input.skinInput : "",
    bodies.body.boobSize.prompt,
    bodies.body.bodySize.prompt,
    bodies.body.buttSize.prompt,
    bodies.body.figures .prompt,
    bodies.input.bodyOptionInput,
  ].filter(item=>item!=="").join(", ")
  const genitalLine = [
    (colors.input.genitalColor && tier !== Tiers.Safe) ? `${colors.input.genitalColor} nipples` : "no nipples",
    (colors.input.genitalColor && tier !== Tiers.Safe) ? `${colors.input.genitalColor} pussy`   : "",
    (tier !== Tiers.Safe) ? bodies.input.pussyDetailsInput : "",
    (colors.input.genitalColor && tier !== Tiers.Safe) ? `${colors.input.genitalColor} anus`    : "",
    (tier !== Tiers.Safe) ? bodies.input.anusDetailsInput  : "",
    (options.genital.pubHair && tier !== Tiers.Safe) ? "public hair"    : "",
    (options.genital.inverts && tier !== Tiers.Safe) ? "invert nipples" : "",
    bodies.input.genitalOptionInput,
    (options.males.genital.prompt==="yes") ? [
      (colors.input.genitalColor && tier !== Tiers.Safe) ? `${colors.input.genitalColor} penis` : "",
      (colors.input.genitalColor && tier !== Tiers.Safe) ? `${colors.input.genitalColor} glans` : "",
      (tier !== Tiers.Safe) ? `${bodies.genital.malesSize.prompt} penis` : `${bodies.genital.malesSize.prompt} bulge`,
      (tier !== Tiers.Safe) ? bodies.input.malesDetailsInput  : "",
      (tier !== Tiers.Safe && options.males.sheath) ? "sheath penis" : "",
    ].filter(item=>item!=="").join(", ") : "",
    bodies.input.genitalOptionInput,
  ].filter(item=>item!=="").join(", ")
  const fluidsLine = [
    (tier === Tiers.Safe ) ? [
      (randBool()) ? "sweat drops" : "",
      (randBool()) ? "drool"       : "",
    ].filter(item=>item!=="").join(", ") : "",
    (tier === Tiers.Nude ) ? [
      (randBool()) ? "sweat drops" : "",
      (randBool()) ? "steamy sweat": "",
      (randBool()) ? "drool"       : "",
    ].filter(item=>item!=="").join(", ") : "",
    (tier === Tiers.Nasty) ? [
      (randBool()) ? "drool"       : "",
      (randBool()) ? "pussy juice" : "",
      (randBool()) ? "squirt" : "pee" + " splash",
    ].filter(item=>item!=="").join(", ") : "",
    (tier === Tiers.Hard ) ? [
      (randBool()) ? "drool"       : "",
      "excessive cum, cum drops, cum clumps, bukkake",
      (randBool()) ? "cum on breast"     : "",
      (randBool()) ? "cum on face"       : "",
      (randBool()) ? "cum on everywhere" : "",
    ].filter(item=>item!=="").join(", ") : "",
  ].filter(item=>item!=="").join(", ")
  const emotesLine = prompts.emotesList[promptSelect].filter(item=>item!=="").join(", ")
  const actionLine = prompts.actionList[promptSelect].filter(item=>item!=="").join(", ")
  const situationLine = [
    (tier===Tiers.Safe )
      ? ((randBool()) ? "dressed" : "undressing")
      : ((randBool()) ? "nude"    : "undressing"),
    (colors.input.outfitInput) ? colors.input.outfitInput : "",
    (colors.input.equipsInput) ? colors.input.equipsInput : "",
    (options.basis.simple) ? "simple background" : "",
    (options.basis.simple) ? "" : basis.scene.period .prompt,
    (options.basis.simple) ? "" : basis.scene.times  .prompt,
    (options.basis.simple) ? "" : basis.scene.weather.prompt,
    (options.basis.simple) ? "" : basis.input.locateInput   ,
    options.input.optionInput,
    prompts.additional,
  ].filter(item=>item!=="").join(", ")
  const posingLine = Object.values(prompts.posingList[promptSelect]).map(v=>v).filter(item=>item!=="-").join(", ")
  const summaryPrompts = init.map((prev,idx)=>(idx===promptSelect)
  ? [
      LABEL_TEXT.promptHeader,
      basisLine    ,
      facesLine    ,
      hairsLine    ,
      bodiesLine   ,
      genitalLine  ,
      fluidsLine   ,
      situationLine,
      emotesLine,
      actionLine,
      posingLine,
      LABEL_TEXT.promptFooter,
  ].filter(item=>item!=="").join(",\n") : prev)

  return { summaryPrompts }
}

export default useGetPromptText