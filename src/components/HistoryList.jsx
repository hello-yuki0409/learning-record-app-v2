export const HistoryList = ({ history }) => {
  return (
    <div>
      <h2>登録履歴</h2>
      <ul>
        {history.map((records, index) => (
          <li key={index}>
            学習内容: {records.records}
            学習時間: {records.time} 時間 備考： {records.remark}
          </li>
        ))}
      </ul>
    </div>
  );
};
