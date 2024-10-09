"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const nedan = [
    100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 2000, 3000, 4000, 5000,
    6000, 7000, 8000, 9000, 10000,
  ];
  const zyutugo = ["高い", "安い", "ちょうどいい"];

  const getRandomNedan = () => nedan[Math.floor(Math.random() * nedan.length)];
  const getRandomZyutugo = () =>
    zyutugo[Math.floor(Math.random() * zyutugo.length)];

  const [randomNedan, setRandomNedan] = useState(0);
  const [randomZyutugo, setRandomZyutugo] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [displayText, setDisplayText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const resetState = () => {
    const newNedan = getRandomNedan();
    const newZyutugo = getRandomZyutugo();
    setRandomNedan(newNedan);
    setRandomZyutugo(newZyutugo);
    setInputValue("");
    setDisplayText("");
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
        {/* OKボタンが押される前の表示 */}
        {!submitted && (
          <div className="text-2xl md:text-5xl flex flex-col space-y-1 md:space-y-4">
            <p className="text-red-600">{randomNedan}円</p>
            <p>が</p>
            <p>
              <span className="text-blue-600">{randomZyutugo}</span> と思うもの
            </p>
          </div>
        )}

        {/* OKボタンが押された後の表示 */}
        {submitted && (
          <div className="text-2xl md:text-5xl flex flex-col space-y-1 md:space-y-4">
            <p className="text-red-600">{inputValue}</p>
            <p>が</p>
            <p>
              <span className="text-blue-600">{randomZyutugo}</span> と思う金額
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
                className="p-2 bg-green-500 text-white rounded"
              >
                answer
              </button>
            ) : (
              <div>
                <p className="mt-4 text-2xl md:text-5xl">{randomNedan}円</p>
                <button
                  onClick={handleNextClick}
                  className="mt-4 p-2 bg-purple-500 text-white rounded"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
