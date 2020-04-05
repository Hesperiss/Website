import React from "react";
import Navbar from '../Components/Shared/Navbar.js';

describe("Page 404", () => {
  test("Matches the snapshot", () => {
    const navbar = <Navbar/>;
    expect(navbar).toMatchSnapshot();
  });
});