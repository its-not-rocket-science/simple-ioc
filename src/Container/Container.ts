export class Container {
  private _services = new Map<string, unknown>();

  register (key: string, initialiser: Function) {

    // getter function will call initialiser lazily when property is accessed
    Object.defineProperty(this, key, {
      configurable: true,
      enumerable: true,
      get: () => {
        if (!this._services.has(key)) {
          this._services.set(key, initialiser(this));
        }
        return this._services.get(key);
      }
    });
  }
}