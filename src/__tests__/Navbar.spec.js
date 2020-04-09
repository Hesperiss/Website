import React from "react";
import NavBarLanding from '../Components/Landing/Components/Navbar';

describe("Navbar", () => {
  test("Matches the snapshot", () => {
    const navbar = <NavBarLanding/>;
    expect(navbar).toMatchSnapshot();
  });
});