"use client"
import { Box, createTheme, CssBaseline, Divider, ThemeProvider } from "@mui/material";
import { useContext, useEffect } from "react";
import useTabGroup from "@/component/organs/tabGroup";
import { TitleText } from "@/component/atoms/text";
import { ContextProvider, SelectContext } from "@/component/context";
import AskingPanel from "@/component/template/askingPanel";
import MakingPanel from "@/component/template/makingPanel";
import { titleHeader } from "@/const/const_text";

export default function Home() {
  const {selection, setSelection} = useContext(SelectContext)

  const panelList = [
    { label:"AskingPrompts", panel:<AskingPanel/> },
    { label:"MakingPrompts", panel:<MakingPanel/> },
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
      <Box display={"flex"} flexDirection={"column"} gap={"0.5em"}>
        <Box display={"flex"} justifyContent={"center"}>
          <TitleText text={titleHeader}/>
        </Box>
        <Divider/>
        <MenuTab/>
        {panelList[selectMenuTab].panel}
      </Box>
    </ContextProvider>
  </ThemeProvider>);
}