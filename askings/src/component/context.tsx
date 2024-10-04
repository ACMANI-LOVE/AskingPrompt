"use client"
import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";
import usePromptProperties from "@/hooks/usePromptProperties";
import getRequestPrompt from "@/hooks/useRequestPrompt";
import { DataListType, SelectionType, SummaryPromptType } from "@/const/cons_promptProps";
// +=========+=========+=========+=========+=========+=========+=========+=========+=========+=========
// Contexts
// +=========+=========+=========+=========+=========+=========+=========+=========+=========+=========
export const SelectContext = createContext<{
  selection    : SelectionType,
  setSelection : Dispatch<SetStateAction<SelectionType>>,
}>({
  selection: {
    menuSelect   : 0,
    requestSelect: 0,
    orderSelect  : 0,
    settingSelect: 0
  },
  setSelection: ()=>{}
})

export const DataListContext = createContext<{
  dataList    : DataListType,
  setDataList : Dispatch<SetStateAction<DataListType>>,
}>({
  dataList: {
    requestList : [],
    orderList   : [],
    promptLabel  : [],
  },
  setDataList: ()=>{}
})
export const SummaryPromptContext = createContext<{
  summaryPrompt    : SummaryPromptType,
  setSummaryPrompt : Dispatch<SetStateAction<SummaryPromptType>>,
}>({
  summaryPrompt: {} as SummaryPromptType,
  setSummaryPrompt: ()=>{}
})
// +=========+=========+=========+=========+=========+=========+=========+=========+=========+=========
// Provider
// +=========+=========+=========+=========+=========+=========+=========+=========+=========+=========
export const ContextProvider = (props:{children:ReactNode}) => {
  // ----- Selection State -----
  const [selection, setSelection] = useState<SelectionType>({
    menuSelect    : 0,
    requestSelect : 0,
    orderSelect   : 0,
    settingSelect : 0,
  })
  // ----- DataList State -----
  const [dataList, setDataList] = useState<DataListType>({
    requestList : Array.from({length:askingCount},(_,idx)=>getRequestPrompt(idx)),
    orderList   : Array.from({length:askingCount},()=>"{ empty }"),
    promptLabel : settingsLabel,
  })
  // ----- props State -----
  const [summaryPrompt, setSummaryPrompt] = useState<SummaryPromptType>(usePromptProperties({order:undefined}))
  // ----- providers -----
  return (<SelectContext.Provider  value={{selection, setSelection}}>
    <DataListContext.Provider      value={{dataList, setDataList}}>
    <SummaryPromptContext.Provider value={{summaryPrompt, setSummaryPrompt}}>
      {props.children}
    </SummaryPromptContext.Provider>
    </DataListContext.Provider>
  </SelectContext.Provider>)
}
const askingCount = 7
const settingsLabel = [
  "Base Settings"   ,
  "Hair Settings"   ,
  "Face Settings"   ,
  "Body Settings"   ,
  "Scene Settings"  ,
  "Genital Settings",
  "Emotion Settings",
  "Fluid Settings"  ,
  "Action Settings" ,
  "Posing Settings" ,
  "Prompt Summaries",
]

