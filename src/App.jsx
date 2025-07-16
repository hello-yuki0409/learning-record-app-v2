import { useState, useEffect } from "react";
import { LearningForm } from "./components/LearningForm";
import { HistoryList } from "./components/HistoryList";
import { LearningDetails } from "./components/LearningDetails";
import { getAllHistory } from "./supabaseFunction";

export function App() {
  const [records, setRecords] = useState("");
  const [time, setTime] = useState("");
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");
  const [remark, setRemark] = useState("");
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true); //データ読み込み中かどうか

  useEffect(() => {
    const getTodos = async () => {
      setIsLoading(true); // <- 読み込み開始時
      const todos = await getAllHistory();
      setTodos(todos);
      setIsLoading(false); // <- 読み込み完了時
    };
    getTodos();
  }, []);

  // recordsかtimeが空欄でボタン押されたら表示する
  const onClickAdd = (event) => {
    event.preventDefault();
    if (records === "" || time === "") {
      setError("入力されていない項目があります。");
      return;
    }
    // 配列コピー -> 新しく入力したものを追加する -> その後formを初期化する処理
    setHistory([...history, { records, time, remark }]);
    setRecords("");
    setTime("");
    setError("");
    setRemark("");
  };
  // 学習時間を合計する処理
  const totalStudyTime = todos.reduce(
    (sum, records) => sum + Number(records.time),
    0
  );

  // 目標時間を達成したら+500してエンドレス表示
  const baseGoal = 1000;
  const plusGoal = 500;
  const goalCount =
    totalStudyTime < baseGoal
      ? 0
      : Math.floor((totalStudyTime - baseGoal) / plusGoal) + 1;

  // 次の目標時間 勉強に終わりはない、産まれてから死ぬまで勉強
  const currentGoal = baseGoal + goalCount * plusGoal;

  // Loading画面を表示する処理
  if (isLoading) {
    return (
      <div
        style={{
          background: "#333",
          color: "#fff",
          minHeight: "100vh",
          padding: "2em",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "2rem",
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <div
      style={{
        background: "#333",
        color: "#fff",
        minHeight: "100vh",
        padding: "2em",
      }}
    >
      <LearningForm
        records={records}
        setRecords={setRecords}
        time={time}
        setTime={setTime}
        remark={remark}
        setRemark={setRemark}
        onClickAdd={onClickAdd}
      />
      <LearningDetails
        records={records}
        time={time}
        error={error}
        totalStudyTime={totalStudyTime}
        currentGoal={currentGoal}
        baseGoal={baseGoal}
      />
      <HistoryList history={todos} />
    </div>
  );
}
