# simple-ioc
Very simple container class to handle inversion of control

##Features
1. Any type of value can be added (object, function primitive)
2. Lazy initialisation, so order in which values/services are added isn't important
3. Circular dependencies partially handled - it's surprising that TypeScript doesn't detect chicken/egg dependencies

##Limitations
1. Circular dependencies are detected when values are accessed and thrown as `CircularDependencyError` 
2. To access the dynamically defined container properties, the container instance must be asserted as type `any`
```
const c = new Container() as any;
c.register('person', () => new Person({ name: 'Frank Zappa' }));
c.register('driver',  () => new Driver(c.person));
```

##Notes
* I would have liked to have developed a functional programming paradigm solution, but I couldn't see a way to abstract this approach into a meaningful library
* I wouldn't normally aim for 100% coverage in unit testing unless this was a formal requirement. For (potentially) widely used libraries, this seems a reasonable goal
* Published on NPM as `nano-ioc@1.0.0` - in the unlikely event that someone else starts using it, they might spot bugs or improvements :relaxed: 
