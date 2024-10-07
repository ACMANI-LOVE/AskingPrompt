import { NextRequest, NextResponse } from "next/server";
import getRequestPrompt from "./func/getRequestPrompt";
import getInitialLists from "./func/getInitLists";
import { SummaryPromptType } from "@/const/cons_promptProps";

export interface RequestBodies{
  init?   : { orders:number},
  shuffle?: { id:number },
}
export interface ResponseBodies {
  initItems: {
    request: string[]
    order  : string[]
    properties: SummaryPromptType[]
  }
  responseShuffle: string

}
export async function POST(request:NextRequest) {
  const body:RequestBodies = await request.json()
  const result:ResponseBodies = {
    initItems: {
      request   : [],
      order     : [],
      properties: []
    },
    responseShuffle: ""
  }
  if(body.init   ) { result.initItems       = getInitialLists(body.init.orders)}
  if(body.shuffle) { result.responseShuffle = getRequestPrompt(body.shuffle.id)}
  return NextResponse.json(result)
}