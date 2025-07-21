import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { AppForTest } from "../AppForTest";

describe("Title Test", () => {
  it("タイトルがHello Jestであること", () => {
    render(<AppForTest />);
    const title = screen.getByTestId("title");
    expect(title).toHaveTextContent("Hello Jest");
  });
});
