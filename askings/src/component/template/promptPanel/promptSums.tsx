import { LabelText } from "@/component/atoms/text";
import { OrdersField } from "@/component/atoms/textField";
import { DataListContext } from "@/component/context";
import { RowDirection } from "@/component/molecules/promptItem";
import useRadioGroup from "@/component/organs/radioGroup";
import useSnackBar from "@/component/organs/snackBar";
import { prompt_footer, prompt_header } from "@/const/const_text";
import { ITEMS } from "@/init/init";
import { zeroPads } from "@/util";
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Box, Divider, IconButton } from "@mui/material";
import { useContext, useEffect, useState } from "react";

const PromptSummaries = (props:{orderSelect:number}) => {
  const { orderSelect } = props

  const { dataList } = useContext(DataListContext)
  const property =  dataList.settingList[orderSelect]
  const itemLists = Array.from({length:ITEMS},(_,idx)=>`GeneratedPrompt${zeroPads(idx+1)}:`)
  const [promptSelect, setPromptSelect] = useState(0)

  const [PromptRadio, selectPromptRadio] = useRadioGroup({
    initial:  promptSelect,
    itemList: itemLists
  })
  useEffect(()=>setPromptSelect(selectPromptRadio),[selectPromptRadio])


  const prompts = itemLists.map((_,idx)=>{
    return [
      prompt_header,
      (property.baseProps   .prompts!=="") ? property.baseProps   .prompts : "-- no BASE    prompts --",
      (property.hairProps   .prompts!=="") ? property.hairProps   .prompts : "-- no HAIR    prompts --",
      (property.faceProps   .prompts!=="") ? property.faceProps   .prompts : "-- no FACE    prompts --",
      (property.bodyProps   .prompts!=="") ? property.bodyProps   .prompts : "-- no BODY    prompts --",
      (property.sceneProps  .prompts!=="") ? property.sceneProps  .prompts : "-- no SCENE   prompts --",
      (property.genitalProps.prompts!=="") ? property.genitalProps.prompts : "-- no GENITAL prompts --",
      (property.emotionProps.promptList[idx]) ? property.emotionProps.promptList[idx] : "-- no EMOTION prompts --",
      (property.fluidProps  .promptList[idx]) ? property.fluidProps  .promptList[idx] : "-- no FLUID   prompts --",
      (property.actionProps .promptList[idx]) ? property.actionProps .promptList[idx] : "-- no ACTION  prompts --",
      (property.posingProps .promptList[idx]) ? property.posingProps .promptList[idx] : "-- no POSING  prompts --",
      prompt_footer,
    ].join("\n")
  })
  const onClickCopy    = (text:string) => navigator.clipboard.writeText(text).finally(()=>openCopy())
  const [SnackCopy   , openCopy   ] = useSnackBar({message:"Field Copied!!!"  })

  return (<Box display={"flex"} flexDirection={"column"} gap={"0.25em"}>
    <LabelText bold text={'Prompt Summaries'}/>
    <Divider/>
    <RowDirection>
      <PromptRadio/>
      <Box display={"flex"} flexDirection={"column"} justifyContent={"start"}>
        {prompts.map((prompt,idx)=><IconButton key={`promptCopy${idx}`} size="large" onClick={()=>onClickCopy(prompt)}><AssignmentIcon color="primary"/></IconButton>)}
      </Box>
    </RowDirection>
    <Divider/>
    <LabelText bold text={`Prompt Preview:${zeroPads(promptSelect+1)}`}/>
    <OrdersField text={prompts[promptSelect]} line={15}/>


    <SnackCopy />
  </Box>)
}

export default PromptSummaries