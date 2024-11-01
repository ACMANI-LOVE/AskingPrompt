import { BaseSyntheticEvent, useState } from "react"
import { BaseLineLayout, CheckBoxes, DividerLine, EdgeLayout, IndentLayout, Layout, LText, PaperLayout, SText } from "../atoms"
import { LabelText, LabelWithField, LabelWithOrder } from "../molecules"

const PostingPanel = () => {
  const [jpTitle , setJPTitle ] = useState("")
  const [enTitle , setENTitle ] = useState("")
  const [symbol  , setSymbol  ] = useState("")
  const [category, setCategory] = useState("")
  const [postType, setPostType] = useState("")
  const [picSize , setPicSize ] = useState("")
  const [url     , setURL     ] = useState("")
  const handleJPTitleChange  = (e:BaseSyntheticEvent) => setJPTitle (e.target.value)
  const handleENTitleChange  = (e:BaseSyntheticEvent) => setENTitle (e.target.value)
  const handleSymbolChange   = (e:BaseSyntheticEvent) => setSymbol  (e.target.value)
  const handlePostTypeChange = (post:string) => setPostType(post)
  const handleCategoryChange = (cate:string) => setCategory(cate)
  const handlePicSizeChange  = (e:BaseSyntheticEvent) => setPicSize (e.target.value)
  const handleURLChange      = (e:BaseSyntheticEvent) => setURL     (e.target.value)
  return (<Layout center vertical>
    <PaperLayout>
      <Layout vertical>
        <Layout><LText bold text={"POST(Entry):"}/></Layout>
        <Layout><LabelWithField label={"Title(JP)"    } value={jpTitle} onChange={handleJPTitleChange}></LabelWithField></Layout>
        <Layout><LabelWithField label={"Title(EN)"    } value={enTitle} onChange={handleENTitleChange}></LabelWithField></Layout>
        <EdgeLayout>
          <Layout size={2}><LabelWithField label={"Pic Size"     } value={picSize} onChange={handlePicSizeChange}></LabelWithField></Layout>
          <Layout size={1}><LabelWithField label={"EMOJI"        } value={symbol } onChange={handleSymbolChange }></LabelWithField></Layout>
        </EdgeLayout>
        <DividerLine/>
        <Layout><LabelWithField label={"Patreon URL"  } value={url    } onChange={handleURLChange    }></LabelWithField></Layout>
        <DividerLine/>
        <BaseLineLayout>
          <LabelText editable text={"PostType:"}/>
          <Layout><DividerLine/></Layout>
          <Layout><CheckBoxes label={"SOFT:"   } value={postType==="SOFT"   } onChange={()=>handlePostTypeChange("SOFT"   )}/></Layout>
          <Layout><CheckBoxes label={"HARD:"   } value={postType==="HARD"   } onChange={()=>handlePostTypeChange("HARD"   )}/></Layout>
          <Layout><CheckBoxes label={"Preview:"} value={postType==="Preview"} onChange={()=>handlePostTypeChange("Preview")}/></Layout>
        </BaseLineLayout>
        <BaseLineLayout>
          <LabelText editable text={"Category:"}/>
          <Layout><CheckBoxes label={"Fems:"} value={category==="NSFW"          } onChange={()=>handleCategoryChange("NSFW"          )}/></Layout>
          <Layout><CheckBoxes label={"Furr:"} value={category==="Furry"         } onChange={()=>handleCategoryChange("Furry"         )}/></Layout>
          <Layout><CheckBoxes label={"Futa:"} value={category==="Futanari"      } onChange={()=>handleCategoryChange("Futanari"      )}/></Layout>
          <Layout><CheckBoxes label={"F&Fs:"} value={category==="Furry&Futanari"} onChange={()=>handleCategoryChange("Furry&Futanari")}/></Layout>
        </BaseLineLayout>
        <DividerLine/>
        <Layout><LText bold text={"POST(PATREON):"}/></Layout>
        <Layout><LabelWithOrder label={"Title(JP):"} order={`${jpTitle}${symbol}(${postType})`}/></Layout>
        <Layout><LabelWithOrder label={"Title(EN):"} order={`${enTitle}${symbol}(${postType})`}/></Layout>
        <Layout><LabelWithOrder label={"FileName:" } order={enTitle.toLowerCase().split(" ").map(
          word => word.charAt(0).toUpperCase() + word.slice(1)
        ).join("_")+`_${postType}`}/></Layout>
      </Layout>
      <Layout size={0}>
      <DividerLine vertical/>
      </Layout>
      <Layout vertical>
        <LText bold text={"POST(PIXIV):"}/>
        <LabelText text={"TITLE:"}/>
        <IndentLayout><IndentLayout>
          <SText bold text={`${jpTitle}${symbol}${enTitle}(${postType})\n`}/>
        </IndentLayout></IndentLayout>
        <LabelText text={"DESC:"}/>
        <IndentLayout><IndentLayout>
          <SText bold text={
            `${jpTitle}${symbol}${enTitle}(${postType})\n`+
            `\n`+
            `${jpTitle}${symbol}${enTitle}(${postType})\n`+
            `more ${category} contents [${picSize}pic] here! → Patreon:${url}\n`+
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
      </Layout>
    </PaperLayout>
  </Layout>)
}
export default PostingPanel