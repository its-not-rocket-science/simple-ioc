import Container from "./index";

test("Container class can be instantiated", () => {
  const c = new Container();

  expect(c).toBeInstanceOf(Container);
});