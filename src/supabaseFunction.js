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
    console.error("Error adding history:", error);
    return null;
  }
  return data;
};
