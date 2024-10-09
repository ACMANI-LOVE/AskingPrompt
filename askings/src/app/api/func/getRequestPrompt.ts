import { Models, Genital } from "@/const/cons_reqEnum";
import { ModelsTypes, BasicSettings, SpeciesType, GenitalSettings, GenitalSizeTypes, SituationSettings, PeriodTypes, WeathersTypes, TimesTypes, HairDataSettings, HairSizeTypes, FaceDataSettings, AgesTypes, EyesShapeTypes, MindTypes, BodyDataSettings, SkinTypes, FigureTypes, FigureSizeTypes } from "@/const/cons_requestTypes";
import { request_header } from "@/const/const_text";
import { Animaloid, Humanoids } from "@/init/init";
import { lotteryList, randBetween, randBool } from "@/util";
import { getModelsData, getGenitalData, getGenitalSizeData, getPeriodData, getWeatherData, getTimesData, getHairSizeData, getBangsSizeData, getAgesData, getEyesShapeData, getMindData, getSkinData, getFigureData, getBoobSizeData, getBodySizeData, getButtSizeData } from "./getPropertyData";

const getRequestPrompt = (idx:number) => {
  const promptHeader    = request_header
  const Models          = ModelsSelection(idx);
  const basicSettings   = BasicSelection    (Models);
  const genitalSettings = GenitalSelection  (Models);
  const bodySettings    = BodyDataSelection (basicSettings.skin);
  const hairSettings    = HairDataSelection ();
  const faceSettings    = FaceDataSelection ();
  const situations      = SituationSelection();

  const promptBody =
  `{\n`+
  `  "OTHER_INFO" : {\n`+
  `    "story"         : ""  //未決定: 上記の内容をもとに、セクシーな短い紹介文を記載。ただし露骨な性表現はNG"\n`+
  `    "baseSettings"  : {\n`+
  `      "model"       : ${basicSettings.models }, //対応する番号に変換:1人型（女性）,2人型（両性）,3獣人（メス）,4獣人（両性）,\n`+
  `      "character"   : ${basicSettings.species}, //決定済\n`+
  `      "species"     : ""  //未決定: Models の内容をもとに、 詳細な品種名を記載\n`+
  `    },\n`+
  `    "situation"     : {\n`+
  `      "period"      : ${situations.period }, //対応する番号に変換:1先史,2古代,3中世,4近世近代,5現代,6未来,\n`+
  `      "times"       : ${situations.time   }, //対応する番号に変換:1快晴,2曇天,3雨天,4雷雨,5降雪,\n`+
  `      "weather"     : ${situations.weather}  //対応する番号に変換:1朝から夕方まで,2夕から深夜まで,3夜から明方まで,\n`+
  `    },\n`+
  `    "background"    : {\n`+
  `      "location"    : "", //未決定: situation の内容をもとに、 場所を記載\n`+
  `      "outfit"      : "", //未決定: situation の内容をもとに、 服装を記載\n`+
  `      "job"         : "", //未決定: situation の内容をもとに、 職業を記載\n`+
  `      "items1"      : "", //未決定: situation の内容をもとに、 所持品1を記載\n`+
  `      "items2"      : "", //未決定: situation の内容をもとに、 所持品2を記載\n`+
  `      "items3"      : ""  //未決定: situation の内容をもとに、 所持品3を記載\n`+
  `    },\n`+
  `    "colorSettings" : {\n`+
  `      "mainThemeColor"   : "", //未決定:カラーコードを記載。他の設定に影響される必要はない\n`+
  `      "subThemeColor"    : "", //未決定:カラーコードを記載。他の設定に影響される必要はない\n`+
  `      "accentThemeColor" : "", //未決定:カラーコードを記載。他の設定に影響される必要はない\n`+
  `      "eyesStyleColor"   : "", //未決定:カラーコードを記載。他の設定に影響される必要はない\n`+
  `      "hairStyleColor"   : "", //未決定:カラーコードを記載。他の設定に影響される必要はない\n`+
  `      "mainSkinColor"    : "", //未決定:カラーコードを記載。他の設定に影響される必要はない\n`+
  `      "subSkinColor"     : "", //未決定:カラーコードを記載。他の設定に影響される必要はない\n`+
  `      "otherFreeColor": ""  //未決定:カラーコードを記載。指定に制限は設けない\n`+
  `    }\n`+
  `  },\n`+
  `  "CHARA_INFO" : {\n`+
  `    "hairSettings"  : {\n`+
  `      "hairSize"    : ${hairSettings.hairSize },  //対応する番号に変換:1ショート,2ミディアム,3ロング,\n`+
  `      "bangsSize"   : ${hairSettings.bangsSize},  //対応する番号に変換:1ショート,2ミディアム,3ロング,\n`+
  `      "hairStyle"   : "", //未決定: hairSize  の内容をもとに、 ヘアスタイルを記載\n`+
  `      "bangsStyle"  : ""  //未決定: bangsSize の内容をもとに、 前髪スタイルを記載\n`+
  `    },\n`+
  `    "faceSettings"  : {\n`+
  `      "faceLooks"   : ${faceSettings.face},  //対応する番号に変換:1若々しい,2年頃の,3成熟した,\n`+
  `      "personality" : ${faceSettings.mind},  //対応する番号に変換:1秩序／善良,2秩序／中立,3秩序／邪悪,4中庸／善良,5中庸／中立,6中庸／邪悪,7混沌／善良,8混沌／中立,9混沌／邪悪,\n`+
  `      "eyesShape"   : ${faceSettings.eyes}   //対応する番号に変換:1細目,2ジト目,3タレ目,4ツリ目,\n`+
  `    },\n`+
  `    "bodySettings"  : {\n`+
  `      "skin"        : ${bodySettings.skinType  },  //対応する番号に変換:1人肌,2毛皮,3鱗肌,\n`+
  `      "figure"      : ${bodySettings.figureType},  //対応する番号に変換:1通常,2がっしり,\n`+
  `      "boob"        : ${bodySettings.bustSize  },  //対応する番号に変換:1普通,2巨乳,3爆乳,\n`+
  `      "body"        : ${bodySettings.waistSize },  //対応する番号に変換:1細身or肉厚,2健康的or筋肉質,3ぽっちゃりor肥満,\n`+
  `      "butt"        : ${bodySettings.hipsSize  }   //対応する番号に変換:1普通,2巨尻,3爆尻,\n`+
  `    },\n`+
  `    "genitalSettings" : {\n`+
  `      "maleGenital" : ${genitalSettings.maleGenital},  //対応する番号に変換:1あり,2なし,\n`+
  `      "genitalSize" : ${genitalSettings.genitalSize}   //対応する番号に変換:1普通,2短小,3太い,4長い,5巨大,\n`+
  `    }\n`+
  `  }\n`+
  `}\n`
  return promptHeader + promptBody;
}

