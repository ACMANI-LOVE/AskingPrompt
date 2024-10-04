"use client"
import { Box, Divider } from "@mui/material";
import { useContext, useEffect } from "react";
import useTabGroup from "@/component/organs/tabGroup";
import { TitleText } from "@/component/atoms/text";
import { SelectContext } from "@/component/context";
import AskingPanel from "@/component/template/askingPanel";
import MakingPanel from "@/component/template/makingPanel";

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
  useEffect(()=>setSelection(prev=>({...prev, menuSelect:selectMenuTab})),[selectMenuTab, setSelection])

  return (
    <Box display={"flex"} flexDirection={"column"} gap={"0.5em"}>
      <Box display={"flex"} justifyContent={"center"}>
        <TitleText text={"this"}/>
      </Box>
      <Divider/>
      <MenuTab/>
      {panelList[selectMenuTab].panel}
    </Box>);
}