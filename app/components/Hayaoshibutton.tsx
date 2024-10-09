import React, { useState } from "react";

interface InputProps {
  keyButton: string;
  name: string;
  score: number;
  className?: string;
  color: string;
  maxScore: number;
}

const Hayaoshibutton: React.FC<InputProps> = ({
  keyButton,
  name,
  score,
  className,
  color,
  maxScore,
}) => {
  return (
    <div
      className={`${className} ${
        score === maxScore && maxScore !== 0 ? "bg-blue-300 rounded-xl" : ""
      } flex flex-col text-center px-4 py-1`}
    >
      <div
        className={`button ${color} w-40 aspect-square border-solid border-2 flex items-center justify-center mb-2 rounded-xl`}
      >
        <p className="text-white text-5xl">{keyButton}</p>
      </div>
      <h2>{name}</h2>
      <h2>score : {score}</h2>
    </div>
  );
};

export default Hayaoshibutton;
