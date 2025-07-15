import { supabase } from "./supabaseClient";

export const getAllHistory = async () => {
  const todos = await supabase.from("study-record").select("*");
  return todos.data;
};
