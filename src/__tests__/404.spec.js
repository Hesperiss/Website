import React from "react";
import Error from '../Components/Shared/404/NotFound';

describe("Page 404", () => {
  test("Matches the snapshot", () => {
    const error = <Error/>;
    expect(error).toMatchSnapshot();
  });
});