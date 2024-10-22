const LABEL_TEXT = {
  "title": ["'- Ask Gpt 4 Prompts. -'"],
  "reqHeader": [
    "新しい創作のキャラクター作成を手伝って欲しい。\n",
    "キャラクターの設定を考えるうえで下記のプロフィールを作成したい。\n",
    "プロフィールシートをJSONで渡すので貴方は記述箇所を埋めてほしい。\n",
    "コメントを参考にプロパティの対応値をnumber型またはstring型で入力してほしい。原則的にnullは無効です。\n",
    "出力はJSONデータでお願いします。出力データにコメントは不要です。\n"
  ],
  "promptHeader": ["score_9, score_8_up, score_7_up, ultra detailed, anime source"],
  "promptFooter": [
    "<lora:Expressive_H:1>",
    "<lora:Smooth Style 2 SDXL_LoRA_Pony Diffusion V6 XL:1>"
  ],
  "empty": ["- empty -"]
}
export default LABEL_TEXT