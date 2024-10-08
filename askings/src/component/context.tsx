"use client"
import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";
import { DataListType, SelectionType, SummaryPromptType } from "@/const/cons_promptProps";
import { ORDERS } from "@/init/init";
import getInitialLists from "@/app/api/func/getInitLists";
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
    promptList : [],
    requestList: [],
    orderList  : [],
    settingList: [],
  },
  setDataList: ()=>{}
})
// +=========+=========+=========+=========+=========+=========+=========+=========+=========+=========
// Provider
// +=========+=========+=========+=========+=========+=========+=========+=========+=========+=========
export const ContextProvider = (props:{children:ReactNode}) => {
  // const initial = async () => {
  //   const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api`, {
  //    method: 'POST',
  //    headers: {'Content-Type': 'application/json'},
  //    body: JSON.stringify({init:{orders:ORDERS}} as RequestBodies)
  //   })
  //   const result = (await response.json()) as ResponseBodies
  //   const { initItems } =  result
  //   setSelection(prev=>({...prev,
  //   }))
  //   setDataList(prev=>({...prev,
  //     requestList: initItems.request,
  //     orderList  : initItems.order,
  //     promptLabel: settingsLabel,
  //   }))
  //   setSummaryPrompt(initItems.properties)
  // }
  // useEffect(()=>{initial()},[])
  const initItems =  getInitialLists(ORDERS)
  // ----- Selection State -----
  const [selection, setSelection] = useState<SelectionType>({
    menuSelect    : 0,
    requestSelect : 0,
    orderSelect   : 0,
    settingSelect : 0,
  } as SelectionType)
  // ----- DataList State -----
  const [dataList, setDataList] = useState<DataListType>({
    promptList : [],
    requestList: initItems.request,
    orderList  : initItems.order,
    settingList: initItems.properties,
  } as DataListType)
  // ----- providers -----
  return (<SelectContext.Provider  value={{selection, setSelection}}>
    <DataListContext.Provider      value={{dataList, setDataList}}>
      {props.children}
    </DataListContext.Provider>
  </SelectContext.Provider>)
}



