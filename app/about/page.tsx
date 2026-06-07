"use client";

import Link from "next/link";
import Image from "next/image";
import {
  QUESTIONS,
  PRODUCTS,
  EMOTIONS,
  EMOTION_LABEL,
} from "@/lib/quiz";

export default function About() {
  return (
    <main className="wrap about">
      <Link href="/" className="back">← 回到測驗</Link>

      <header className="about-hero">
        <div className="kicker">關於這套系統</div>
        <h1 className="title serif">它是怎麼<br />讀懂你的？</h1>
        <p className="subtitle">
          這裡完整公開計分方法與每一份情緒點心的設計理由，
          讓這份推薦對你來說是透明、可被理解的。
        </p>
      </header>

      {/* ---------- 計分方法 ---------- */}
      <section className="block">
        <h2 className="block-title serif">一、計分方法</h2>

        <div className="step">
          <span className="step-no">1</span>
          <div>
            <b>20 題、一頁一題</b>
            <p>每題描述一種「當下的狀態」（畫面、身體感受、呼吸、天氣比喻等），
            提供 4 個選項，你只要選最貼近此刻的那一個。</p>
          </div>
        </div>

        <div className="step">
          <span className="step-no">2</span>
          <div>
            <b>每個選項對「情緒」加權計分</b>
            <p>九種情緒各有一個分數槽，初始皆為 0。你每選一個選項，
            系統就把該選項對應的情緒分數加上去。一個選項可能同時為 1～2 種情緒加分，
            權重多為 1 或 2 分。</p>
          </div>
        </div>

        <div className="step">
          <span className="step-no">3</span>
          <div>
            <b>取最高分的情緒</b>
            <p>20 題答完後，比較九種情緒的總分，分數最高的就是「你此刻的主要情緒」。
            若有同分，依固定順序取第一個，確保每次結果穩定可重現。</p>
          </div>
        </div>

        <div className="step">
          <span className="step-no">4</span>
          <div>
            <b>對應到一份情緒點心</b>
            <p>每一種情緒都對應一個專屬商品（見下方對照表），系統據此推薦給你。
            全程在你的瀏覽器端完成計算，<b>不會儲存任何作答紀錄</b>。</p>
          </div>
        </div>

        <div className="formula">
          <div className="formula-label">計算式</div>
          <code>
            每情緒總分 = Σ（各題所選選項對該情緒的權重）
            <br />
            推薦情緒 = argmax（九種情緒總分）
          </code>
        </div>

        <p className="note">
          共 {QUESTIONS.length} 題，涵蓋焦慮、壓力、難過、疲倦、煩躁、孤單、平靜、愉悅、放鬆九種情緒面向。
        </p>
      </section>

      {/* ---------- 情緒 × 商品對照 ---------- */}
      <section className="block">
        <h2 className="block-title serif">二、情緒 × 商品對照</h2>
        <div className="grid">
          {EMOTIONS.map((emo) => {
            const p = PRODUCTS[emo];
            return (
              <article className="pcard" key={emo}>
                <div className="pcard-img">
                  <Image
                    src={`/products/${p.image}.png`}
                    alt={p.name}
                    width={200}
                    height={200}
                  />
                </div>
                <div className="pcard-emo">{EMOTION_LABEL[emo]}</div>
                <h3 className="pcard-name serif">{p.name}</h3>
                <p className="pcard-tag">「{p.tagline}」</p>
                <p className="pcard-reason">{p.reason}</p>
              </article>
            );
          })}
        </div>
      </section>

      {/* ---------- 限制與倫理 ---------- */}
      <section className="block">
        <h2 className="block-title serif">三、限制與使用提醒</h2>
        <p className="ethics">
          本系統以「情緒覺察」與「慰藉食物（comfort food）」研究為設計基礎。
          現有研究指出，慰藉食物對情緒的改善多為短暫，且效果因人、因情境、
          因個人期待與記憶而異，並非對每個人都有相同作用。
          因此本工具屬於<b>陪伴性質的自我照顧小工具</b>，
          其結果<b>不構成醫療、營養或心理之診斷與治療建議</b>。
          若你正經歷持續的情緒困擾，歡迎與中原大學附設冠英心理治療所聯繫，
          由專業人員陪伴你。
        </p>
      </section>

      <Link href="/" className="cta about-cta">開始測驗 →</Link>
    </main>
  );
}
