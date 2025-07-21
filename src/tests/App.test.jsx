// src/tests/App.test.jsx

import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { App } from "../App";

// モック用の配列（テストごとにリセットされる）
let mockHistory = [];

jest.mock("../supabaseFunction", () => ({
  getAllHistory: jest.fn(() => Promise.resolve(mockHistory)),
  addHistory: jest.fn(async (records, time, remark) => {
    const newItem = { id: Date.now(), records, time, remark };
    mockHistory.push(newItem);
    return [newItem];
  }),
  deleteHistory: jest.fn(async (id) => {
    mockHistory = mockHistory.filter((item) => item.id !== id);
    return true;
  }),
}));

beforeEach(() => {
  // テストごとに初期化（1件だけ）
  mockHistory = [{ id: 1, records: "React", time: "60", remark: "useState" }];
});

describe("学習記録の追加・削除テスト", () => {
  it("登録でリストが1件増える", async () => {
    render(<App />);
    // 最初の件数
    const beforeItems = await screen.findAllByTestId("history-item");
    const beforeCount = beforeItems.length;

    // 入力欄に値を入力
    await userEvent.type(screen.getByPlaceholderText("学習内容"), "Jest");
    await userEvent.type(screen.getByPlaceholderText("半角数字で入力"), "30");
    await userEvent.click(screen.getByRole("button", { name: /登録/i }));

    // 件数が1件増えていることを検証
    const afterItems = await screen.findAllByTestId("history-item");
    expect(afterItems.length).toBe(beforeCount + 1);
  });

  it("削除でリストが1件減る", async () => {
    render(<App />);
    const beforeItems = await screen.findAllByTestId("history-item");
    const beforeCount = beforeItems.length;

    // 1件目の削除ボタンをクリック
    await userEvent.click(screen.getAllByRole("button", { name: /削除/i })[0]);

    // 件数が1件減っていることを検証（queryAllByTestIdで0件もOK）
    const afterItems = screen.queryAllByTestId("history-item");
    expect(afterItems.length).toBe(beforeCount - 1);
  });
});
