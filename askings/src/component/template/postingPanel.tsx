import { BaseSyntheticEvent, useState } from "react"
import { CheckBoxes, DividerLine, EdgeLayout, IndentLayout, Layout, LText, MText, PaperLayout, SText, ToggleSwitch } from "../atoms"
import { LabelText, LabelWithField, LabelWithOrder } from "../molecules"

const PostingPanel = () => {
  const [jpTitle , setJPTitle ] = useState("")
  const [enTitle , setENTitle ] = useState("")
  const [symbol  , setSymbol  ] = useState("")
  const [category, setCategory] = useState("")
  const [picSize , setPicSize ] = useState("")
  const [url     , setURL     ] = useState("")
  const [NSFW    , setNSFW    ] = useState(false)
  const handleJPTitleChange  = (e:BaseSyntheticEvent) => setJPTitle (e.target.value)
  const handleENTitleChange  = (e:BaseSyntheticEvent) => setENTitle (e.target.value)
  const handleSymbolChange   = (e:BaseSyntheticEvent) => setSymbol  (e.target.value)
  const handleCategoryChange = (cate:string) => setCategory(cate)
  const handlePicSizeChange  = (e:BaseSyntheticEvent) => setPicSize (e.target.value)
  const handleURLChange      = (e:BaseSyntheticEvent) => setURL     (e.target.value)
  const handleNsfwChange     = (chk:boolean) => setNSFW(chk)
  return (<Layout center vertical>
      <Layout center>
        <PaperLayout vertical>
          <Layout><ToggleSwitch label={"NSFW:"} value={NSFW} onChange={()=>handleNsfwChange(!NSFW)}/></Layout>
          <DividerLine/>
          <Layout vertical>
            <EdgeLayout>
              <EdgeLayout size={3} ended><LabelWithField label={"Title(JP)"    } value={jpTitle} onChange={handleJPTitleChange}></LabelWithField></EdgeLayout>
              <EdgeLayout size={3} ended><LabelWithField label={"Title(EN)"    } value={enTitle} onChange={handleENTitleChange}></LabelWithField></EdgeLayout>
              <EdgeLayout size={2} ended><LabelWithField label={"EMOJI"        } value={symbol } onChange={handleSymbolChange }></LabelWithField></EdgeLayout>
            </EdgeLayout>
            <EdgeLayout>
              <EdgeLayout size={3} ended><LabelWithField label={"Pic Size"     } value={picSize} onChange={handlePicSizeChange}></LabelWithField></EdgeLayout>
              <EdgeLayout size={5} ended><LabelWithField label={"Patreon URL"  } value={url    } onChange={handleURLChange    }></LabelWithField></EdgeLayout>
            </EdgeLayout>
          </Layout>
          <DividerLine/>
          <EdgeLayout>
            <LabelText editable text={"Category:"}/>
            <EdgeLayout ended><CheckBoxes label={"Fems:"} value={category==="NSFW"          } onChange={()=>handleCategoryChange("NSFW"          )}/></EdgeLayout>
            <EdgeLayout ended><CheckBoxes label={"Furr:"} value={category==="Furry"         } onChange={()=>handleCategoryChange("Furry"         )}/></EdgeLayout>
            <EdgeLayout ended><CheckBoxes label={"Futa:"} value={category==="Futanari"      } onChange={()=>handleCategoryChange("Futanari"      )}/></EdgeLayout>
            <EdgeLayout ended><CheckBoxes label={"F&Fs:"} value={category==="Furry&Futanari"} onChange={()=>handleCategoryChange("Furry&Futanari")}/></EdgeLayout>
          </EdgeLayout>
          <DividerLine/>
          <LText bold text={"POST(PATREON):"}/>
          <LabelWithOrder label={"Title(JP):"} order={`${jpTitle}${symbol}${(NSFW)?"(NSFW)":"(SFW)"}`}/>
          <LabelWithOrder label={"Title(EN):"} order={`${enTitle}${symbol}${(NSFW)?"(NSFW)":"(SFW)"}`}/>
          <LabelWithOrder label={"FileName:" } order={enTitle.replace(" ","_")}/>
          <DividerLine/>
          <LText bold text={"POST(PIXIV):"}/>
          <LabelText text={"TITLE:"}/>
          <IndentLayout><IndentLayout>
            <SText bold text={`${jpTitle}${symbol}${enTitle}${(NSFW)?"(NSFW)":"(SFW)"}\n`}/>
          </IndentLayout></IndentLayout>
          <LabelText text={"DESC:"}/>
          <IndentLayout><IndentLayout>
            <SText bold text={
              `${jpTitle}${symbol}${enTitle}${(NSFW)?"(NSFW)":"(SFW)"}\n`+
              `\n`+
              `${jpTitle}${symbol}${enTitle}${(NSFW)?"(NSFW)":"(SFW)"}\n`+
              `more ${(NSFW)?"Free":category} contents [${picSize}pic] here! → Patreon:${url}\n`+
              `----\n`+
              `\n`+
              `Please support me! if you like~💛\n`+
              `X(twitter): https://x.com/ACMANI_LOVE\n`+
              `Patreon: https://patreon.com/EyesOpenMaiND\n`+
              `☕: https://buymeacoffee.com/acmani_love\n`+
              `----\n`+
              `\n`+
              `(JP)よければ、いいね、フォロー、コメントをよろしくお願いします！\n`+
              `(EN)Please like, follow and comment if you like!\n`+
              `(KR)마음에 드신다면 좋아요, 팔로우, 댓글 부탁드립니다!\n`+
              `(繁)喜歡的話請按讚、追蹤、留言吧！\n`+
              `(簡)如果喜欢请点赞、关注、评论！\n`+
              `----\n`
            }/>
          </IndentLayout></IndentLayout>
          <DividerLine/>
        </PaperLayout>
      </Layout>
  </Layout>)
}
export default PostingPanel