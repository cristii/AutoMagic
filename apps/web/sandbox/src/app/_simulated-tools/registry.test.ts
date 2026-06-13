import assert from "node:assert/strict";
import test from "node:test";

import { toolTypes } from "../_data/sandbox.ts";
import { fallbackToolType, normalizeToolType, registeredToolTypes } from "./registry.logic.ts";

test("registry metadata covers every ToolType in deterministic order", () => {
  assert.deepEqual(registeredToolTypes, [...toolTypes]);
});

test("tool query normalization returns requested known tools and inbox fallback", () => {
  assert.equal(normalizeToolType("crm"), "crm");
  assert.equal(normalizeToolType(["spreadsheet", "crm"]), "spreadsheet");
  assert.equal(normalizeToolType("missing-tool"), fallbackToolType);
  assert.equal(normalizeToolType(undefined), fallbackToolType);
});
