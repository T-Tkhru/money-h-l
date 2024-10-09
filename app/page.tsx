import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1 className="text-5xl text-center py-3">Money H L</h1>
      <h2>ルール</h2>
      <p>aaaaaaa</p>
      <h2>使い方</h2>
      <p>bbbbbbb</p>
      <Link href="/game" className="text-blue-700">
        スタート
      </Link>
    </div>
  );
}
