import { Container } from "../src/index";


class SimpleClass {
  public count: number;

  constructor(c: number) {
    this.count = c;
  }
}

const TestNumber = 42;

describe("Container can handle registration and use of simple values", () => {

  test("store and retrieve simple object", () => {
    const c = new Container();

    c.register('simple', new SimpleClass(TestNumber));

    const simpleObject = c.retrieve('simple') as SimpleClass;

    expect(simpleObject.count).toBe(TestNumber);
  });

  test("store and retrieve number", () => {
    const c = new Container();

    c.register('number', TestNumber);

    expect(c.retrieve('number')).toBe(TestNumber);
  });

  test("store and retrieve a function", () => {
    const c = new Container();
    const fn = () => TestNumber;

    c.register('func', fn);

    const retrievedFunction = c.retrieve('func') as Function;

    expect(retrievedFunction()).toBe(TestNumber);
  });

  test("retrieving nonexistant key yields 'undefined", () => {
    const c = new Container();

    expect(c.retrieve('does not exist')).toBeUndefined();
  });

});