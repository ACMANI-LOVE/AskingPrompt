import { BaseSyntheticEvent } from "react"
import { BaseLineLayout, ColorDisplay, ConstantIcon, DisplayedIcon, DividerLine, EdgeLayout, EditableIcon, IndentLayout, Layout, MText, PromptField, SText, ToggleSwitch } from "./atoms"

export const LabelText = (props:{text:string, editable?:boolean}) => {
  const { text, editable = false } = props
  return (<BaseLineLayout>
    {(editable) ? <EditableIcon/> : <ConstantIcon/>}
    <MText bold text={text}/>
  </BaseLineLayout>)
}
export const LabelWithOrder = (props:{ label:string, order:string, editable?:boolean}) => {
  const { label, order, editable = false } = props
  return (<EdgeLayout>
    <LabelText text={label} editable={editable}/>
    <Layout><DividerLine noLine/></Layout>
    <Layout><SText text={order}/></Layout>
  </EdgeLayout>)
}
export const LabelWithColors = (props:{ label:string, mainOrder:string, subOrder:string}) => {
  const { label, mainOrder, subOrder } = props
  return (<EdgeLayout>
    <LabelText text={label}/>
    <BaseLineLayout>
      <MText bold text={"[Main]"}/>
      <BaseLineLayout>
        <Layout><SText text={mainOrder}/></Layout>
        <Layout><ColorDisplay code={mainOrder}/></Layout>
      </BaseLineLayout>
    </BaseLineLayout>
    <BaseLineLayout>
      <MText bold text={"[Sub]" }/>
      <BaseLineLayout>
        <Layout><SText text={subOrder }/></Layout>
        <Layout><ColorDisplay code={subOrder }/></Layout>
      </BaseLineLayout>
    </BaseLineLayout>
  </EdgeLayout>)
}
export const LabelWithField = (props:{ label:string, value:string, onChange:(e:BaseSyntheticEvent) => void}) => {
  const { label, value, onChange } = props
  return (<EdgeLayout>
    <LabelText text={label} editable/>
    <Layout><PromptField value={value} onChange={onChange} /></Layout>
  </EdgeLayout>)
}
export const OrderWithPrompt = (props:{ label:string, order:string, prompt:string, editable?:boolean}) => {
  const { label, order, prompt, editable = false } = props
  return (<EdgeLayout>
    <LabelText text={label} editable={editable}/>
    <Layout><SText text={order }/></Layout>
    <Layout><SText text={prompt}/></Layout>
  </EdgeLayout>)
}
export const OrderWithField = (props:{ label:string, order:string, value:string, onChange:(e:BaseSyntheticEvent) => void}) => {
  const { label, order, value, onChange } = props
  return (<EdgeLayout>
    <LabelText text={label} editable/>
    <Layout><SText text={order }/></Layout>
    <Layout><PromptField value={value} onChange={onChange} /></Layout>
  </EdgeLayout>)
}
export const OrderWithColor = (props:{ label:string, code:string, value:string, onChange:(e:BaseSyntheticEvent) => void}) => {
  const { label, code, value, onChange } = props
  return (<EdgeLayout>
    <LabelText text={label} editable/>
    <BaseLineLayout>
      <Layout><ColorDisplay code={code }/></Layout>
      <Layout><SText text={code }/></Layout>
    </BaseLineLayout>
    <Layout><PromptField value={value} onChange={onChange} /></Layout>
  </EdgeLayout>)
}
export const DisplayField = (props:{data:string[]}) => {
  const { data } = props
  return (<Layout vertical>
    <Layout>
      <DisplayedIcon/>
      <MText bold text={"Displayed:"}/>
    </Layout>
    <IndentLayout vertical>{data.map((item,idx)=><SText key={`display${idx}`} text={item}/>)}</IndentLayout>
  </Layout>)
}