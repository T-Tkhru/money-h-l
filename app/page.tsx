"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const nedan = [
    100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1500, 2000, 2500, 3000,
    3500, 4000, 4500, 5000, 5500, 6000, 6500, 7000, 7500, 8000, 8500, 9000,
    9500, 10000, 15000, 20000, 25000, 30000, 35000, 40000, 45000, 50000, 55000,
    60000, 65000, 70000, 75000, 80000, 85000, 90000, 95000, 100000,
  ];
  const zyutugo = ["高い", "安い", "ちょうどいい"];

  // 100から10000の間で100刻みの乱数を生成
  // const getRandomNedan = () => {
  //   return Math.floor(Math.random() * (10000 / 100)) * 100 + 100;
  // };

  const getRandomNedan = () => nedan[Math.floor(Math.random() * nedan.length)];
  const getRandomZyutugo = () =>
    zyutugo[Math.floor(Math.random() * zyutugo.length)];

  const [randomNedan, setRandomNedan] = useState(0);
  const [randomZyutugo, setRandomZyutugo] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [start, setStart] = useState(false);

  const resetState = () => {
    const newNedan = getRandomNedan();
    const newZyutugo = getRandomZyutugo();
    setRandomNedan(newNedan);
    setRandomZyutugo(newZyutugo);
    setInputValue("");
    setSubmitted(false);
    setShowAnswer(false);
  };

  useEffect(() => {
    resetState();
  }, []);

  const handleOkClick = () => {
    if (inputValue.trim() === "") {
      alert("入力欄に文字を入力してください。");
      return;
    }
    setSubmitted(true);
  };

  const handleAnswerClick = () => {
    setShowAnswer(true);
  };

  const handleNextClick = () => {
    resetState();
  };

  return (
    <div>
      <div className="w-full text-center p-4">
        <h1 className="text-3xl md:text-7xl my-3 md:mb-6">
          お金の価値観クイズ
        </h1>
        {!start ? (
          <div>
            <button
              onClick={() => setStart(true)}
              className="p-2 md:text-4xl bg-blue-500 text-white rounded"
            >
              Start!
            </button>
          </div>
        ) : (
          <div>
            {/* OKボタンが押される前の表示 */}
            {!submitted && (
              <div className="text-2xl md:text-5xl flex flex-col space-y-1 md:space-y-4">
                <p className="text-red-600">{randomNedan}円</p>
                <p>が</p>
                <p>
                  <span className="text-blue-600">{randomZyutugo}</span>{" "}
                  と思うもの
                </p>
              </div>
            )}

            {/* OKボタンが押された後の表示 */}
            {submitted && (
              <div className="text-2xl md:text-5xl flex flex-col space-y-1 md:space-y-4">
                <p className="text-red-600">{inputValue}</p>
                <p>が</p>
                <p>
                  <span className="text-blue-600">{randomZyutugo}</span>{" "}
                  と思う金額
                </p>
              </div>
            )}

            {!submitted ? (
              <div className="mt-4">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="border p-2 rounded md:text-4xl"
                  placeholder="文字を入力（12文字以内）"
                  maxLength={12}
                />
                <button
                  onClick={handleOkClick}
                  className="ml-2 p-2 md:text-4xl bg-blue-500 text-white rounded"
                >
                  OK
                </button>
              </div>
            ) : (
              <div className="mt-4">
                {!showAnswer ? (
                  <button
                    onClick={handleAnswerClick}
                    className="p-2 md:text-4xl bg-green-500 text-white rounded"
                  >
                    Answer
                  </button>
                ) : (
                  <div>
                    <p className="mt-4 text-2xl md:text-5xl">{randomNedan}円</p>
                    <button
                      onClick={handleNextClick}
                      className="mt-4 p-2 md:text-4xl bg-purple-500 text-white rounded"
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
      <div className="asobikata mx-2">
        <h2>遊び方</h2>
        <ul className="list-disc list-inside ml-4 space-y-3">
          <li>
            出題者はお題に合ったものを入力し、OKボタンを押します（例:漫画、遊園地の入場料、遠足のおやつ代、焼肉食べ放題の料金）
          </li>
          <li>解答側は表示された文章からお題の金額を予想します</li>
          <li>
            answerボタンを押すと答えが表示されます。一番近かった人が勝利です
          </li>
        </ul>
        <h2 className="pt-2">
          2024/10/21更新: お題の金額は[100, 200, 300, 400, 500, 600, 700, 800,
          900, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000,
          6500, 7000, 7500, 8000, 8500, 9000, 9500, 10000, 15000, 20000, 25000,
          30000, 35000, 40000, 45000, 50000, 55000, 60000, 65000, 70000, 75000,
          80000, 85000, 90000, 95000, 100000]からランダムに決定されます
        </h2>
      </div>
    </div>
  );
}
