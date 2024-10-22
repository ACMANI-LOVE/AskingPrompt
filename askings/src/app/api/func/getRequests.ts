import { Models } from "@/const/enum_requests";
import { Animaloid, Humanoids } from "@/init/init";
import { lotteryList, randBetween, randBool } from "@/util";
import { getBangsSizeOrder, getBodySizeOrder, getBoobSizeOrder, getButtSizeOrder, getEyesShapeOrder, getFigureOrder, getHairsSizeOrder, getLooksOrder, getMaleGenitalOrder, getMalesSizeOrder, getModelOrder, getPeriodOrder, getPersonalityOrder, getTimesOrder, getWeatherOrder } from "./getOrders";

export const getBasisRequest   = (index:number) => {
  const model = (index === 0) ? (randBool()) ? Models.Mesukemo : Models.Futakemo
              : (index === 1) ? (randBool()) ? Models.Futanari : Models.Futakemo
              : (randBetween(1,4))
  const modelOrder = getModelOrder(model);
  const character  = (model === Models.Mesukemo || model === Models.Futakemo)
    ? lotteryList(Animaloid)[0].species
    : lotteryList(Humanoids)[0].species
  return {
    model,
    modelOrder,
    character,
  }
}
export const getSceneRequest   = () => {
  const period  = getPeriodOrder (randBetween(1,6))
  const weather = getWeatherOrder(randBetween(1,4))
  const times   = getTimesOrder  (randBetween(1,3))
  return {
    period,
    weather,
    times,
  }
}
export const getFacesRequest   = () => {
  const looks       = getLooksOrder      (randBetween(1,3))
  const personality = getPersonalityOrder(randBetween(1,9))
  const eyesShape   = getEyesShapeOrder  (randBetween(1,4))
  return {
    looks,
    personality,
    eyesShape,
  }
}
export const getHairsRequest   = () => {
  const hairsSize = getHairsSizeOrder(randBetween(1,3))
  const bangsSize = getBangsSizeOrder(randBetween(1,3))
  return {
    hairsSize,
    bangsSize,
  }
}
// BODIES SETTINGS ~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~
export const getBodiesRequest  = () => {
  const figures  = getFigureOrder (randBetween(1,2))
  const boobSize = getBoobSizeOrder(randBetween(1,3))
  const bodySize = getBodySizeOrder(randBetween(1,3))
  const buttSize = getButtSizeOrder(randBetween(1,3))
  return {
    figures,
    boobSize,
    bodySize,
    buttSize,
  }
}
export const getGenitalRequest = (model:number) => {
  const isFutanari  = (model === Models.Futanari || model === Models.Futakemo)
  const maleGenital = getMaleGenitalOrder((isFutanari) ? 1 : 2)
  const malesSize   = getMalesSizeOrder  ((isFutanari) ? randBetween(1,5) : 0)
  return {
    maleGenital,
    malesSize,
  }
}