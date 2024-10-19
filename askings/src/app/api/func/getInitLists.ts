import getPromptProperty from "./gePromptProperty"
import getOrderRequest from "./getOrderRequest"

const getInitialLists = (orders:number) => {
  const emptyLists = Array.from({length:orders},()=>"{ empty }")
  return {
    request   : emptyLists.map((_,idx)=>getOrderRequest(idx)),
    order     : emptyLists,
    properties: emptyLists.map(()=>getPromptProperty())
  }
}

export default getInitialLists