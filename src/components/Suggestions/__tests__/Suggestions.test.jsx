import React from "react";
import { useSelector } from "react-redux";
import renderer from "react-test-renderer";
import { Suggestions } from "../Suggestions";
import { suggestionsData } from "./mockData";

test("Suggestions component rendered", () => {
  useSelector.mockImplementation(() => suggestionsData);

  const component = renderer.create(<Suggestions handleClick={() => {}} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
