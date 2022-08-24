export class Container {
  private _services = new Map<string, unknown>();
  private _references = new Map<string, unknown>();

  register (key: string, initialiser: Function) {

    // getter function will call initialiser lazily when property is accessed
    Object.defineProperty(this, key, {
      configurable: true,
      enumerable: true,
      get: () => {
        if (!this._services.has(key)) {
          if (this._references.get(key)) {
            throw new CircularDependencyError(`Circular reference detected in container property '${key}'`);
          }
          this._references.set(key, true);
          this._services.set(key, initialiser(this));
        }
        return this._services.get(key);
      }
    });
  }
}

export class CircularDependencyError extends Error {
  constructor(msg: string) {
      super(msg);
      Object.setPrototypeOf(this, CircularDependencyError.prototype);
  }
}