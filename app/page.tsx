"use client";

import { useState } from "react";

export default function Home() {
  const [unixTime, setUnixTime] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [result, setResult] = useState("");

  const convertUnixToDateTime = () => {
    try {
      const timestamp = parseInt(unixTime);
      if (isNaN(timestamp)) {
        setResult("無効なUnixタイムスタンプです");
        return;
      }

      const date = new Date(timestamp);
      setResult(date.toISOString());
    } catch (error) {
      setResult(
        `変換に失敗しました: ${
          error instanceof Error ? error.message : "不明なエラー"
        }`
      );
    }
  };

  const convertDateTimeToUnix = () => {
    try {
      const date = new Date(dateTime);
      if (isNaN(date.getTime())) {
        setResult("無効な日時形式です");
        return;
      }

      setResult(date.getTime().toString());
    } catch (error) {
      setResult(
        `変換に失敗しました: ${
          error instanceof Error ? error.message : "不明なエラー"
        }`
      );
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Unix Time Converter</h1>

      <div style={{ marginBottom: "20px" }}>
        <h2>Unix Time to DateTime</h2>
        <input
          type="text"
          value={unixTime}
          onChange={(e) => setUnixTime(e.target.value)}
          placeholder="Unixタイムスタンプを入力"
        />
        <button onClick={convertUnixToDateTime}>変換</button>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h2>DateTime to Unix Time</h2>
        <input
          type="datetime-local"
          value={dateTime}
          onChange={(e) => setDateTime(e.target.value)}
        />
        <button onClick={convertDateTimeToUnix}>変換</button>
      </div>

      <div>
        <h3>結果:</h3>
        <p>{result}</p>
      </div>
    </div>
  );
}
