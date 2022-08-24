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

type NameConfig = {
  name: string;
};

class Person {
  config: NameConfig;
  constructor(config: NameConfig) {
    this.config = config;
  }
}

class Driver {
  config: Person;
  constructor(config: Person) {
    this.config = config;
  }
}

const PersonName = 'Bob Human';

describe("Container can handle simple linear dependency relationship", () => {

  test("linear dependencies given in creation order", () => {
    const c = new Container();

    c.register('person', new Person({ name: PersonName }));
    c.register('driver',  new Driver(c.retrieve('person') as Person));

    const retrievedDriver = c.retrieve('driver') as Driver;

    expect(retrievedDriver.config.config.name).toBe(PersonName);
  });

  test("linear dependencies given in reversed creation order", () => {
    const c = new Container();

    c.register('driver',  new Driver(c.retrieve('person') as Person));
    c.register('person', new Person({ name: PersonName }));

    const retrievedDriver = c.retrieve('driver') as Driver;

    expect(retrievedDriver.config.config.name).toBe(PersonName);
  });
});