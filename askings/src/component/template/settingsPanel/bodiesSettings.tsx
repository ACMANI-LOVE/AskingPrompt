import { PaperLayout, IndentLayout, Layout, LText, DividerLine, MText, PromptField } from "@/component/atoms"
import { DataListContext } from "@/component/context"
import { DisplayField, LabelText, LabelWithField, OrderWithPrompt } from "@/component/molecules"
import { emptyText } from "@/const/const_text"
import { parseNum } from "@/util"
import { BaseSyntheticEvent, useContext, useEffect, useState } from "react"

const BodiesSettings = (props:{orderSelect:number}) => {
  const { orderSelect } = props
  const {dataList, setDataList} = useContext(DataListContext)
  const property = dataList.settingList[orderSelect].bodiesProps
  const body    = property.body
  const genital = property.genital
  const input   = property.input
  const bodyType = parseNum(body.figures.prompt, 2)

  const [bodyOptionPrompt   ,setBodyOptionPrompt   ] = useState(input.bodyOptionInput   )
  const [pussyDetailsPrompt ,setPussyDetailsPrompt ] = useState(input.pussyDetailsInput )
  const [anusDetailsPrompt  ,setAnusDetailsPrompt  ] = useState(input.anusDetailsInput  )
  const [malesDetailsPrompt ,setMalesDetailsPrompt ] = useState(input.malesDetailsInput )
  const [genitalOptionPrompt,setGenitalOptionPrompt] = useState(input.genitalOptionInput)

  const handleBodyOptionChange    = (e:BaseSyntheticEvent) => setBodyOptionPrompt   (e.target.value)
  const handlePussyDetailsChange  = (e:BaseSyntheticEvent) => setPussyDetailsPrompt (e.target.value)
  const handleAnusDetailsChange   = (e:BaseSyntheticEvent) => setAnusDetailsPrompt  (e.target.value)
  const handleMalesDetailsChange  = (e:BaseSyntheticEvent) => setMalesDetailsPrompt (e.target.value)
  const handleGenitalOptionChange = (e:BaseSyntheticEvent) => setGenitalOptionPrompt(e.target.value)

  const [display, setDisplay] = useState([emptyText])

  useEffect(()=>{
    setDisplay([ bodyOptionPrompt, pussyDetailsPrompt, anusDetailsPrompt, malesDetailsPrompt, genitalOptionPrompt, ])
    setDataList(prev=>({ ...prev,
      settingList: prev.settingList.map((prevListItem,idx)=>{
        return (idx === orderSelect)
        ? { ...prevListItem,
          bodiesProps: { ...prevListItem.bodiesProps,
            input: { ...prevListItem.bodiesProps?.input,
              bodyOptionInput   : bodyOptionPrompt   ,
              pussyDetailsInput : pussyDetailsPrompt ,
              anusDetailsInput  : anusDetailsPrompt  ,
              malesDetailsInput : malesDetailsPrompt ,
              genitalOptionInput: genitalOptionPrompt,
          }}
        } : prevListItem
      })
    }))
  },[
    bodyOptionPrompt   ,
    pussyDetailsPrompt ,
    anusDetailsPrompt  ,
    malesDetailsPrompt ,
    genitalOptionPrompt,
  ])

  return (<Layout vertical>
    <PaperLayout vertical>
      <Layout><LText bold text={"Bodies Settings"} /></Layout>
      <DividerLine/>
      <Layout><MText bold text={"Body"   } /></Layout>
      <IndentLayout vertical>
        <OrderWithPrompt label={"Figure Types:"} order={body.figures .order          } prompt={"-"}/>
        <OrderWithPrompt label={"Boob Size:"   } order={body.boobSize.order[bodyType]} prompt={body.boobSize.prompt[bodyType]}/>
        <OrderWithPrompt label={"Body Size:"   } order={body.bodySize.order[bodyType]} prompt={body.bodySize.prompt[bodyType]}/>
        <OrderWithPrompt label={"Butt Size:"   } order={body.buttSize.order[bodyType]} prompt={body.buttSize.prompt[bodyType]}/>
        <DividerLine noLine/>
        <LabelText text={"Bodies Options:" } editable/>
        <IndentLayout><PromptField value={bodyOptionPrompt   } onChange={handleBodyOptionChange   }/></IndentLayout>
      </IndentLayout>
      <DividerLine/>
      <Layout><MText bold text={"Genital"} /></Layout>
      <IndentLayout vertical>
        <LabelWithField  label={"Pussy Details:"} value={pussyDetailsPrompt } onChange={handlePussyDetailsChange}/>
        <LabelWithField  label={"Anus Details:" } value={anusDetailsPrompt  } onChange={handleAnusDetailsChange }/>
        <DividerLine/>
        <OrderWithPrompt label={"Male Genital[MG]:"} order={genital.maleGenital.order} prompt={"-"}/>
        <OrderWithPrompt label={"MGs Size:"        } order={genital.malesSize  .order} prompt={genital.malesSize.prompt}/>
        <LabelWithField  label={"MGs Details:"  } value={malesDetailsPrompt } onChange={handleMalesDetailsChange}/>
        <DividerLine noLine/>
        <LabelText text={"Genital Options:"} editable/>
        <IndentLayout><PromptField value={genitalOptionPrompt} onChange={handleGenitalOptionChange}/></IndentLayout>
      </IndentLayout>
      <DividerLine/>
      <DisplayField data={display}/>
    </PaperLayout>
  </Layout>)
}
export default BodiesSettings