import { RadioGroup, Box, FormControlLabel, Radio } from "@mui/material"
import { ReactNode, useState } from "react"
import { LabelText } from "../atoms/text"

interface RadioGroupProps {
  initial:number
  itemList:string[]
}
type RadioGroupReturnType = [
  RadioGroupField: ()=>ReactNode,
  radioSelect: number
]
const useRadioGroup = (props:RadioGroupProps) => {
  const {
    initial,
    itemList,
  } = props
  const [radioSelect, setRadioSelect] = useState(initial)
  const handleChangeRadio = (newVal:number) => setRadioSelect(newVal)


  const RadioGroupField = () => {
    return (
    <RadioGroup defaultValue={initial}>
      {itemList.map((item,idx)=><Box padding={"0.1em"} display={"flex"} flexDirection={"row"}>
        <FormControlLabel key={idx}
          checked={idx === radioSelect}
          onChange={()=>handleChangeRadio(idx)}
          value={idx}
          control={<Radio color="primary"/>}
          label={<LabelText text={item}/>}/>
      </Box>)}
    </RadioGroup>)
  }
  return [ RadioGroupField, radioSelect ] as RadioGroupReturnType
}
export default useRadioGroup