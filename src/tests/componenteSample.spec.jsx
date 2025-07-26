import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { AppForTest } from "../AppForTest";

describe("Title Test", () => {
  it("タイトルが学習時間記録であること", () => {
    render(<AppForTest />);
    const title = screen.getByTestId("title");
    expect(title).toHaveTextContent("学習時間記録");
  });
});
