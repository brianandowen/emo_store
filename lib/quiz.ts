// ============================================================
//  情緒類型定義（九種）
// ============================================================
export type Emotion =
  | "anxious"    // 焦慮
  | "pressure"   // 壓力
  | "sad"        // 難過
  | "tired"      // 疲倦
  | "irritated"  // 煩躁
  | "lonely"     // 孤單
  | "calm"       // 平靜
  | "joyful"     // 愉悅
  | "relaxed";   // 放鬆

export const EMOTIONS: Emotion[] = [
  "anxious", "pressure", "sad", "tired", "irritated",
  "lonely", "calm", "joyful", "relaxed",
];

// ============================================================
//  情緒中文標籤
// ============================================================
export const EMOTION_LABEL: Record<Emotion, string> = {
  anxious:   "焦慮",
  pressure:  "壓力",
  sad:       "難過",
  tired:     "疲倦",
  irritated: "煩躁",
  lonely:    "孤單",
  calm:      "平靜",
  joyful:    "愉悅",
  relaxed:   "放鬆",
};

// ============================================================
//  情緒 → 商品對應
//  product 的值即為 /public/products/{value}.png 的檔名
//  ★ 你只要把去背 PNG 命名成下表的英文檔名放進 public/products 即可
// ============================================================
export interface Product {
  emotion: Emotion;
  name: string;        // 商品中文名
  image: string;       // 檔名（不含副檔名）
  tagline: string;     // 一句推薦語
  reason: string;      // 對應理由（白皮書精簡版）
}

export const PRODUCTS: Record<Emotion, Product> = {
  anxious: {
    emotion: "anxious",
    name: "無糖綠茶",
    image: "green_tea",
    tagline: "讓緊繃的神經慢慢鬆開",
    reason:
      "綠茶中的 L-茶胺酸（L-theanine）被研究發現可降低唾液皮質醇與交感神經喚起，帶來平靜而不昏沉的放鬆感，適合安撫焦慮情緒。",
  },
  pressure: {
    emotion: "pressure",
    name: "85% 黑巧克力",
    image: "dark_chocolate",
    tagline: "一小口，給自己一個喘息",
    reason:
      "高可可含量巧克力的可可多酚與少量糖分能帶來短暫的愉悅與獎賞感，研究指出在壓力情境下作為「慰藉食物」可短時間改善心情。",
  },
  sad: {
    emotion: "sad",
    name: "草莓小蛋糕",
    image: "strawberry_cake",
    tagline: "甜甜的，陪你度過低落的時刻",
    reason:
      "甜味食物具有生理上的安撫效果；慰藉食物常連結到童年與美好記憶，透過情境聯想提升正向情緒。",
  },
  tired: {
    emotion: "tired",
    name: "100% 柳橙汁",
    image: "orange_juice",
    tagline: "補一點維他命 C，喚醒你的精神",
    reason:
      "天然果糖與維生素 C 提供快速可用的能量補給，明亮的口感有助於在疲倦時提振狀態。",
  },
  irritated: {
    emotion: "irritated",
    name: "氣泡水",
    image: "sparkling_water",
    tagline: "氣泡感幫你重新整理思緒",
    reason:
      "無熱量、無糖的氣泡水帶來清爽的感官刺激，作為煩躁時的替代性安撫行為，幫助轉移注意與重新調節情緒。",
  },
  lonely: {
    emotion: "lonely",
    name: "熱可可",
    image: "hot_cocoa",
    tagline: "一杯溫熱，像有人陪著你",
    reason:
      "溫熱飲品與可可的甜味常連結到被照顧、被陪伴的記憶；慰藉食物能活化歸屬感，緩解孤單。",
  },
  calm: {
    emotion: "calm",
    name: "鮮乳",
    image: "milk",
    tagline: "溫潤順口，維持你的好狀態",
    reason:
      "牛奶富含色胺酸（tryptophan）——血清素的前驅物質，溫和支持平穩、安定的情緒狀態。",
  },
  joyful: {
    emotion: "joyful",
    name: "洋芋片",
    image: "potato_chips",
    tagline: "開心的時候，就該放鬆地享受",
    reason:
      "在正向情緒下，享受高愉悅感的點心是一種純粹的犒賞；情緒良好時的適度享受能延續正向體驗。",
  },
  relaxed: {
    emotion: "relaxed",
    name: "無糖豆漿",
    image: "soy_milk",
    tagline: "清爽無負擔，延續放鬆的節奏",
    reason:
      "無糖豆漿提供植物性蛋白與溫和飽足感，清爽不刺激，適合維持已經放鬆的身心節奏。",
  },
};

// ============================================================
//  題目設計：20 題，一頁一題
//  每題 4 個選項，每個選項對「某些情緒」加分（weights）
//  計分邏輯：累加各情緒分數 → 取最高分情緒
// ============================================================
export interface Option {
  text: string;
  weights: Partial<Record<Emotion, number>>;
}
export interface Question {
  id: number;
  prompt: string;
  options: Option[];
}

