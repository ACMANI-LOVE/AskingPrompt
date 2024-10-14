export const settingsLabel = [
  "Base Settings"   ,
  "Face Settings"   ,
  "Body Settings"   ,
  "Emotion Settings",
  "Fluid Settings"  ,
  "Action Settings" ,
  "Posing Settings" ,
  "Prompt Summaries",
]
export const titleHeader = '- Ask Gpt 4 Prompts. -'
export const request_header =
  '新しい創作のキャラクター作成を手伝って欲しい。\n' +
  'キャラクターの設定を考えるうえで下記のプロフィールを作成したい。\n' +
  'プロフィールシートをJSONで渡すので貴方は記述箇所を埋めてほしい。\n' +
  'コメントを参考にプロパティの対応値をnumber型またはstring型で入力してほしい。原則的にnullは無効です。\n' +
  '出力はJSONデータでお願いします。出力データにコメントは不要です。\n'
export const request_body =
  `{                                                                                                                                                                \n`+
  `  "OTHER_INFO" : {                                                                                                                                               \n`+
  `    "baseSettings"  : {                                                                                                                                          \n`+
  `      "model"       : [basicSettings.models ], //対応する番号に変換:1人型（女性）,2人型（両性）,3獣人（メス）,4獣人（両性）,                                                          \n`+
  `      "character"   : [basicSettings.species], //決定済                                                                                                                               \n`+
  `      "species"     : ""  //未決定: Models の内容をもとに、 詳細な品種名を記載                                                                                    \n`+
  `    },                                                                                                                                                          \n`+
  `    "situation"     : {                                                                                                                                         \n`+
  `      "period"      : [situations.period ], //対応する番号に変換:1先史,2古代,3中世,4近世近代,5現代,6未来,                                                                       \n`+
  `      "times"       : [situations.time   ], //対応する番号に変換:1快晴,2曇天,3雨天,4雷雨,5降雪,                                                                                 \n`+
  `      "weather"     : [situations.weather]  //対応する番号に変換:1朝から夕方まで,2夕から深夜まで,3夜から明方まで,                                                                  \n`+
  `    },                                                                                                                                                          \n`+
  `    "background"    : {                                                                                                                                         \n`+
  `      "location"    : "", //未決定: situation の内容をもとに、 場所を記載                                                                                        \n`+
  `      "outfit"      : "", //未決定: situation の内容をもとに、 服装を記載                                                                                        \n`+
  `      "job"         : "", //未決定: situation の内容をもとに、 職業を記載                                                                                        \n`+
  `      "items1"      : "", //未決定: situation の内容をもとに、 所持品1を記載                                                                                    \n`+
  `      "items2"      : "", //未決定: situation の内容をもとに、 所持品2を記載                                                                                    \n`+
  `      "items3"      : ""  //未決定: situation の内容をもとに、 所持品3を記載                                                                                    \n`+
  `    },                                                                                                                                                          \n`+
  `    "colorSettings" : {                                                                                                                                         \n`+
  `      "mainThemeColor"   : "", //未決定:自由に色情報を記載                                                                                                      \n`+
  `      "subThemeColor"    : "", //未決定:自由に色情報を記載                                                                                                      \n`+
  `      "accentThemeColor" : "", //未決定:自由に色情報を記載                                                                                                      \n`+
  `      "eyesStyleColor"   : "", //未決定:自由に色情報を記載                                                                                                      \n`+
  `      "hairStyleColor"   : "", //未決定:自由に色情報を記載                                                                                                      \n`+
  `      "mainSkinColor"    : "", //未決定:自由に色情報を記載                                                                                                      \n`+
  `      "subSkinColor"     : "", //未決定:自由に色情報を記載                                                                                                      \n`+
  `      "accentSkinColor"  : ""  //未決定:自由に色情報を記載                                                                                                      \n`+
  `    }                                                                                                                                                          \n`+
  `  },                                                                                                                                                           \n`+
  `  "CHARA_INFO" : {                                                                                                                                             \n`+
  `    "hairSettings"  : {                                                                                                                                        \n`+
  `      "hairSize"    : [hairSettings.hairSize ],  //対応する番号に変換:1ショート,2ミディアム,3ロング,                                                                                 \n`+
  `      "bangsSize"   : [hairSettings.bangsSize],  //対応する番号に変換:1ショート,2ミディアム,3ロング,                                                                                 \n`+
  `      "hairStyle"   : "", //未決定: hairSize  の内容をもとに、 ヘアスタイルを記載                                                                               \n`+
  `      "bangsStyle"  : ""  //未決定: bangsSize の内容をもとに、 前髪スタイルを記載                                                                               \n`+
  `    },                                                                                                                                                        \n`+
  `    "faceSettings"  : {                                                                                                                                       \n`+
  `      "ages"        : [faceSettings.face],  //対応する番号に変換:1若々しい,2年頃の,3成熟した,                                                                                  \n`+
  `      "mind"        : [faceSettings.mind],  //対応する番号に変換:1秩序／善良,2秩序／中立,3秩序／邪悪,4中庸／善良,5中庸／中立,6中庸／邪悪,7混沌／善良,8混沌／中立,9混沌／邪悪, \n`+
  `      "eyesShape"   : [faceSettings.eyes]   //対応する番号に変換:1細目,2ジト目,3タレ目,4ツリ目,                                                                               \n`+
  `    },                                                                                                                                                        \n`+
  `    "bodySettings"  : {                                                                                                                                       \n`+
  `      "skin"        : [bodySettings.skinType  ],  //対応する番号に変換:1人肌,2毛皮,3鱗肌,                                                                                           \n`+
  `      "figure"      : [bodySettings.figureType],  //対応する番号に変換:1通常,2がっしり,                                                                                              \n`+
  `      "boob"        : [bodySettings.bustSize  ],  //対応する番号に変換:1普通,2巨乳,3爆乳,                                                                                           \n`+
  `      "body"        : [bodySettings.waistSize ],  //対応する番号に変換:1細身or肉厚,2健康的or筋肉質,3ぽっちゃりor肥満,                                                                \n`+
  `      "butt"        : [bodySettings.hipsSize  ]   //対応する番号に変換:1普通,2巨尻,3爆尻,                                                                                           \n`+
  `    },                                                                                                                                                       \n`+
  `    "genitalSettings" : {                                                                                                                                    \n`+
  `      "maleGenital" : [genitalSettings.maleGenital],  //対応する番号に変換:1あり,2なし,                                                                                                 \n`+
  `      "genitalSize" : [genitalSettings.genitalSize]   //対応する番号に変換:1普通,2短小,3太い,4長い,5巨大,                                                                             \n`+
  `    }                                                                                                                                                        \n`+
  `  },                                                                                                                                                         \n`+
  `  "story"           : ""  //未決定: 上記の内容をもとに、セクシーな短い紹介文を記載。ただし露骨な性表現はNG"                                                      \n`+
  `}                                                                                                                                                         \n`
export const prompt_header = "score_9, score_8_up, score_7_up, ultra detailed, anime source,"
export const prompt_footer =
    "<lora:Expressive_H:1>\n"+
    "<lora:Smooth Style 2 SDXL_LoRA_Pony Diffusion V6 XL:1>\n"
// *=========*=========*=========*=========*=========*=========*=========*=========*=========*=========
// *=========*=========*=========*=========*=========*=========*=========*=========*=========*=========