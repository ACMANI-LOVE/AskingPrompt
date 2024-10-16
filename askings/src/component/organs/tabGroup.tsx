import { zeroPads } from "@/util";
import { Tabs, Tab, Paper } from "@mui/material";
import { ReactNode, useState, BaseSyntheticEvent } from "react";
import { MText } from "../atoms/text";
import { Layout, PaperLayout } from "../atoms/atoms";
interface TabGroupProps {
  initial:number
  labelList:ReactNode[]
  labelLine?:number
}
type TabGroupReturnType = [
  TabGroup: ()=>ReactNode,
  tabSelect: number
]
const useTabGroup = (props:TabGroupProps) => {
  const {
    initial,
    labelList,
    labelLine = 1,
  } = props
  const [tabSelect, setTabSelect] = useState(initial)
  const handleChangeTab = (_:BaseSyntheticEvent,newVal:number) => setTabSelect(newVal)
  const rowSize = Math.ceil(labelList.length / labelLine)

  const tabList = labelList.reduce((result:ReactNode[][], item, index) => {
    const resIdx = Math.floor(index / rowSize);
    if (!result[resIdx]) {
      result[resIdx] = [item]
    } else {
      result[resIdx].push(item)
    }
    return result
  },[])

  const TabGroup = () => {
    return (<PaperLayout>
      {tabList.map((row,rowIdx)=>{
        const startIdx = (tabList[rowIdx-1]) ? tabList[rowIdx-1].length : 0
        return <Tabs key={`tabRowId-${rowIdx}`} variant="fullWidth" centered value={tabSelect} onChange={handleChangeTab}>
        {row.map((label,idx)=> {
          const index = idx+startIdx
          return <Tab key={`tabId-${index}`}
          id={index.toString()} value={index}
          label={label}/>})}
      </Tabs>})}
    </PaperLayout>)
  }
  return [ TabGroup, tabSelect ] as TabGroupReturnType
}

export default useTabGroup;