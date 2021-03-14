import { renderImage, renderText } from "../render.helper";

test("should expect full img url ", () => {
  expect(renderImage("test_image")).toMatch(
    "http://image.tmdb.org/t/p/w500test_image"
  );
});

test("should expect default img url ", () => {
  expect(renderImage("")).toMatch(
    "https://www.wildhareboca.com/wp-content/uploads/sites/310/2018/03/image-not-available.jpg"
  );
});

test("should expect text passed", () => {
  expect(renderText("test_text")).toMatch("test_text");
});

test("should expect default text", () => {
  expect(renderText("")).toMatch("N/A");
});
