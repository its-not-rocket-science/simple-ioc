export class Container {
  private _services = new Map<string, unknown>();
  private _references = new Map<string, unknown>();
  private _initialisers = new Map<string, Function>();

  validate (schema: string[]) {
    const populatedSchema: any[] = [];
    schema.forEach(key => {
      if (this._services.get(key) === undefined) {
        if (!this._initialisers.has(key)) {
          throw new MissingDependencyError(`Missing dependency key '${key}'`);
        }

        const initialiser = this._initialisers.get(key);
        if (typeof initialiser === 'function') {
          const initialisedDependency = (initialiser)(this);
          populatedSchema.push(initialisedDependency);
          this._services.set(key, initialisedDependency);
          this._references.set(key, true);
          return;
        }
      }
    });
    return populatedSchema;
  }

  register (key: string, initialiser: Function, schema: string[]) {

    this._initialisers.set(key, initialiser);

    Object.defineProperty(this, key, {
      configurable: true,
      enumerable: true,
      get: () => {
        if (!this._services.has(key)) {
          if (this._references.get(key)) {
            throw new CircularDependencyError(`Circular reference detected in container property '${key}'`);
          }
          this._references.set(key, true);
          if (schema !== undefined) {
            const populatedSchema = this.validate(schema);
            this._services.set(key, initialiser.apply(this, populatedSchema));
          } else {
            this._services.set(key, initialiser(this));
          }
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

export class MissingDependencyError extends Error {
  constructor(msg: string) {
      super(msg);
      Object.setPrototypeOf(this, MissingDependencyError.prototype);
  }
}