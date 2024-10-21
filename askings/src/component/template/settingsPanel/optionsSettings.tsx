import { DividerLine, EdgeLayout, IndentLayout, Layout, LText, MText, PaperLayout, PromptField, SText, ToggleSwitch } from "@/component/atoms"
import { DataListContext } from "@/component/context"
import { DisplayField, LabelText } from "@/component/molecules"
import LABEL_TEXT from "@/const/LABEL_TEXT"
import { randBool } from "@/util"
import { BaseSyntheticEvent, useContext, useEffect, useState } from "react"

const OptionsSettings = (props:{orderSelect:number}) => {
  const { orderSelect } = props
  const [display, setDisplay] = useState(LABEL_TEXT.empty)
  const {dataList, setDataList} = useContext(DataListContext)
  const property = dataList.settingList[orderSelect].optionsProps
  const basis   = property.basis
  const face    = property.face
  const genital = property.genital
  const males   = property.males
  const input   = property.input

  const maleGenitalOrder = males.genital.order
  const maleGenitalCheck = males.genital.prompt === "yes"

  const [basisSimple   , setBasisSimple   ] = useState(basis.simple   )
  const [basisSolo     , setBasisSolo     ] = useState(basis.solo     )
  const [basisCute     , setBasisCute     ] = useState(basis.cute     )
  const [faceRandom    , setFaceRandom    ] = useState(face.random    )
  const [faceWinked    , setFaceWinked    ] = useState(face.winked    )
  const [faceTongue    , setFaceTongue    ] = useState(face.tongue    )
  const [genitalRandom , setGenitalRandom ] = useState(genital.random )
  const [genitalPubHair, setGenitalPubHair] = useState(genital.pubHair)
  const [genitalInverts, setGenitalInverts] = useState(genital.inverts)
  const [malesRandom   , setMalesRandom   ] = useState(males.random   )
  const [malesSheath   , setMalesSheath   ] = useState(males.sheath   )

  const [optionPrompt    , setOptionPrompt    ] = useState(input.optionInput)
  const handleOptionChange = (e:BaseSyntheticEvent) => setOptionPrompt(e.target.value)

  useEffect(()=>{
    if (faceRandom   ) {
      setFaceWinked    (randBool())
      setFaceTongue    (randBool())
    }
  },[ faceRandom, ])
  useEffect(()=>{
    if (genitalRandom) {
      setGenitalPubHair(randBool())
      setGenitalInverts(randBool())
    }
  },[ genitalRandom, ])
  useEffect(()=>{
    if (malesRandom  ) {
      setMalesSheath   (randBool())
    }
  },[ malesRandom, ])
  useEffect(()=>{
    const basisLine   = [
      (basisSimple) ? "simple background" : "",
      (basisSolo  ) ? "solo" : "",
      (basisCute  ) ? "cute" : "",
    ].filter((item)=>item!=="").join(", ")
    const faceLine    = [
      (faceWinked) ? "winking"    : "",
      (faceTongue) ? "tongue out" : "",
    ].filter((item)=>item!=="").join(", ")
    const genitalLine = [
      (genitalPubHair) ? "public hair"    : "",
      (genitalInverts) ? "invert nipples" : "",
    ].filter((item)=>item!=="").join(", ")
    const malesLine   = [
      (malesSheath) ? "sheath penis" : "",
    ].filter((item)=>item!=="").join(", ")
    const additional  = [
      optionPrompt,
    ].filter((item)=>item!=="").join(", ")
    setDisplay([basisLine, faceLine, genitalLine, malesLine, additional,])
    setDataList(prev=>({ ...prev,
      settingList: prev.settingList.map((prevListItem,idx)=>{
        return (idx === orderSelect)
        ? { ...prevListItem,
          optionsProps: { ...prevListItem.optionsProps,
            basis  : { ...prevListItem.optionsProps.basis  ,
              simple:basisSimple,
              solo  :basisSolo  ,
              cute  :basisCute  ,
            },
            face   : { ...prevListItem.optionsProps.face   ,
              random:faceRandom,
              winked:faceWinked,
              tongue:faceTongue,
            },
            genital: { ...prevListItem.optionsProps.genital,
              random :genitalRandom ,
              pubHair:genitalPubHair,
              inverts:genitalInverts,
            },
            males  : { ...prevListItem.optionsProps.males  ,
              random:malesRandom,
              sheath:malesSheath,
            },
            input  : { ...prevListItem.optionsProps.input  ,
              optionInput: optionPrompt,
            },
          }
        } : prevListItem
      })
    }))
  },[
    orderSelect   ,
    setDataList   ,
    basisSimple   ,
    basisSolo     ,
    basisCute     ,
    faceRandom    ,
    faceWinked    ,
    faceTongue    ,
    genitalRandom ,
    genitalPubHair,
    genitalInverts,
    malesRandom   ,
    malesSheath   ,
    optionPrompt  ,
  ])
  return (<Layout vertical>
    <PaperLayout vertical>
      <Layout><LText bold text={"Options Settings"} /></Layout>
      <DividerLine/>
      <Layout><MText bold text={"Basis"  } /></Layout>
      <IndentLayout vertical>
        <EdgeLayout>
          <EdgeLayout ended><ToggleSwitch label={"Simple Background"} value={basisSimple} onChange={()=>setBasisSimple(!basisSimple)}/></EdgeLayout>
          <EdgeLayout ended><ToggleSwitch label={"SOLO"             } value={basisSolo  } onChange={()=>setBasisSolo  (!basisSolo  )}/></EdgeLayout>
          <EdgeLayout ended><ToggleSwitch label={"CUTE"             } value={basisCute  } onChange={()=>setBasisCute  (!basisCute  )}/></EdgeLayout>
        </EdgeLayout>
      </IndentLayout>
      <Layout><MText bold text={"Face"   } /></Layout>
      <IndentLayout vertical>
        <EdgeLayout>
          <EdgeLayout ended><ToggleSwitch label={"Random"      } value={faceRandom} onChange={()=>setFaceRandom(!faceRandom)} /></EdgeLayout>
          <EdgeLayout ended><ToggleSwitch label={"Winking Eyes"} value={faceWinked} onChange={()=>setFaceWinked(!faceWinked)} disabled={faceRandom}/></EdgeLayout>
          <EdgeLayout ended><ToggleSwitch label={"Tongue Out"  } value={faceTongue} onChange={()=>setFaceTongue(!faceTongue)} disabled={faceRandom}/></EdgeLayout>
        </EdgeLayout>
      </IndentLayout>
      <Layout><MText bold text={"Genital"} /></Layout>
      <IndentLayout vertical>
        <EdgeLayout>
          <EdgeLayout ended><ToggleSwitch label={"Random"        } value={genitalRandom } onChange={()=>setGenitalRandom (!genitalRandom )} /></EdgeLayout>
          <EdgeLayout ended><ToggleSwitch label={"Public Hair"   } value={genitalPubHair} onChange={()=>setGenitalPubHair(!genitalPubHair)} disabled={genitalRandom}/></EdgeLayout>
          <EdgeLayout ended><ToggleSwitch label={"Invert Nipples"} value={genitalInverts} onChange={()=>setGenitalInverts(!genitalInverts)} disabled={genitalRandom}/></EdgeLayout>
        </EdgeLayout>
      </IndentLayout>
      <Layout><MText bold text={"Males"  } /></Layout>
      <IndentLayout vertical>
        <EdgeLayout ended>
          <EdgeLayout ended><DividerLine/></EdgeLayout>
          <EdgeLayout ended><DividerLine/></EdgeLayout>
          <EdgeLayout >
            <MText text={"Male Genital:" } bold/>
            <SText text={maleGenitalOrder}     />
          </EdgeLayout>
        </EdgeLayout>
        <EdgeLayout>
          <EdgeLayout ended><ToggleSwitch label={"Random"      } value={malesRandom} onChange={()=>setMalesRandom(!malesRandom)} disabled={!maleGenitalCheck}/></EdgeLayout>
          <EdgeLayout ended><ToggleSwitch label={"Sheath Penis"} value={malesSheath} onChange={()=>setMalesSheath(!malesSheath)} disabled={!maleGenitalCheck||malesRandom}/></EdgeLayout>
          <EdgeLayout ended><DividerLine/></EdgeLayout>
        </EdgeLayout>
      </IndentLayout>
      <DividerLine/>
      <LabelText text={"Additional:"} editable/>
        <IndentLayout><PromptField value={optionPrompt} onChange={handleOptionChange}/></IndentLayout>
      <DividerLine/>
      <DisplayField data={display}/>
    </PaperLayout>
  </Layout>)
}
export default OptionsSettings