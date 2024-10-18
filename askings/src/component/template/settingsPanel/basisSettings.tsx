import { DividerLine, IndentLayout, Layout, LText, MText, PaperLayout, PromptField, SText } from "@/component/atoms"
import { DataListContext } from "@/component/context"
import { DisplayField, LabelText, LabelWithOrder, OrderWithPrompt } from "@/component/molecules"
import { emptyText } from "@/const/const_text"
import { BaseSyntheticEvent, useContext, useEffect, useState } from "react"

const BasisSettings = (props:{orderSelect:number}) => {
  const { orderSelect } = props
  const {dataList, setDataList} = useContext(DataListContext)
  const property = dataList.settingList[orderSelect].basisProps
  const basis = property.basis
  const scene = property.scene
  const input = property.input

  const [basisPrompt , setBasisPrompt ] = useState(input.basisInput )
  const [locatePrompt, setLocatePrompt] = useState(input.locateInput)

  const handleBasisChange  = (e:BaseSyntheticEvent) => setBasisPrompt (e.target.value)
  const handleLocateChange = (e:BaseSyntheticEvent) => setLocatePrompt(e.target.value)

  const [display, setDisplay] = useState([emptyText])

  useEffect(()=>{
    setDisplay([ basisPrompt , locatePrompt, ])
    setDataList(prev=>({ ...prev,
      settingList: prev.settingList.map((prevListItem,idx)=>{
        return (idx === orderSelect)
        ? { ...prevListItem,
          basisProps: { ...prevListItem.basisProps,
            input: { ...prevListItem.basisProps?.input,
              basisInput : basisPrompt ,
              locateInput: locatePrompt,
          }}
        } : prevListItem
      })
    }))
  },[
    basisPrompt ,
    locatePrompt,
  ])

  return (<Layout vertical>
    <PaperLayout vertical>
      <Layout><LText bold text={"Basis Settings"} /></Layout>
      <DividerLine/>
      <Layout><MText bold text={"Basis"} /></Layout>
      <IndentLayout vertical>
        <LabelText text={"Story Idea:"}/>
        <IndentLayout><SText text={basis.story}/></IndentLayout>
        <DividerLine/>
        <LabelWithOrder label={"Model Theme:"    } order={basis.model    }/>
        <LabelWithOrder label={"Character Order:"} order={basis.character}/>
        <LabelWithOrder label={"Species Detail:" } order={basis.species  }/>
        <LabelWithOrder label={"Her Jobs:"       } order={basis.jobs     }/>
        <DividerLine noLine/>
        <LabelText text={"Basis Prompts:"} editable/>
        <IndentLayout><PromptField value={basisPrompt } onChange={handleBasisChange }/></IndentLayout>
      </IndentLayout>
      <DividerLine/>
      <Layout><MText bold text={"Scenes"} /></Layout>
      <IndentLayout vertical>
        <OrderWithPrompt label={"Period:" } order={scene.period .order} prompt={scene.period .prompt}/>
        <OrderWithPrompt label={"Weather:"} order={scene.weather.order} prompt={scene.weather.prompt}/>
        <OrderWithPrompt label={"Times:"  } order={scene.times  .order} prompt={scene.times  .prompt[0]}/>
        <DividerLine noLine/>
        <LabelWithOrder label={"Location:"} order={scene.locate} editable/>
        <IndentLayout><PromptField value={locatePrompt} onChange={handleLocateChange}/></IndentLayout>
      </IndentLayout>
      <DividerLine/>
      <DisplayField data={display}/>
    </PaperLayout>
  </Layout>)
}
export default BasisSettings