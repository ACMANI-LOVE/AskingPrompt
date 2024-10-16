"use client"
import { Box, createTheme, CssBaseline, Divider, ThemeProvider } from "@mui/material";
import { ReactNode, useContext, useEffect } from "react";
import useTabGroup from "@/component/organs/tabGroup";
import { ContextProvider, SelectContext } from "@/component/context";
import AskingPanel from "@/component/template/askingPanel";
import MakingPanel from "@/component/template/makingPanel";
import { titleHeader } from "@/const/const_text";
import { Layout, TText } from "@/component/atoms/atoms";

export default function Home() {
  const {selection, setSelection} = useContext(SelectContext)

  const panelList = [
    { label:"Asking Prompts", panel:<AskingPanel/> },
    { label:"Making Prompts", panel:<MakingPanel/> },
    { label:"PostingManager", panel:<AskingPanel/> },
  ]
  const PanelContent = () => panelList[selectMenuTab].panel
  const menuLabel = panelList.map((item)=>item.label)

  const [MenuTab,selectMenuTab] = useTabGroup({ initial: selection.menuSelect, labelList: menuLabel })

  useEffect(()=>setSelection(prev=>({ ...prev, menuSelect: selectMenuTab })),[selectMenuTab,setSelection])

  const theme = createTheme({
    palette: { mode:"dark" }
  })
  return (<ThemeProvider theme={theme}>
    <CssBaseline/>
    <ContextProvider>
    <Layout vertical>
      <Layout center><TText text={titleHeader}/></Layout>
      <Layout center><Divider/></Layout>
      <Layout center><MenuTab/></Layout>
      <Layout center><PanelContent/></Layout>
    </Layout>
    </ContextProvider>
  </ThemeProvider>);
}
