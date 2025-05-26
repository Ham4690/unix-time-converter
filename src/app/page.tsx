"use client";

import { useState, useEffect } from "react";

export default function Home() {
  // 現在のUnixタイムと日付を保持するstate
  const [currentUnixTime, setCurrentUnixTime] = useState<number>(0);
  const [currentDate, setCurrentDate] = useState<string>("");
  const [isMilliseconds, setIsMilliseconds] = useState<boolean>(false);

  // Unix時間から日付への変換用state
  const [unixTimeInput, setUnixTimeInput] = useState<string>("");
  const [dateResult, setDateResult] = useState<string>("");

  // 日付からUnix時間への変換用state
  const [dateInput, setDateInput] = useState<string>("");
  const [timeInput, setTimeInput] = useState<string>("");
  const [unixTimeResult, setUnixTimeResult] = useState<string>("");

  // エラーメッセージ用state
  const [error, setError] = useState<string>("");

  // 現在の時刻を更新する関数
  useEffect(() => {
    const updateCurrentTime = () => {
      const now = new Date();
      const unixTime = isMilliseconds
        ? now.getTime()
        : Math.floor(now.getTime() / 1000);
      setCurrentUnixTime(unixTime);
      setCurrentDate(formatDate(now));
    };

    // 初回実行
    updateCurrentTime();

    // 1秒ごとに更新
    const intervalId = setInterval(updateCurrentTime, 1000);

    // クリーンアップ関数
    return () => clearInterval(intervalId);
  }, []);

  // 日付をフォーマットする関数
  const formatDate = (date: Date): string => {
    return date.toISOString().replace("T", " ").substring(0, 19);
  };

  // Unixタイムから日付に変換する関数
  const convertUnixTimeToDate = () => {
    try {
      setError("");
      const unixTime = parseInt(unixTimeInput);

      if (isNaN(unixTime)) {
        setError("有効な数値を入力してください");
        return;
      }

      const date = new Date(isMilliseconds ? unixTime : unixTime * 1000);
      setDateResult(formatDate(date));
    } catch (err) {
      console.error("Unix時間変換エラー:", err);
      setError("変換中にエラーが発生しました");
    }
  };

  // 日付からUnixタイムに変換する関数
  const convertDateToUnixTime = () => {
    try {
      setError("");

      if (!dateInput) {
        setError("日付を入力してください");
        return;
      }

      const dateTimeString = `${dateInput}${
        timeInput ? "T" + timeInput : "T00:00:00"
      }`;
      const date = new Date(dateTimeString);

      if (isNaN(date.getTime())) {
        setError("有効な日付と時間を入力してください");
        return;
      }

      const unixTime = isMilliseconds
        ? date.getTime()
        : Math.floor(date.getTime() / 1000);
      setUnixTimeResult(`${unixTime} ${isMilliseconds ? "ms" : "sec"}`);
    } catch (err) {
      console.error("日付変換エラー:", err);
      setError("変換中にエラーが発生しました");
    }
  };

  return (
    <div className="min-h-screen p-6 flex flex-col items-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <header className="w-full max-w-4xl mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Unix時間変換ツール</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Unix時間と日付を相互に変換するシンプルなツール
        </p>
      </header>

      <main className="w-full max-w-4xl flex flex-col gap-8">
        {/* 現在の時刻表示 */}
        <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">現在の時刻</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Unix時間:
                </p>
                <button
                  onClick={() => setIsMilliseconds(!isMilliseconds)}
                  className={`px-3 py-1 text-xs rounded-md ${
                    isMilliseconds
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 dark:bg-gray-600"
                  }`}
                >
                  {isMilliseconds ? "ms" : "sec"}
                </button>
              </div>
              <p className="text-2xl font-mono">{currentUnixTime}</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
              <p className="text-sm text-gray-500 dark:text-gray-400">日時:</p>
              <p className="text-2xl font-mono">{currentDate}</p>
            </div>
          </div>
        </section>

        {/* Unix時間から日付への変換 */}
        <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Unix時間から日付に変換</h2>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                value={unixTimeInput}
                onChange={(e) => setUnixTimeInput(e.target.value)}
                placeholder={`Unix時間を入力 (例: ${
                  isMilliseconds ? "1620000000000" : "1620000000"
                })`}
                className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
              />
              <button
                onClick={convertUnixTimeToDate}
                className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                変換
              </button>
            </div>
            {dateResult && (
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  変換結果:
                </p>
                <p className="text-xl font-mono">{dateResult}</p>
              </div>
            )}
          </div>
        </section>

        {/* 日付からUnix時間への変換 */}
        <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">日付からUnix時間に変換</h2>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="date"
                value={dateInput}
                onChange={(e) => setDateInput(e.target.value)}
                className="p-3 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
              />
              <input
                type="time"
                value={timeInput}
                onChange={(e) => setTimeInput(e.target.value)}
                className="p-3 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
              />
            </div>
            <button
              onClick={convertDateToUnixTime}
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              変換
            </button>
            {unixTimeResult && (
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  変換結果:
                </p>
                <p className="text-xl font-mono">{unixTimeResult}</p>
              </div>
            )}
          </div>
        </section>

        {/* エラーメッセージ */}
        {error && (
          <div className="p-4 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-md">
            {error}
          </div>
        )}
      </main>

      <footer className="mt-12 text-center text-gray-500 dark:text-gray-400 text-sm">
        <p>© {new Date().getFullYear()} Unix時間変換ツール</p>
        <p className="mt-1">
          <a
            href="https://github.com/yourusername/unix-time-converter"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-blue-600 dark:hover:text-blue-400"
          >
            GitHub
          </a>
        </p>
      </footer>
    </div>
  );
}
