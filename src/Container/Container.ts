export class Container {
  private _services = new Map<string, unknown>();

  register(key: string, value: unknown) {
    if (!this._services.has(key) && value !== undefined) {
      this._services.set(key, value);
    }
  }

  retrieve (key: string): unknown {
    // will retrieve 'undefined' if key is absent - should we throw an error?
    if (this._services.has(key)) {
      return this._services.get(key);
    }
  }
}