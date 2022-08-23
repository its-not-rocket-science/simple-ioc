"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
test("Container class can be instantiated", () => {
    const c = new index_1.Container();
    expect(c).toBeInstanceOf(index_1.Container);
});
