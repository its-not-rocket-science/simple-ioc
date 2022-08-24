import { Container } from "../src/index";


class SimpleClass {
  public count: number;

  constructor(c: number) {
    this.count = c;
  }
}

const TestNumber = 42;

describe("Container can handle registration and use of simple objects", () => {

  test("store simple object", () => {
    const c = new Container();

    c.register('simple', new SimpleClass(TestNumber));

    const simpleObject = c.retrieve('simple') as SimpleClass;

    expect(simpleObject.count).toBe(TestNumber);
  })

});