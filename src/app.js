import React, { useState } from "react";
import "./app.css";
import resultTypes from "./resultTypes";

const questions = [
  {
    text: "當你喜歡的歌手或樂團宣布要發行新專輯時，你的第一反應是什麼？",
    preview: "偶像發新專輯，你會？",
    options: [
      { text: "狂刷各大榜單預測，準備好打榜、買專與各種應援策略。", type: "BIZ" },
      { text: "滿心期待新歌是否帶有獨特的氣氛或節奏。", type: "SOUL" },
      { text: "馬上準備好錢包，周邊、專輯全包，還怕他們累。", type: "FS" },
      { text: "瘋狂解析預告片細節，與大家一起解謎。", type: "DETAIL" }
    ]
  },
  {
    text: "終於搶到演唱會門票了！你最期待現場的哪個環節？",
    preview: "期待演唱會哪個環節？",
    options: [
      { text: "親眼見證現場實力與氣場。", type: "BIZ" },
      { text: "沉浸舞台美學，跟著音樂搖擺。", type: "SOUL" },
      { text: "粉絲一起大合唱，感動羈絆。", type: "FS" },
      { text: "期待冷門B-side現場或特別改編。", type: "DETAIL" }
    ]
  },
  {
    text: "偶像推出全新周邊商品了！你的購買策略是？",
    preview: "看到全新周邊，你？",
    options: [
      { text: "只買最實用聯名，考慮收藏價值。", type: "BIZ" },
      { text: "挑設計感超強單品，當日常穿搭。", type: "SOUL" },
      { text: "全部有logo都收，直接買爆！", type: "FS" },
      { text: "買有彩蛋或概念符號限定款。", type: "DETAIL" }
    ]
  },
  {
    text: "平常怎麼推坑朋友你喜歡的音樂人？",
    preview: "怎麼推坑朋友?",
    options: [
      { text: "亮出數據和獎項，用實績說服他們。", type: "BIZ" },
      { text: "直接放最愛歌，用音樂展現品味。", type: "SOUL" },
      { text: "分享溫暖花絮、可愛私底下片段。", type: "FS" },
      { text: "寫千字文介紹宇宙觀和創作背景。", type: "DETAIL" }
    ]
  },
  {
    text: "偶像突然陷入了一些無傷大雅的公關爭議或謠言，你的第一反應？",
    preview: "偶像有公關爭議你？",
    options: [
      { text: "冷靜分析公司的公關聲明，評估這對他們後續商業代言的影響。", type: "BIZ" },
      { text: "戴上耳機聽他們的音樂，相信作品本身傳達的靈魂才是最真實的。", type: "SOUL" },
      { text: "立刻在社群上幫忙澄清，誓死保護他們不受網路惡意傷害。", type: "FS" },
      { text: "翻找過往訪談和歌詞，試圖拼湊出事件背後的脈絡與真相。", type: "DETAIL" }
    ]
  },
  {
    text: "如果有機會送一份禮物給偶像，你會選擇什麼？",
    preview: "要送偶像禮物，你？",
    options: [
      { text: "一封寫滿對他們近期表現的客觀分析與未來發展建議的長信。", type: "BIZ" },
      { text: "一張精心挑選的絕版黑膠唱片，因為知道他們一定也懂這種老派浪漫。", type: "SOUL" },
      { text: "各種頂級保健食品、護嗓喉糖，希望他們巡演期間能好好照顧身體。", type: "FS" },
      { text: "親手製作的精美紀錄冊，裡面收集了所有關於他們作品的細節與你的心得", type: "DETAIL" }
    ]
  }
];

function getResultType(selectedTypes) {
  if (selectedTypes.length === 0) return null;
  const count = {};
  selectedTypes.forEach(type => count[type] = (count[type] || 0) + 1);
  const sorted = Object.entries(count).sort((a, b) => b[1] - a[1]);
  return sorted.length > 0 ? sorted[0][0] : null;
}

function formatTime(n) {
  return n < 10 ? `0:0${n}` : `0:${n}`;
}

export default function App() {
  // 新增一個狀態來控制是否顯示封面頁
  const [isStarted, setIsStarted] = useState(false);
  
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const total = questions.length;
  const percent = total > 1 ? ((step) / (total - 1)) * 100 : 100; 

  function handleOptionClick(optionType) {
    setAnswers(prev => [...prev, optionType]);
    setStep(prev => prev + 1);
  }

  // ===== 1. 尚未開始時，顯示封面頁 =====
  if (!isStarted) {
    return (
      <div className="main-bg">
        {/* 這裡的 class 可以在 app.css 裡對應我們剛剛寫的封面樣式 */}
        <div className="cover-screen">
          <div className="cover-bg-blur"></div> 
          <div className="cover-content">
            <div className="album-tag">NEW RELEASE</div>
            <h1 className="main-title">測出你的飯圈 DNA</h1>
            <p className="sub-title">刻錄你的追星軌跡，播放靈魂深處的專屬單曲<br/>透過 6 題情境心理測驗，解鎖你的專屬黑膠。</p>
            <button className="play-button" onClick={() => setIsStarted(true)}>▶ 立即播放</button>
          </div>
        </div>
      </div>
    );
  }

  // ===== 2. 測驗結束時，顯示結果頁 =====
  if (step >= total) {
    const resultCode = getResultType(answers);
    const result = resultTypes[resultCode];
    const themeKey = resultCode ? resultCode.toLowerCase() + '-theme' : '';
    
    if (!result) {
      return (
        <div className="main-bg">
          <div className="center-card">
            <h2>查無此型別結果：{String(resultCode)}</h2>
            <div>請確認 options 的 type 是否對應 resultTypes.js 的 key！</div>
            <button className="try-again-btn" onClick={() => { setIsStarted(false); setStep(0); setAnswers([]); }}>再測一次</button>
          </div>
        </div>
      );
    }
    return (
      <div className="main-bg">
        <div className={`center-card ${themeKey}`}>
          <div className="vinyl-area move-down">
            <img src={result.vinylImg} alt={result.title} className="vinyl-spin" />
            <div className="vinyl-dot"></div>
          </div>
          <h2 className={`result-title ${themeKey}`}>{result.title}</h2>
          <p className="result-desc">{result.desc}</p>
          <hr className="result-hr" />
          <div className="rec-song">
            <b>推薦單曲：</b>{result.song}
          </div>
          <button className="try-again-btn" onClick={() => { setIsStarted(false); setStep(0); setAnswers([]); }}>再測一次</button>
        </div>
      </div>
    );
  }

  // ===== 3. 測驗進行中，顯示題目 =====
  return (
    <div className="main-bg">
      <div className="center-card">
        {/* 音樂進度條 */}
        <div className="music-progress-row">
          <span className="music-time">{formatTime(step + 1)}</span>
          <div className="music-bar-outer">
            <div className="music-bar-bg"></div>
            <div
              className="music-bar"
              style={{ width: `${percent}%` }}
            ></div>
            <span
              className="music-dot"
              style={{ left: `calc(${percent}% - 11px)` }}
            ></span>
          </div>
          <span className="music-time">{formatTime(total)}</span>
        </div>
        {/* 主題題目置中 */}
        <div className="quiz-qtext quiz-qtext-center">{questions[step].text}</div>
        <div className="quiz-options">
          {questions[step].options.map((opt, idx) => (
            <button
              className="playlist-btn"
              key={idx}
              onClick={() => handleOptionClick(opt.type)}
            >
              {opt.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}