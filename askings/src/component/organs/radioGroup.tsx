import { RadioGroup, Box, FormControlLabel, Radio } from "@mui/material"
import { ReactNode, useState } from "react"

interface RadioGroupProps {
  initial:number
  itemList:ReactNode[]
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
      {itemList.map((item,idx)=><Box key={`radio${idx}`} padding={"0.1em"} display={"flex"} flexDirection={"row"}>
        <FormControlLabel key={idx}
          checked={idx === radioSelect}
          onChange={()=>handleChangeRadio(idx)}
          value={idx}
          control={<Radio color="primary"/>}
          label={item}/>
      </Box>)}
    </RadioGroup>)
  }
  return [ RadioGroupField, radioSelect ] as RadioGroupReturnType
}
export default useRadioGroup