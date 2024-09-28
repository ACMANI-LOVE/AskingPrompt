import { Tabs, Tab, Paper } from "@mui/material";
import { ReactNode, useState, BaseSyntheticEvent } from "react";
interface TabGroupProps {
  initial:number
  labelList:string[]
}
type TabGroupReturnType = {
  TabGroup: ()=>ReactNode,
  tabSelect: number
}
const useTabGroup = (props:TabGroupProps) => {
  const {
    initial,
    labelList,
  } = props
  const [tabSelect, setTabSelect] = useState(initial)
  const handleChangeTab = (_:BaseSyntheticEvent,newVal:number) => setTabSelect(newVal)
  const TabGroup = () => {
    return (<Paper>
      <Tabs value={tabSelect} onChange={handleChangeTab}>
        {labelList.map((label,idx)=><Tab key={`tabId-${idx}`} label={`${(idx+1).toString().padStart(2,"0")}:${label}`} id={idx.toString()} />)}
      </Tabs>
    </Paper>)
  }
  return { TabGroup, tabSelect } as TabGroupReturnType
}

export default useTabGroup;