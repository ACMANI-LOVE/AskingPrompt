import LABEL_TEXT from "@/const/LABEL_TEXT";
import { getBasisRequest, getSceneRequest, getFacesRequest, getHairsRequest, getBodiesRequest, getGenitalRequest } from "./getRequests";

const getOrderRequest = (index:number) => {
  const basis   = getBasisRequest  (index)
  const scene   = getSceneRequest  ()
  const faces   = getFacesRequest  ()
  const hairs   = getHairsRequest  ()
  const bodies  = getBodiesRequest ()
  const genital = getGenitalRequest(basis.model)
  return LABEL_TEXT.reqHeader.join() +
  `{\n`+ 
  `  "BASIS_DATA": {\n`+
  `    "basisSettings": {\n`+
  `      "model"    : ${basis.modelOrder}, //対応する番号に変換 :1人型（女性）,2人型（両性）,3獣人（メス）,4獣人（両性）,\n`+
  `      "character": ${basis.character}, //変更不要:\n`+
  `      "species"  : "", //未決定: model の内容をもとに、 詳細な品種名を記載\n`+
  `      "story"    : "", //未決定: sceneSettings の内容をもとに、セクシーなハプニングストーリーを希望\n`+
  `      "locate"   : "", //未決定: sceneSettings の内容をもとに、場所を記載\n`+
  `      "jobs"     : "", //未決定: sceneSettings の内容をもとに、職業を記載\n`+
  `      "outfit"   : "", //未決定: sceneSettings の内容をもとに、服装を記載\n`+
  `      "equips"   : "", //未決定: sceneSettings の内容をもとに、所持品を記載\n`+
  `    },\n`+
  `    "sceneSettings": {\n`+
  `      "period" :  ${scene.period}, //対応する番号に変換: 1先史,2古代,3中世,4近世近代,5現代,6未来,\n`+
  `      "weather":  ${scene.weather}, //対応する番号に変換: 1快晴,2曇天,3雨天,4降雪,\n`+
  `      "times"  :  ${scene.times}, //対応する番号に変換: 1朝から夕方まで,2夕から深夜まで,3夜から明方まで,\n`+
  `    }\n`+
  `  },\n`+
  `  "FACES_DATA": {\n`+
  `    "facesSettings": {\n`+
  `      "looks"    :  ${faces.looks}, //対応する番号に変換: 1女子学生,2大人びた,3成熟した,\n`+
  `      "personality":  ${faces.personality}, //対応する番号に変換: 1秩序／善良,2秩序／中立,3秩序／邪悪,4中庸／善良,5中庸／中立,6中庸／邪悪,7混沌／善良,8混沌／中立,9混沌／邪悪,\n`+
  `      "eyesShape"  :  ${faces.eyesShape}, //対応する番号に変換: 1細目,2ジト目,3タレ目,4ツリ目,\n`+
  `    },\n`+
  `    "hairsSettings": {\n`+
  `      "hairsSize" :  ${hairs.hairsSize}, //対応する番号に変換: 1ショート,2ミディアム,3ロング,\n`+
  `      "bangsSize" :  ${hairs.bangsSize}, //対応する番号に変換: 1ショート,2ミディアム,3ロング,\n`+
  `      "hairsStyle": "", //未決定: hairSize  の内容をもとに、 ヘアスタイルを記載\n`+
  `      "bangsStyle": "", //未決定: bangsSize の内容をもとに、 前髪スタイルを記載\n`+
  `    },\n`+
  `  },\n`+
  `  "BODIES_DATA": {\n`+
  `    "bodiesSettings": {\n`+
  `      "skinType": "", //未決定: model の内容をもとに、 表皮の特徴を記載\n`+
  `      "figures" :  ${bodies.figures}, //対応する番号に変換: 1通常,2がっしり,\n`+
  `      "boobSize":  ${bodies.boobSize}, //対応する番号に変換: 1巨乳,2爆乳,3超乳,\n`+
  `      "bodySize":  ${bodies.bodySize}, //対応する番号に変換: 1細身or肉厚,2健康的or筋肉質,3ぽっちゃりor肥満,\n`+
  `      "buttSize":  ${bodies.buttSize}, //対応する番号に変換: 1巨尻,2爆尻,3超尻,\n`+
  `    },\n`+
  `    "genitalSettings": {\n`+
  `      "maleGenital":  ${genital.maleGenital}, //対応する番号に変換: 1あり,2なし,\n`+
  `      "malesSize"  :  ${genital.malesSize}, //対応する番号に変換: 1普通,2太い,3長い,4巨大,5超級\n`+
  `    },\n`+
  `  },\n`+
  `  "COLORS_DATA": {\n`+
  `    "colorsSettings": {\n`+
  `      "hairColor"        : "", //未決定: カラーコードを記載。色情報は自由に決めてよい\n`+
  `      "eyesColor"        : "", //未決定: カラーコードを記載。色情報は自由に決めてよい\n`+
  `      "skinMainColor"    : "", //未決定: カラーコードを記載。色情報は自由に決めてよい\n`+
  `      "skinAccentColor"  : "", //未決定: カラーコードを記載。色情報は自由に決めてよい\n`+
  `      "outfitMainColor"  : "", //未決定: カラーコードを記載。色情報は自由に決めてよい\n`+
  `      "outfitAccentColor": "", //未決定: カラーコードを記載。色情報は自由に決めてよい\n`+
  `      "equipsMainColor"  : "", //未決定: カラーコードを記載。色情報は自由に決めてよい\n`+
  `      "equipsAccentColor": "", //未決定: カラーコードを記載。色情報は自由に決めてよい\n`+
  `      "randomAccentColor": "", //未決定: カラーコードを記載。色情報は自由に決めてよい\n`+
  `    }\n`+
  `  }\n`+
  `}\n`+
  "";
}
export default getOrderRequest