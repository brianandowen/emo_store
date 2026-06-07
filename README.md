# 情緒點心 Mood Snack
中原大學附設冠英心理治療所 合作｜情緒覺察 × 慰藉食物推薦

## 快速開始
```bash
npm install
npm run dev      # http://localhost:3000
```

## 換成你自己的商品圖
把去背 PNG 放進 `public/products/`，檔名必須對應下表（覆蓋佔位圖即可）：

| 情緒 | 商品 | 檔名 |
|---|---|---|
| anxious 焦慮 | 無糖綠茶 | green_tea.png |
| pressure 壓力 | 85% 黑巧克力 | dark_chocolate.png |
| sad 難過 | 草莓小蛋糕 | strawberry_cake.png |
| tired 疲倦 | 100% 柳橙汁 | orange_juice.png |
| irritated 煩躁 | 氣泡水 | sparkling_water.png |
| lonely 孤單 | 熱可可 | hot_cocoa.png |
| calm 平靜 | 鮮乳 | milk.png |
| joyful 愉悅 | 洋芋片 | potato_chips.png |
| relaxed 放鬆 | 無糖豆漿 | soy_milk.png |

## 部署到 Vercel
1. 把這個資料夾 push 到 GitHub
2. Vercel → New Project → Import 該 repo → Deploy（不需設定任何環境變數）

## 環境變數
本版純前端，**不需要** env。`.env.local.example` 內的 DATABASE_URL
僅供日後想加 Neon 統計時參考。
