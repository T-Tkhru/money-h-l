import Image from "next/image";

interface HayaoshiProps {
  names: string[];
  result: number[];
  setDisplay: (display: number) => void;
  setResult: (result: number[]) => void;
  memberReset: () => void;
}

interface Player {
  name: string;
  score: number;
  rank?: number; // rankをオプショナルプロパティとして追加
}

const Result: React.FC<HayaoshiProps> = ({
  names,
  result,
  setDisplay,
  setResult,
  memberReset,
}) => {
  const setDisplayHayaoshi = () => {
    setDisplay(1);
    setResult([]);
  };
  const setDisplayHome = () => {
    setDisplay(0);
    memberReset();
  };

  const setDisplayHome2 = () => {
    setDisplay(0);
  };

  // プレイヤー名とスコアを結びつけ、スコアで降順にソート
  const players: Player[] = names
    .map((name, index) => ({ name, score: result[index] }))
    .sort((a, b) => b.score - a.score);

  // 順位を計算
  const rankedPlayers = players.reduce<Player[]>((acc, player, index, arr) => {
    const lastRank = acc.length > 0 ? acc[acc.length - 1].rank : 0;
    const lastScore = acc.length > 0 ? acc[acc.length - 1].score : null;

    if (lastScore === player.score) {
      // 同点の場合、前の順位を維持
      acc.push({ ...player, rank: lastRank });
    } else {
      // 異なるスコアの場合、新しい順位
      acc.push({ ...player, rank: index + 1 });
    }

    return acc;
  }, []);

  return (
    <>
      <div className="bg-white flex flex-col items-center pagewrapper w-5/6 max-w-screen-lg mx-auto h-full my-5 flex-1 rounded-xl">
        <div className="flex flex-col items-center justify-between h-full">
          <h1 className="text-7xl my-3">Result</h1>
          <table className="table-auto w-auto my-2">
            <tbody>
              {rankedPlayers.map((player, index) => (
                <tr key={index} className="text-xl">
                  <td className="px-4 py-0 text-center">
                    {player.rank === 1 ? (
                      <Image
                        src="/first.png"
                        alt="Crown"
                        width={30}
                        height={30}
                        className="inline  fill-current mb-1"
                      />
                    ) : player.rank === 2 ? (
                      <Image
                        src="/second.png"
                        alt="Crown"
                        width={30}
                        height={30}
                        className="inline  fill-current mb-1"
                      />
                    ) : player.rank === 3 ? (
                      <Image
                        src="/third.png"
                        alt="Crown"
                        width={30}
                        height={30}
                        className="inline  fill-current mb-1"
                      />
                    ) : (
                      player.rank
                    )}
                  </td>
                  <td className="px-4 py-2">{player.name}</td>
                  <td className="px-4 py-2">{player.score}pt</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex space-x-2 mb-4 mt-auto">
          <button
            className="bg-blue-500 text-white w-auto h-10 rounded-md px-4 hover:opacity-80 duration-300"
            onClick={setDisplayHayaoshi}
          >
            再戦
          </button>
          <button
            className="bg-blue-500 text-white w-auto h-10 rounded-md px-4 hover:opacity-80 duration-300"
            onClick={setDisplayHome}
          >
            Homeに戻る（プレイヤー情報はリセットされます）
          </button>
          <button
            className="bg-blue-500 text-white w-auto h-10 rounded-md px-4 hover:opacity-80 duration-300"
            onClick={setDisplayHome2}
          >
            メンバー変更
          </button>
        </div>
      </div>
    </>
  );
};

export default Result;
