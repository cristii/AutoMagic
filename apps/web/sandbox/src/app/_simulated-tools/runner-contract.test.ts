import assert from "node:assert/strict";
import test from "node:test";

import { findMission } from "../_data/sandbox.ts";
import { normalizeToolType } from "./registry.logic.ts";

test("free-play query state selects the requested simulated tool", () => {
  assert.equal(normalizeToolType("inbox"), "inbox");
  assert.equal(normalizeToolType("calendar"), "calendar");
  assert.equal(normalizeToolType("support"), "support");
});

test("invalid or missing free-play query state falls back to inbox", () => {
  assert.equal(normalizeToolType("unknown"), "inbox");
  assert.equal(normalizeToolType(null), "inbox");
});

test("mission workspace contract uses the mission tool type", () => {
  assert.equal(findMission("m-217")?.toolType, "inbox");
  assert.equal(findMission("m-218")?.toolType, "spreadsheet");
  assert.equal(findMission("m-220")?.toolType, "crm");
  assert.equal(findMission("m-221")?.toolType, "calendar");
});
