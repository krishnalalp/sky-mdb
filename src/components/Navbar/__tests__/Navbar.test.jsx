import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import { Navbar } from "../Navbar";

test("Navbar component rendered", () => {
  const renderer = new ShallowRenderer();

  renderer.render(<Navbar />);
  const tree = renderer.getRenderOutput();
  expect(tree).toMatchSnapshot();
});
