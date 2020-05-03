import React from "react";
import { create } from "react-test-renderer";
import Home from '../Components/Home/Home';

describe("Home page", () => {
  test("Matches the snapshot", () => {
    const home = create(<Home/>);
    expect(home.toJSON()).toMatchSnapshot();
  });
});