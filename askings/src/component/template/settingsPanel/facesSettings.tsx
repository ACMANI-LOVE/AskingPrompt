import { DividerLine, IndentLayout, Layout, LText, MText, PaperLayout, PromptField } from "@/component/atoms"
import { DataListContext } from "@/component/context"
import { DisplayField, LabelText, OrderWithField, OrderWithPrompt } from "@/component/molecules"
import { emptyText } from "@/const/const_text"
import { BaseSyntheticEvent, useContext, useEffect, useState } from "react"

const FacesSettings = (props:{orderSelect:number}) => {
  const { orderSelect } = props
  const {dataList, setDataList} = useContext(DataListContext)
  const property = dataList.settingList[orderSelect].facesProps
  const face  = property.face
  const hair  = property.hair
  const input = property.input

  const [faceOptionPrompt, setFaceOptionPrompt] = useState(input.faceOptionInput)
  const [hairsStylePrompt, setHairsStylePrompt] = useState(input.hairsStyleInput)
  const [bangsStylePrompt, setBangsStylePrompt] = useState(input.bangsStyleInput)
  const [hairOptionPrompt, setHairOptionPrompt] = useState(input.hairOptionInput)

  const handleFaceOptionChange = (e:BaseSyntheticEvent) => setFaceOptionPrompt(e.target.value)
  const handleHairsStyleChange = (e:BaseSyntheticEvent) => setHairsStylePrompt(e.target.value)
  const handleBangsStyleChange = (e:BaseSyntheticEvent) => setBangsStylePrompt(e.target.value)
  const handleHairOptionChange = (e:BaseSyntheticEvent) => setHairOptionPrompt(e.target.value)

  const [display, setDisplay] = useState([emptyText])

  useEffect(()=>{
    setDisplay([ faceOptionPrompt, hairsStylePrompt, bangsStylePrompt, hairOptionPrompt, ])
    setDataList(prev=>({ ...prev,
      settingList: prev.settingList.map((prevListItem,idx)=>{
        return (idx === orderSelect)
        ? { ...prevListItem,
          facesProps: { ...prevListItem.facesProps,
            input: { ...prevListItem.facesProps?.input,
              faceOptionInput: faceOptionPrompt,
              hairsStyleInput: hairsStylePrompt,
              bangsStyleInput: bangsStylePrompt,
              hairOptionInput: hairOptionPrompt,
          }}
        } : prevListItem
      })
    }))
  },[
    faceOptionPrompt,
    hairsStylePrompt,
    bangsStylePrompt,
    hairOptionPrompt,
  ])

  return (<Layout vertical>
    <PaperLayout vertical>
      <Layout><LText bold text={"Faces Settings"} /></Layout>
      <DividerLine/>
      <Layout><MText bold text={"Face"} /></Layout>
      <IndentLayout vertical>
        <OrderWithPrompt label={"Model Theme:"    } order={face.looking    .order} prompt={face.looking    .prompt}/>
        <OrderWithPrompt label={"Character Order:"} order={face.personality.order} prompt={face.personality.prompt}/>
        <OrderWithPrompt label={"Species Detail:" } order={face.eyesShape  .order} prompt={face.eyesShape  .prompt}/>
        <DividerLine noLine/>
        <LabelText text={"Faces Options:"} editable/>
        <IndentLayout><PromptField value={faceOptionPrompt} onChange={handleFaceOptionChange}/></IndentLayout>
      </IndentLayout>
      <DividerLine/>
      <Layout><MText bold text={"Hair"} /></Layout>
      <IndentLayout vertical>
        <OrderWithPrompt label={"Hair Size:" } order={hair.hairsSize.order} prompt={hair.hairsSize.prompt}/>
        <OrderWithField label={"Hair style:" } order={hair.hairsStyle} value={hairsStylePrompt} onChange={handleHairsStyleChange} />
        <DividerLine/>
        <OrderWithPrompt label={"Bangs Size:"} order={hair.bangsSize.order} prompt={hair.bangsSize.prompt}/>
        <OrderWithField label={"Bangs style:"} order={hair.bangsStyle} value={bangsStylePrompt} onChange={handleBangsStyleChange} />
        <DividerLine/>
        <LabelText text={"Hair Options:" } editable/>
        <IndentLayout><PromptField value={hairOptionPrompt} onChange={handleHairOptionChange}/></IndentLayout>
      </IndentLayout>
      <DisplayField data={display}/>
    </PaperLayout>
  </Layout>)
}
export default FacesSettings
