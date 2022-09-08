import {
  Container,
  CircularDependencyError,
  MissingDependencyError
} from "../src/index";


class SimpleClass {
  public count: number;

  constructor(c: number) {
    this.count = c;
  }
}

const TestNumber = 42;

describe("Container can handle registration and use of simple values", () => {

  test("store and retrieve simple object", () => {
    const c = new Container() as any;

    c.register('simple', () => new SimpleClass(TestNumber));

    const simpleObject = c.simple;

    expect(simpleObject.count).toBe(TestNumber);
  });

  test("store and retrieve number", () => {
    const c = new Container() as any;

    c.register('number', () => TestNumber);

    expect(c.number).toBe(TestNumber);
  });

  test("store and retrieve a function", () => {
    const c = new Container() as any;
    const fn = () => TestNumber;

    c.register('func', () => fn);

    const retrievedFunction = c.func;

    expect(retrievedFunction()).toBe(TestNumber);
  });

  test("retrieving nonexistant key yields 'undefined", () => {
    const c = new Container() as any;

    expect(c['does not exist']).toBeUndefined();
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
    const c = new Container() as any;

    c.register('person', () => new Person({ name: PersonName }));
    c.register('driver', (person: any) => new Driver(c.person), ['person']);

    const retrievedDriver = c.driver;

    expect(retrievedDriver.config.config.name).toBe(PersonName);
  });

  test("linear dependencies given in reversed creation order", () => {
    const c = new Container() as any;

    c.register('driver', (person: any) => new Driver(c.person), ['person']);
    c.register('person', () => new Person({ name: PersonName }));

    const retrievedDriver = c.driver;

    expect(retrievedDriver.config.config.name).toBe(PersonName);
  });
});

class Chicken {
  private egg: Egg;

  constructor(e: Egg) {
    this.egg = e;
  }
}

class Egg {
  private chicken: Chicken;

  constructor(c: Chicken) {
    this.chicken = c;
  }
}

describe("Container should 'do something sensible' with tight circular dependencies", () => {

  test("basic chicken/egg dependency", () => {
    const c = new Container() as any;

    c.register('egg', (c: any) => new Egg(c.chicken));
    c.register('chicken', (c: any) => new Chicken(c.egg));

    expect(() => c.chicken).toThrowError(CircularDependencyError);

  });
});

describe("dependency not provided", () => {

  test("Driver constructor expects a Person object which isn't ptovided", () => {
    const c = new Container() as any;
    c.register('driver',  (person: any) => new Driver(c.person), ['person']);

    expect(() => c.driver).toThrow(MissingDependencyError);
  });
})