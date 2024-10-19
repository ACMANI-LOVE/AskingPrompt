import { SummaryPromptType } from "@/const/cons_interfaces"
import { convertJsonStrings } from "@/util"
import { getBasisInitialProps, getFacesInitialProps, getBodiesInitialProps, getDetailsInitialProps, getOptionsInitialProps, getPromptsInitialProps } from "./getProperties"

const getPromptProperty = (order?:string) => {
  const data = convertJsonStrings(order ?? "{}") as any
  const basisData  = data?.BASIS_DATA  ?? undefined
  const facesData  = data?.FACES_DATA  ?? undefined
  const bodiesData = data?.BODIES_DATA ?? undefined
  const colorsData = data?.COLORS_DATA ?? undefined

  // +---------+---------+---------+---------+---------+---------+---------+---------+---------+---------
  const basisProps   = getBasisInitialProps  (basisData  )
  const facesProps   = getFacesInitialProps  (facesData  )
  const bodiesProps  = getBodiesInitialProps (bodiesData )
  const detailsProps = getDetailsInitialProps({
    ordersData: {
      skinType: bodiesData?.bodiesSettings.skinType ?? 0,
      outfits : basisData ?.basisSettings .outfit   ?? 0,
      equips  : basisData ?.basisSettings .equips   ?? 0,
    },
    colorsData: colorsData?.colorsSettings ?? undefined,
  })
  const optionsProps = getOptionsInitialProps({
    optionSettings: bodiesData?.genitalSettings ?? 0
  })
  const promptsProps = getPromptsInitialProps()
// +---------+---------+---------+---------+---------+---------+---------+---------+---------+---------
  return {
    basisProps,
    facesProps,
    bodiesProps,
    optionsProps,
    promptsProps,
    detailsProps,
  } as SummaryPromptType
}
export default getPromptProperty