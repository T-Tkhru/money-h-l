"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Hayaoshibutton from "./Hayaoshibutton";

interface HayaoshiProps {
  member?: number;
  names?: string[];
  keys?: string[];
  handicap?: number[];
  finish: (collect: number[]) => void;
}

const Hayaoshi: React.FC<HayaoshiProps> = ({
  member = 4,
  names = ["aaaaa", "bbbbb", "ccccc", "ddddd"],
  keys = ["A", "S", "D", "F"],
  handicap = [0.3, 0, 0, 0],
  finish,
}) => {
  const [items, setItems] = useState<string[]>([]);
  const [collect, setCollect] = useState<number[]>(Array(member).fill(0)); // 四人の正解数を格納する配列
  //色を10種類用意した配列
  const colors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-pink-500",
    "bg-purple-500",
    "bg-lime-500",
    "bg-orange-500",
    "bg-cyan-500",
    "bg-teal-500",
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null); // 新しい ref を追加

  // 動的なキー処理
  const keyHandlerMap: { [key: string]: () => void } = {};

  // keys 配列に基づいて keyHandlerMap を生成
  keys.forEach((key, index) => {
    const delay = (handicap[index] || 0) * 1000; // `handicap` 配列から遅延時間を取得
    keyHandlerMap[key.toLowerCase()] = () => {
      setTimeout(() => {
        setItems((prevItems) => {
          if (!prevItems.includes(key)) {
            return [...prevItems, key];
          }
          return prevItems;
        });
      }, delay);
    };
  });

  const keyDownHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (items.length > 0) {
      return;
    } // 解答者がいる場合は何もしない,これ残すかどうかは要検討
    const key = e.key.toLowerCase(); // 小文字に変換して比較
    if (keyHandlerMap[key]) {
      keyHandlerMap[key](); // マッピングされた関数を呼び出す
    }
  };

  const answer = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const key = e.key;

    if (key === "Enter" && items.length > 0) {
      setCollect((prevCollect) => {
        const newCollect = [...prevCollect];
        newCollect[keys.indexOf(items[0])] += 1;
        return newCollect;
      });
      setItems([]);
    }

    if (key === "Backspace" && items.length > 0) {
      setItems((prevItems) => prevItems.slice(1));
    }
  };

  const Finish = () => {
    finish(collect);
  };

  useEffect(() => {
    if (items.length > 0 && contentRef.current) {
      contentRef.current.focus();
    } else if (containerRef.current) {
      containerRef.current.focus();
    }
  }, [items.length]);
  return (
    <>
      <div
        className="bg-white relative outline-none rounded-xl max-w-screen-lg w-5/6 mx-auto h-full my-3"
        tabIndex={0}
        onKeyDown={keyDownHandler}
        ref={containerRef}
      >
        {items.length > 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-50 z-40 rounded-xl"></div>
        )}
        {items.length > 0 && (
          <div
            className="answerarea fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-2/3 w-4/6 mx-auto bg-cyan-200 z-50 flex flex-col justify-between outline-none rounded-lg"
            tabIndex={0}
            onKeyDown={answer}
            ref={contentRef} // contentRef を使用
          >
            <div className="answer text-center">
              <h2 className="pt-10 text-4xl">解答者</h2>
              <p className="text-7xl py-10">{names[keys.indexOf(items[0])]}</p>
              <div className="flex justify-center space-x-4 pt-4">
                <p className="text-3xl font-sans">〇:Enter</p>
                <p className="text-3xl font-sans">×:Backspace</p>
              </div>
            </div>

            <div className="next flex flex-row p-2 bg-white rounded-b-lg">
              <h2 className="text-xl ">Next⇒</h2>
              <ul className="flex w-auto px-2 flex-wrap">
                {items.map((item, index) => {
                  if (index === 0) return null; // 1つ目の要素を飛ばす
                  return (
                    <li key={index} className="text-xl px-3">
                      {index + 1} :{names[keys.indexOf(item)]}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}
        <div className="playerWrapper flex flex-wrap w-full justify-center pt-4 px-4">
          {collect.map((count, index) => (
            <Hayaoshibutton
              key={index}
              keyButton={keys[index]}
              name={names[index]}
              score={count}
              color={colors[index]}
              maxScore={Math.max(...collect)}
            />
          ))}
        </div>
        <div className="flex justify-center pb-4 pt-3">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:opacity-80 duration-300"
            onClick={Finish}
          >
            Finish!!!
          </button>
        </div>
      </div>
    </>
  );
};

export default Hayaoshi;
