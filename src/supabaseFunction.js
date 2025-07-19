import { supabase } from "./supabaseClient";

export const getAllHistory = async () => {
  const todos = await supabase.from("study-record").select("*");
  return todos.data;
};

export const addHistory = async (records, time, remark) => {
  const { data, error } = await supabase
    .from("study-record")
    .insert([{ records, time, remark }]);
  if (error) {
    console.error("エラーだよん♪♪:", error);
    return null;
  }
  return data;
};

// const response = await supabase
//   .from('countries')
//   .delete()
//   .eq('id', 1)

export const deleteHistory = async (id) => {
  const { error } = await supabase.from("study-record").delete().eq("id", id);
  if (error) {
    // エラー処理いる？削除でいい？
    console.error("削除エラー:", error);
    return null;
  }
  return true;
};
