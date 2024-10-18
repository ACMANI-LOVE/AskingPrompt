import { PaperLayout, LText, DividerLine, Layout, IndentLayout, PromptField, SText } from "@/component/atoms"
import { DataListContext } from "@/component/context"
import { DisplayField, LabelText, LabelWithColors, LabelWithOrder, OrderWithColor } from "@/component/molecules"
import { emptyText } from "@/const/const_text"
import { BaseSyntheticEvent, useContext, useEffect, useState } from "react"

const DetailsSettings = (props:{orderSelect:number}) => {
  const { orderSelect } = props
  const {dataList, setDataList} = useContext(DataListContext)
  const property = dataList.settingList[orderSelect].detailsProps
  const order = property.order
  const color = property.color
  const input = property.input

  const [hairPrompt   , setHairPrompt   ] = useState(input.hairColor   )
  const [eyesPrompt   , setEyesPrompt   ] = useState(input.eyesColor   )
  const [genitalPrompt, setGenitalPrompt] = useState(input.genitalColor)
  const [skinPrompt   , setSkinPrompt   ] = useState(input.skinColor   )
  const [outfitPrompt , setOutfitPrompt ] = useState(input.outfitInput )
  const [equipsPrompt , setEquipsPrompt ] = useState(input.equipsInput )

  const handleHairChange    = (e:BaseSyntheticEvent) => setHairPrompt   (e.target.value)
  const handleEyesChange    = (e:BaseSyntheticEvent) => setEyesPrompt   (e.target.value)
  const handleGenitalChange = (e:BaseSyntheticEvent) => setGenitalPrompt(e.target.value)
  const handleSkinChange    = (e:BaseSyntheticEvent) => setSkinPrompt   (e.target.value)
  const handleOutfitChange  = (e:BaseSyntheticEvent) => setOutfitPrompt (e.target.value)
  const handleEquipsChange  = (e:BaseSyntheticEvent) => setEquipsPrompt (e.target.value)

  const [display, setDisplay] = useState([emptyText])

  useEffect(()=>{
    setDisplay([ hairPrompt, eyesPrompt, genitalPrompt, skinPrompt, outfitPrompt, equipsPrompt, ])
    setDataList(prev=>({ ...prev,
      settingList: prev.settingList.map((prevListItem,idx)=>{
        return (idx === orderSelect)
        ? { ...prevListItem,
          detailsProps: { ...prevListItem.detailsProps,
            input: { ...prevListItem.detailsProps?.input,
              hair   :hairPrompt   ,
              eyes   :eyesPrompt   ,
              genital:genitalPrompt,
              skin   :skinPrompt   ,
              outfit :outfitPrompt ,
              equips :equipsPrompt ,
          }}
        } : prevListItem
      })
    }))
  },[
    hairPrompt   ,
    eyesPrompt   ,
    genitalPrompt,
    skinPrompt   ,
    outfitPrompt ,
    equipsPrompt ,
  ])
  return (<Layout vertical>
    <PaperLayout vertical>
      <Layout><LText bold text={"Details Settings"} /></Layout>
      <DividerLine/>
      <IndentLayout vertical>
        <OrderWithColor  label={"Hair Color:"    } code={color.hair   } value={hairPrompt   } onChange={handleHairChange   }/>
        <OrderWithColor  label={"Eyes Color:"    } code={color.eyes   } value={eyesPrompt   } onChange={handleEyesChange   }/>
        <DividerLine/>
        <LabelWithOrder  label={"Skin Order:"    } order={order.skinType}/>
        <LabelWithColors label={"Skin Color:"    } mainOrder={color.skinMain  } subOrder={color.skinSub   }/>
        <IndentLayout><PromptField value={skinPrompt   } onChange={handleSkinChange  }/></IndentLayout>
        <OrderWithColor  label={"Genital Color:" } code={color.genital} value={genitalPrompt} onChange={handleGenitalChange}/>
        <DividerLine/>
        <LabelWithOrder  label={"Outfits Order:" } order={order.outfits }/>
        <LabelWithColors label={"Outfits Color:" } mainOrder={color.outfitMain} subOrder={color.outfitSub }/>
        <IndentLayout><PromptField value={outfitPrompt } onChange={handleOutfitChange}/></IndentLayout>
        <LabelWithOrder  label={"Equips Order:"  } order={order.equips  }/>
        <LabelWithColors label={"Equips Color:"  } mainOrder={color.equipsMain} subOrder={color.equipsSub }/>
        <IndentLayout><PromptField value={equipsPrompt } onChange={handleEquipsChange}/></IndentLayout>
      </IndentLayout>
      <DividerLine/>
      <DisplayField data={display}/>
    </PaperLayout>
  </Layout>)
}
export default DetailsSettings