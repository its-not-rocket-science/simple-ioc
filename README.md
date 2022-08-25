# simple-ioc
Very simple container class to handle inversion of control

##Features
1. Any type of value can be added (object, function, primitive)
2. Lazy initialisation, so order in which values/services are added isn't important
3. Circular dependencies partially handled - it's surprising that TypeScript doesn't detect unresolvable chicken/egg dependencies like this
```
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
```

##Limitations
1. Circular dependencies are detected when values are accessed and thrown as `CircularDependencyError` 
2. To access the dynamically defined container properties, the container instance must be asserted as type `any`, which is annoying but unavoidable
```
const c = new Container() as any;
c.register('person', () => new Person({ name: 'Frank Zappa' }));
c.register('driver',  () => new Driver(c.person));
```
###Usage
Hopefully self-explanatory from this example. Note that the order in which dependent services are added to the container is not important
```
const c = new Container() as any;

c.register('driver',  () => new Driver(c.person));
c.register('person', () => new Person({ name: PersonName }));

const retrievedDriver = c.driver;
```

##Notes
* I would have liked to have developed a functional programming paradigm solution, but I couldn't see a way to abstract this approach into a meaningful library
* I wouldn't normally aim for 100% coverage in unit testing unless this was a formal requirement. For (potentially) widely used libraries, this seems a reasonable goal
* Published on NPM as `nano-ioc@1.0.0` - in the unlikely event that someone else starts using it, they might spot bugs or improvements :relaxed: 
