export const LearningForm = (props) => {
  const { records, setRecords, time, setTime, remark, setRemark, onClickAdd } =
    props;

  return (
    <form>
      <h1>学習時間記録</h1>
      <div>
        <label>
          学習内容：
          <input
            type="text"
            value={records}
            onChange={(e) => setRecords(e.target.value)}
            placeholder="学習内容"
          />
        </label>
      </div>
      <div>
        <label>
          学習時間：
          <input
            type="number"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            min="0"
            step="0.1"
            placeholder="半角数字で入力"
          />
          時間
        </label>
      </div>
      <div>
        <label>
          備考：
          <input
            type="text"
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
            placeholder="備考メモ"
          />
        </label>
      </div>
      <button onClick={onClickAdd}>登録</button>
    </form>
  );
};
