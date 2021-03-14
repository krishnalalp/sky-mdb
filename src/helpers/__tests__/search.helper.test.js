import { filterSearchResults, filterResourceDetails } from "../search.helper";
import {
  searchResults,
  searchFiltered,
  resouceDetails,
  resouceDetailsFiltered,
} from "./mockData";

test("should filter search result", () => {
  expect(filterSearchResults(searchResults)).toMatchObject(searchFiltered);
});

test("should filter resource details", () => {
  expect(filterResourceDetails("credits", resouceDetails)).toMatchObject(
    resouceDetailsFiltered
  );
});
