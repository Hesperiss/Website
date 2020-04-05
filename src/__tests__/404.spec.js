import React from "react";
import { create } from "react-test-renderer";
import Error from '../Components/Shared/404/NotFound';

describe("Page 404", () => {
  test("Matches the snapshot", () => {
    const button = <Error/>;
    expect(button).toMatchSnapshot();
  });
});