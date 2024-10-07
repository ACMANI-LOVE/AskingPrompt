"use client"
import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import { DataListType, SelectionType, SummaryPromptType } from "@/const/cons_promptProps";
import { settingsLabel } from "@/const/const_text";
import { RequestBodies, ResponseBodies } from "@/app/api/route";
import { ORDERS } from "@/init/init";
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
    promptLabel : [],
  },
  setDataList: ()=>{}
})
export const SummaryPromptContext = createContext<{
  summaryPrompt    : SummaryPromptType[],
  setSummaryPrompt : Dispatch<SetStateAction<SummaryPromptType[]>>,
}>({
  summaryPrompt: [],
  setSummaryPrompt: ()=>{}
})
// +=========+=========+=========+=========+=========+=========+=========+=========+=========+=========
// Provider
// +=========+=========+=========+=========+=========+=========+=========+=========+=========+=========
export const ContextProvider = (props:{children:ReactNode}) => {
  const initial = async () => {
    const response = await fetch('/api', {
     method: 'POST',
     headers: {'Content-Type': 'application/json'},
     body: JSON.stringify({init:{orders:ORDERS}} as RequestBodies)
    })
    const result = (await response.json()) as ResponseBodies
    const { initItems } =  result
    setSelection(prev=>({...prev,
      menuSelect    : 0,
      requestSelect : 0,
      orderSelect   : 0,
      settingSelect : 0,
    }))
    setDataList(prev=>({...prev,
      requestList: initItems.request,
      orderList  : initItems.order,
      promptLabel: settingsLabel,
    }))
    setSummaryPrompt(initItems.properties)
  }
  useEffect(()=>{initial()},[])
  // ----- Selection State -----
  const [selection, setSelection] = useState<SelectionType>({} as SelectionType)
  // ----- DataList State -----
  const [dataList, setDataList] = useState<DataListType>({} as DataListType)
  // ----- props State -----
  const [summaryPrompt, setSummaryPrompt] = useState<SummaryPromptType[]>([] as SummaryPromptType[])
  // ----- providers -----
  return (<SelectContext.Provider  value={{selection, setSelection}}>
    <DataListContext.Provider      value={{dataList, setDataList}}>
    <SummaryPromptContext.Provider value={{summaryPrompt, setSummaryPrompt}}>
      {props.children}
    </SummaryPromptContext.Provider>
    </DataListContext.Provider>
  </SelectContext.Provider>)
}