export const QUESTIONS: Question[] = [
  {
    id: 1,
    prompt: "現在，如果用一個畫面形容你的腦袋，比較像？",
    options: [
      { text: "停不下來的跑馬燈", weights: { anxious: 2, pressure: 1 } },
      { text: "灰濛濛的陰天", weights: { sad: 2, lonely: 1 } },
      { text: "電量快沒了的手機", weights: { tired: 2 } },
      { text: "平靜無波的湖面", weights: { calm: 2, relaxed: 1 } },
    ],
  },
  {
    id: 2,
    prompt: "回想剛剛這幾個小時，你的身體最明顯的感覺是？",
    options: [
      { text: "肩頸緊繃、胸口悶", weights: { pressure: 2, anxious: 1 } },
      { text: "全身沉重、好想躺平", weights: { tired: 2 } },
      { text: "坐不住、想動一動", weights: { irritated: 2 } },
      { text: "放鬆、呼吸很順", weights: { relaxed: 2, calm: 1 } },
    ],
  },
  {
    id: 3,
    prompt: "如果現在手機響了，你的第一反應是？",
    options: [
      { text: "緊張，怕是壞消息", weights: { anxious: 2 } },
      { text: "懶得理，好累", weights: { tired: 2 } },
      { text: "有點煩，誰啊", weights: { irritated: 2 } },
      { text: "開心，說不定是好事", weights: { joyful: 2 } },
    ],
  },
  {
    id: 4,
    prompt: "此刻最想待的地方是？",
    options: [
      { text: "一個沒有人吵我的角落", weights: { irritated: 2, pressure: 1 } },
      { text: "有人陪在身邊的地方", weights: { lonely: 2 } },
      { text: "舒服的沙發或床", weights: { tired: 1, relaxed: 2 } },
      { text: "哪裡都好，現在心情不錯", weights: { joyful: 2, calm: 1 } },
    ],
  },
  {
    id: 5,
    prompt: "想到接下來要做的事，你覺得？",
    options: [
      { text: "好多事擠在一起，喘不過氣", weights: { pressure: 2, anxious: 1 } },
      { text: "提不起勁", weights: { tired: 2, sad: 1 } },
      { text: "還好，一件一件來", weights: { calm: 2 } },
      { text: "蠻期待的", weights: { joyful: 2 } },
    ],
  },
  {
    id: 6,
    prompt: "現在如果有人問「你還好嗎」，你最想回？",
    options: [
      { text: "其實有點撐不住", weights: { pressure: 2, sad: 1 } },
      { text: "就……有點空空的", weights: { lonely: 2, sad: 1 } },
      { text: "別吵我", weights: { irritated: 2 } },
      { text: "我很好啊！", weights: { joyful: 2, relaxed: 1 } },
    ],
  },
  {
    id: 7,
    prompt: "你現在的注意力比較像？",
    options: [
      { text: "飄來飄去，靜不下來", weights: { anxious: 2 } },
      { text: "渙散，看什麼都模糊", weights: { tired: 2 } },
      { text: "容易被小事點燃", weights: { irritated: 2 } },
      { text: "穩穩的，能專注", weights: { calm: 2 } },
    ],
  },
  {
    id: 8,
    prompt: "如果現在播一首歌，你會想聽？",
    options: [
      { text: "輕柔、能讓我冷靜的", weights: { anxious: 1, calm: 1 } },
      { text: "悲傷、唱出心情的", weights: { sad: 2 } },
      { text: "什麼都不想聽", weights: { tired: 1, irritated: 1 } },
      { text: "輕快、有節奏感的", weights: { joyful: 2 } },
    ],
  },
  {
    id: 9,
    prompt: "現在最貼近你的一句話是？",
    options: [
      { text: "好擔心等等會出事", weights: { anxious: 2 } },
      { text: "好像沒有人懂我", weights: { lonely: 2 } },
      { text: "我需要休息", weights: { tired: 2 } },
      { text: "現在這樣剛剛好", weights: { relaxed: 2, calm: 1 } },
    ],
  },
  {
    id: 10,
    prompt: "面對眼前該完成的事，你的心情？",
    options: [
      { text: "壓力山大", weights: { pressure: 2 } },
      { text: "焦慮，怕做不好", weights: { anxious: 2 } },
      { text: "煩，不想面對", weights: { irritated: 2 } },
      { text: "從容，可以慢慢做", weights: { calm: 2, relaxed: 1 } },
    ],
  },
  {
    id: 11,
    prompt: "如果現在能許一個小願望？",
    options: [
      { text: "讓一切慢下來", weights: { pressure: 2, anxious: 1 } },
      { text: "有人抱抱我", weights: { lonely: 2 } },
      { text: "好好睡一覺", weights: { tired: 2 } },
      { text: "希望這份好心情持續下去", weights: { joyful: 2, relaxed: 1 } },
    ],
  },
  {
    id: 12,
    prompt: "現在的你，對周遭的人？",
    options: [
      { text: "有點想躲起來", weights: { sad: 1, lonely: 1 } },
      { text: "容易不耐煩", weights: { irritated: 2 } },
      { text: "想找人說說話", weights: { lonely: 2 } },
      { text: "相處起來很自在", weights: { relaxed: 2, joyful: 1 } },
    ],
  },
  {
    id: 13,
    prompt: "你的呼吸現在比較接近？",
    options: [
      { text: "又快又淺", weights: { anxious: 2, pressure: 1 } },
      { text: "重重的嘆氣", weights: { sad: 2, tired: 1 } },
      { text: "平穩規律", weights: { calm: 2 } },
      { text: "深長放鬆", weights: { relaxed: 2 } },
    ],
  },
  {
    id: 14,
    prompt: "如果用天氣形容你現在的心？",
    options: [
      { text: "雷雨將至，悶熱", weights: { irritated: 2, pressure: 1 } },
      { text: "綿綿細雨", weights: { sad: 2 } },
      { text: "微風晴天", weights: { calm: 1, joyful: 1 } },
      { text: "午後暖陽", weights: { relaxed: 2 } },
    ],
  },
  {
    id: 15,
    prompt: "現在如果有空檔，你最想？",
    options: [
      { text: "把待辦清單解決掉才安心", weights: { anxious: 1, pressure: 2 } },
      { text: "什麼都不做，發呆", weights: { tired: 2 } },
      { text: "找個人聊聊", weights: { lonely: 2 } },
      { text: "享受一下這個當下", weights: { joyful: 1, relaxed: 2 } },
    ],
  },
  {
    id: 16,
    prompt: "面對突發的小狀況，你現在的反應？",
    options: [
      { text: "慌，腦中一片空白", weights: { anxious: 2 } },
      { text: "瞬間火氣上來", weights: { irritated: 2 } },
      { text: "沒力氣處理", weights: { tired: 2 } },
      { text: "冷靜應對", weights: { calm: 2 } },
    ],
  },
  {
    id: 17,
    prompt: "你現在心裡的「重量」感覺像？",
    options: [
      { text: "背著一個重重的包袱", weights: { pressure: 2 } },
      { text: "心口悶悶、空空的", weights: { sad: 1, lonely: 1 } },
      { text: "輕輕的，沒什麼負擔", weights: { relaxed: 2, calm: 1 } },
      { text: "輕盈又有活力", weights: { joyful: 2 } },
    ],
  },
  {
    id: 18,
    prompt: "如果現在閉上眼睛三秒，浮現的是？",
    options: [
      { text: "還沒做完的事", weights: { anxious: 1, pressure: 2 } },
      { text: "一個想念的人", weights: { lonely: 2 } },
      { text: "好想躺下的畫面", weights: { tired: 2 } },
      { text: "一片平靜的空白", weights: { calm: 2, relaxed: 1 } },
    ],
  },
  {
    id: 19,
    prompt: "現在的精神狀態，你給幾分？",
    options: [
      { text: "快沒電了", weights: { tired: 2 } },
      { text: "緊繃滿格但很累", weights: { pressure: 2, anxious: 1 } },
      { text: "煩躁、靜不下來", weights: { irritated: 2 } },
      { text: "飽滿又愉快", weights: { joyful: 2 } },
    ],
  },
  {
    id: 20,
    prompt: "最後，現在的你最需要的是？",
    options: [
      { text: "一個讓我安心、冷靜下來的東西", weights: { anxious: 2, calm: 1 } },
      { text: "一點甜，療癒一下", weights: { sad: 2, lonely: 1 } },
      { text: "補充能量、提振精神", weights: { tired: 2 } },
      { text: "延續現在這份輕鬆愉快", weights: { relaxed: 2, joyful: 1 } },
    ],
  },
];

// ============================================================
//  計分：傳入每題選到的選項 index 陣列，回傳結果
// ============================================================
export interface QuizResult {
  emotion: Emotion;
  scores: Record<Emotion, number>;
  product: Product;
}

export function scoreQuiz(answers: number[]): QuizResult {
  const scores = Object.fromEntries(
    EMOTIONS.map((e) => [e, 0])
  ) as Record<Emotion, number>;

  answers.forEach((optIdx, qIdx) => {
    const q = QUESTIONS[qIdx];
    if (!q) return;
    const opt = q.options[optIdx];
    if (!opt) return;
    for (const [emo, w] of Object.entries(opt.weights)) {
      scores[emo as Emotion] += w ?? 0;
    }
  });

  // 取最高分；平手時依 EMOTIONS 順序取第一個（穩定）
  let top: Emotion = EMOTIONS[0];
  for (const e of EMOTIONS) {
    if (scores[e] > scores[top]) top = e;
  }

  return { emotion: top, scores, product: PRODUCTS[top] };
}
