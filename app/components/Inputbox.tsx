import React, { useState } from "react";

interface InputProps {
  addName: (name: string) => void;
  addKey: (key: string) => void;
  addHandicap: (handicap: number) => void;
  checkDuplicate: (name: string, key: string) => number;
  onSubmit: () => void;
}

const Inputbox: React.FC<InputProps> = ({
  addName,
  addKey,
  addHandicap,
  checkDuplicate,
  onSubmit,
}) => {
  const [name, setName] = useState<string>("");
  const [key, setKey] = useState<string>("");
  const [handicap, setHandicap] = useState<string>("0");
  const [error, setError] = useState<number>(0);

  const nameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const keyChange = (key: string) => {
    setKey(key.toUpperCase());
  };

  const handicapChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (!isNaN(Number(value))) {
      setHandicap(value);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (name.trim() && key.trim() && handicap.trim()) {
      const check = checkDuplicate(name, key);
      if (check === 0) {
        addName(name);
        addKey(key);
        addHandicap(Number(handicap));
        onSubmit();
        setName("");
        setKey("");
        setHandicap("0");
        setError(0);
      } else if (check === 1) {
        setError(1);
        setName("");
      } else if (check === 2) {
        setError(2);
        setKey("");
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const forbiddenKeys = [
      "Backspace",
      "Enter",
      "Escape",
      "F1",
      "F2",
      "F3",
      "F4",
      "F5",
      "F6",
      "F7",
      "F8",
      "F9",
      "F10",
      "F11",
      "F12",
      "Control",
      "Alt",
      "Meta",
      "CapsLock",
      "Insert",
      "Process",
      "PageUp",
      "PageDown",
      "End",
      "Home",
      "ArrowLeft",
      "ArrowUp",
      "ArrowRight",
      "ArrowDown",
    ]; // 禁止キー
    if (forbiddenKeys.includes(e.key)) {
      e.preventDefault(); // 禁止キーを防ぐ
    } else {
      keyChange(e.key);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>プレイヤー名</h2>
        <input
          type="text"
          value={name}
          onChange={nameChange}
          className=""
          placeholder="プレイヤー名を入力"
        />
        {error === 1 && <p style={{ color: "red" }}>重複しています</p>}
        <h2>ボタンとなるキー</h2>
        <input
          type="text"
          value={key}
          onKeyDown={handleKeyDown}
          className=""
          placeholder="例:A(半角のみ)"
        />
        {error === 2 && <p style={{ color: "red" }}>重複しています</p>}
        <h2>ハンデ（秒単位で入力）</h2>
        <input
          type="text"
          value={handicap}
          onChange={handicapChange}
          className=""
          placeholder="入力なしは0 (例:0.4)"
        />
        <button
          className=" border-solid border-gray-400 border-2 mt-3 mx-auto block "
          type="submit"
        >
          追加
        </button>
      </form>
    </>
  );
};

export default Inputbox;
