import { PaperLayout, LText, DividerLine, MText, IndentLayout, PromptField, Layout, SText } from "@/component/atoms"
import { DataListContext } from "@/component/context"
import { LabelText, DisplayField } from "@/component/molecules"
import LABEL_TEXT from "@/const/LABEL_TEXT"
import { useState, useContext } from "react"

const PromptsSettings = (props:{orderSelect:number}) => {
  const { orderSelect } = props
  const [display, setDisplay] = useState(LABEL_TEXT.empty)
  const {dataList, setDataList} = useContext(DataListContext)
  const basis   = dataList.settingList[orderSelect].basisProps
  const faces   = dataList.settingList[orderSelect].facesProps
  const bodies  = dataList.settingList[orderSelect].bodiesProps
  const options = dataList.settingList[orderSelect].optionsProps
  const colors  = dataList.settingList[orderSelect].detailsProps
  const prompts = dataList.settingList[orderSelect].promptsProps
  const basisPrompt = [
    (options.basis.cute) ? "CUTE" : "",
    (options.basis.solo) ? "SOLO" : "",
    basis.input.basisInput
  ].filter((item)=>item!=="").join(", ")

  return (<Layout vertical>
    <PaperLayout vertical>
      <Layout><LText bold text={"Options Settings"} /></Layout>
      <DividerLine/>
      <Layout><MText bold text={"Production Tier"}/></Layout>
      <IndentLayout vertical>
        <SText text={basisPrompt}></SText>
        <SText text={""}></SText>
      </IndentLayout>
      <DividerLine/>
      <LabelText text={"Additional:"} editable/>

      <DividerLine/>
      <DisplayField data={display}/>
    </PaperLayout>
  </Layout>)
}
export default PromptsSettings