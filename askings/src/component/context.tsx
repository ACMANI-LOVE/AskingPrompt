"use client"
import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";
import { DataListType, SelectionType } from "@/const/cons_interfaces";
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



