import React from "react";
import { create } from "react-test-renderer";
import NavBarLanding from '../Components/Landing/Components/Navbar';

describe("Navbar", () => {
  test("Matches the snapshot", () => {
    const navbar = create(<NavBarLanding/>);
    expect(navbar.toJSON()).toMatchSnapshot();
  });
});