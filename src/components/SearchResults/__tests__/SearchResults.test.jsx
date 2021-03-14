import React from "react";
import { useSelector, useDispatch } from "react-redux";
import renderer from "react-test-renderer";
import { Router, useLocation } from "react-router-dom";
import { createMemoryHistory } from "history";
import { SearchResults } from "../SearchResults";
import { searchData, locationData } from "./mockData";

test("SearchResults component rendered", () => {
  const history = createMemoryHistory();
  useSelector.mockImplementation(() => searchData);

  useLocation.mockImplementation(() => locationData);

  useDispatch.mockImplementation(() => () => {});

  const component = renderer.create(
    <Router history={history}>
      <SearchResults />
    </Router>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
