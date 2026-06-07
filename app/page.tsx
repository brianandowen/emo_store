"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  QUESTIONS,
  scoreQuiz,
  EMOTION_LABEL,
  type QuizResult,
} from "@/lib/quiz";

type Stage = "intro" | "quiz" | "result";

export default function Home() {
  const [stage, setStage] = useState<Stage>("intro");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<QuizResult | null>(null);

  const start = () => {
    setAnswers([]);
    setStep(0);
    setStage("quiz");
  };

  const choose = (optIdx: number) => {
    const next = [...answers];
    next[step] = optIdx;
    setAnswers(next);

    if (step + 1 < QUESTIONS.length) {
      // 小延遲讓點擊回饋更自然
      setTimeout(() => setStep(step + 1), 160);
    } else {
      setResult(scoreQuiz(next));
      setTimeout(() => setStage("result"), 160);
    }
  };

  const restart = () => {
    setResult(null);
    setStage("intro");
  };

  // ---------------- INTRO ----------------
  if (stage === "intro") {
    return (
      <main className="wrap">
        <section className="hero">
          <div className="kicker">中原大學附設冠英心理治療所 · 合作開發</div>
          <h1 className="title serif">
            情緒便利店
          </h1>
          <p className="subtitle">
            花三分鐘，回答 20 個關於「現在」的小問題。
            我們會陪你看清此刻的情緒，
            並為你選一份剛剛好的情緒商品。
          </p>
          <button className="cta" onClick={start}>
            開始 · 探索我的情緒
          </button>
          <p className="brandline">
            本工具以情緒覺察與「慰藉食物（comfort food）」研究為設計基礎，
            <br />
            屬陪伴性質的自我照顧小工具，非醫療診斷或治療。
          </p>
          <Link href="/about" className="about-link">
            想了解計算方法與商品介紹？
          </Link>
        </section>
      </main>
    );
  }

  // ---------------- QUIZ ----------------
  if (stage === "quiz") {
    const q = QUESTIONS[step];
    const pct = Math.round(((step) / QUESTIONS.length) * 100);
    return (
      <main className="wrap">
        <div className="progress-label">
          第 {step + 1} / {QUESTIONS.length} 題
        </div>
        <div className="progress">
          <span style={{ width: `${pct}%` }} />
        </div>

        <section className="card" key={q.id}>
          <div className="qnum">Q{String(q.id).padStart(2, "0")}</div>
          <h2 className="qprompt serif">{q.prompt}</h2>
          {q.options.map((opt, i) => (
            <button key={i} className="opt" onClick={() => choose(i)}>
              <span className="dot" />
              <span>{opt.text}</span>
            </button>
          ))}
        </section>
      </main>
    );
  }

  // ---------------- RESULT ----------------
  if (stage === "result" && result) {
    const p = result.product;
    return (
      <main className="wrap">
        <section className="card result">
          <span className="emo-label">
            此刻的你 · {EMOTION_LABEL[result.emotion]}
          </span>
          <h2>為你選的情緒商品是</h2>
          <div className="pname serif">{p.name}</div>
          <div className="tagline">{p.tagline}</div>

          <div className="prod-img-box">
            <Image
              src={`/products/${p.image}.png`}
              alt={p.name}
              width={220}
              height={220}
              priority
            />
          </div>

          <div className="reason">
            <b>為什麼是這個？</b>
            <br />
            {p.reason}
          </div>

          <button className="retry" onClick={restart}>
            再測一次
          </button>

          <p className="disclaimer">
            本結果僅為情緒覺察與自我照顧之輔助參考，不構成醫療、營養或心理診斷與治療建議。
            若你正經歷持續的情緒困擾，歡迎與中原大學附設冠英心理治療所聯繫，由專業人員陪伴你。
          </p>
        </section>
      </main>
    );
  }

  return null;
}
