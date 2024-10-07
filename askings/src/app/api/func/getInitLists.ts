import getPromptProperties from "./getPromptProperties"
import getRequestPrompt from "./getRequestPrompt"

const getInitialLists = (orders:number) => {
  const emptyLists = Array.from({length:orders},()=>"{ empty }")
  return {
    request   : emptyLists.map((_,idx)=>getRequestPrompt(idx)),
    order     : emptyLists,
    properties: emptyLists.map(()=>getPromptProperties({order:undefined})) 
  }
}

export default getInitialLists