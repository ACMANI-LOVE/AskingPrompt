"use client"
import { createTheme, CssBaseline, Divider, Grid2 as Grid, ThemeProvider } from "@mui/material";
import { useContext, useEffect } from "react";
import useTabGroup from "@/component/organs/tabGroup";
import { TText } from "@/component/atoms/text";
import { ContextProvider, SelectContext } from "@/component/context";
import AskingPanel from "@/component/template/askingPanel";
import MakingPanel from "@/component/template/makingPanel";
import { titleHeader } from "@/const/const_text";

export default function Home() {
  const {selection, setSelection} = useContext(SelectContext)

  const panelList = [
    { label:"AskingPrompts", panel:<AskingPanel/> },
    { label:"MakingPrompts", panel:<MakingPanel/> },
    { label:"AskingPrompts", panel:<AskingPanel/> },
  ]

  const [MenuTab,selectMenuTab] = useTabGroup({
    initial: selection.menuSelect,
    labelList: panelList.map((item)=>item.label)
  })

  const theme = createTheme({
    palette: { mode:"dark" }
  })

  useEffect(()=>setSelection(prev=>({ ...prev, menuSelect: selectMenuTab })),[selectMenuTab,setSelection])

  return (<ThemeProvider theme={theme}>
    <CssBaseline/>
    <ContextProvider>
      <Grid size={12} container justifyContent={"center"} padding={"0.5em"}><TText text={titleHeader}/></Grid>
      <Grid size={12} padding={"0.5em"}><Divider/></Grid>
      <Grid size={12} padding={"0.5em"}><MenuTab/></Grid>
      <Grid size={12} padding={"0.5em"}>{panelList[selectMenuTab].panel}</Grid>
    </ContextProvider>
  </ThemeProvider>);
}