export default getRequestPrompt

// =========+=========+=========+=========+=========+=========+=========+=========+=========+=========+
const ModelsSelection = (idx: number) => {
  return idx === 0
    ? Models.Mesukemo
    : idx === 1
      ? randBool()
        ? Models.Futanari
        : Models.Futakemo
      : (randBetween(1, 4) as ModelsTypes);
};
// =========+=========+=========+=========+=========+=========+=========+=========+=========+=========+
const BasicSelection = (chara: ModelsTypes): BasicSettings => {
  let speciesData = {} as SpeciesType;
  if (chara === Models.Female || chara === Models.Futanari) {
    speciesData = lotteryList(Humanoids)[0];
  } else {
    speciesData = lotteryList(Animaloid)[0];
  }
  const species = speciesData.species
  const skin = speciesData.type
  const models  = getModelsData({enums:chara}).order as string;
  return { models, species, skin } as BasicSettings;
};
// =========+=========+=========+=========+=========+=========+=========+=========+=========+=========+
const GenitalSelection = (chara: ModelsTypes): GenitalSettings => {
  const isGenital =
    chara === Models.Futanari || chara === Models.Futakemo
      ? Genital.Yes
      : Genital.Not;
  const maleGenital = getGenitalData({enums:isGenital}).order as string;
  const genitalSize =
    isGenital !== Genital.Not
      ? getGenitalSizeData({enums:randBetween(1, 5) as GenitalSizeTypes}).order as string
      : 'なし';
  return { maleGenital, genitalSize } as GenitalSettings;
};
// =========+=========+=========+=========+=========+=========+=========+=========+=========+=========+
const SituationSelection = (): SituationSettings => {
  const period  = getPeriodData ({ enums:randBetween(1, 6) as PeriodTypes  }).order as string;
  const weather = getWeatherData({ enums:randBetween(1, 5) as WeathersTypes}).order as string;
  const time    = getTimesData  ({ enums:randBetween(1, 3) as TimesTypes   }).order as string;
  return { period, weather, time } as SituationSettings;
};
// =========+=========+=========+=========+=========+=========+=========+=========+=========+=========+
const HairDataSelection = (): HairDataSettings => {
  const hairSize  = getHairSizeData ({ enums:randBetween(1, 3) as HairSizeTypes}).order as string;
  const bangsSize = getBangsSizeData({ enums:randBetween(1, 3) as HairSizeTypes}).order as string;
  return { hairSize, bangsSize } as HairDataSettings;
};
// =========+=========+=========+=========+=========+=========+=========+=========+=========+=========+
const FaceDataSelection = (): FaceDataSettings => {
  const face = getAgesData     ({ enums:randBetween(1, 3) as AgesTypes     }).order as string;
  const eyes = getEyesShapeData({ enums:randBetween(1, 4) as EyesShapeTypes}).order as string;
  const mind = getMindData     ({ enums:randBetween(1, 9) as MindTypes     }).order as string;
  return { face, eyes, mind } as FaceDataSettings;
};
// =========+=========+=========+=========+=========+=========+=========+=========+=========+=========+
const BodyDataSelection = (specieType:number): BodyDataSettings => {
  const skinType   = getSkinData    ({ enums:specieType        as SkinTypes      }).order as string
  const figure     = getFigureData  ({ enums:randBetween(1, 2) as FigureTypes    })
  const figureType = figure.order as string;
  const bustSize   = getBoobSizeData({ enums:randBetween(1, 3) as FigureSizeTypes}).order[Number(figure.prompt)] as string;
  const waistSize  = getBodySizeData({ enums:randBetween(1, 3) as FigureSizeTypes}).order[Number(figure.prompt)] as string;
  const hipsSize   = getButtSizeData({ enums:randBetween(1, 3) as FigureSizeTypes}).order[Number(figure.prompt)] as string;
  return {
    skinType,
    figureType,
    bustSize,
    waistSize,
    hipsSize,
  } as BodyDataSettings;
};
