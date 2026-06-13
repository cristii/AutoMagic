import assert from "node:assert/strict";
import test from "node:test";

import {
  createAutomationInitialValue,
  createAutomationSeed,
  serializeAutomation,
} from "./automation.logic.ts";
import {
  createCalendarInitialValue,
  createCalendarSeed,
  serializeCalendar,
} from "./calendar.logic.ts";
import { createCrmInitialValue, createCrmSeed, serializeCrm } from "./crm.logic.ts";
import {
  createEcommerceInitialValue,
  createEcommerceSeed,
  serializeEcommerce,
} from "./ecommerce.logic.ts";
import { createInboxInitialValue, createInboxSeed, serializeInbox } from "./inbox.logic.ts";
import {
  createSpreadsheetInitialValue,
  createSpreadsheetSeed,
  serializeSpreadsheet,
} from "./spreadsheet.logic.ts";
import { createSupportInitialValue, createSupportSeed, serializeSupport } from "./support.logic.ts";

test("inbox serializer captures selected messages, drafts, labels, archives, and flags", () => {
  const seed = createInboxSeed();
  const initial = createInboxInitialValue(seed);

  assert.deepEqual(serializeInbox(initial).data, {
    selectedMessageIds: ["email-1"],
    labelsApplied: [],
    archivedIds: [],
    drafts: [],
    flaggedIds: [],
  });

  const edited = {
    ...initial,
    activeMessageId: "email-2",
    archivedIds: ["email-3"],
    draftsByMessageId: { "email-1": "Checking the contract now." },
    flaggedIds: ["email-1"],
    labelsByMessageId: { "email-1": ["urgent", "invoice"] },
  };

  assert.deepEqual(serializeInbox(edited).data, {
    selectedMessageIds: ["email-2"],
    labelsApplied: [{ messageId: "email-1", labels: ["urgent", "invoice"] }],
    archivedIds: ["email-3"],
    drafts: [{ messageId: "email-1", body: "Checking the contract now." }],
    flaggedIds: ["email-1"],
  });
  assert.deepEqual(createInboxInitialValue(seed), initial);
});

test("crm serializer captures changed records, duplicate IDs, notes, and batch save state", () => {
  const seed = createCrmSeed();
  const initial = createCrmInitialValue(seed);

  assert.equal(serializeCrm(initial).data.changedRecords.length, 0);
  assert.deepEqual(serializeCrm(initial).data.duplicateIds, ["crm-3"]);

  const edited = {
    ...initial,
    batchSaved: true,
    changedRecordIds: ["crm-2"],
    duplicateIds: ["crm-1", "crm-3"],
    notes: "Updated stale owner and flagged Acme duplicate.",
    records: initial.records.map((record) =>
      record.id === "crm-2" ? { ...record, owner: "Priya", status: "needs_review" as const } : record,
    ),
  };

  assert.deepEqual(serializeCrm(edited).data, {
    changedRecords: [
      {
        id: "crm-2",
        company: "Vela Foods",
        contact: "Noah Patel",
        owner: "Priya",
        status: "needs_review",
        nextStep: "Update email",
      },
    ],
    duplicateIds: ["crm-1", "crm-3"],
    notes: "Updated stale owner and flagged Acme duplicate.",
    batchSaved: true,
  });
  assert.deepEqual(createCrmInitialValue(seed), initial);
});

test("spreadsheet serializer captures row order, selected insights, and summary", () => {
  const seed = createSpreadsheetSeed();
  const initial = createSpreadsheetInitialValue(seed);

  assert.deepEqual(serializeSpreadsheet(initial).data, {
    rowOrder: ["AM-101", "AM-204", "AM-305", "AM-412"],
    selectedInsights: { topSku: "", returnRiskSku: "" },
    summary: "",
  });

  const edited = {
    ...initial,
    rows: [...initial.rows].sort((a, b) => b.revenue - a.revenue),
    summary: "AM-204 leads revenue; watch returns.",
    topSku: "AM-204",
    returnRiskSku: "AM-204",
  };

  assert.deepEqual(serializeSpreadsheet(edited).data, {
    rowOrder: ["AM-204", "AM-412", "AM-101", "AM-305"],
    selectedInsights: { topSku: "AM-204", returnRiskSku: "AM-204" },
    summary: "AM-204 leads revenue; watch returns.",
  });
  assert.deepEqual(createSpreadsheetInitialValue(seed), initial);
});

test("calendar serializer captures proposals, avoided conflicts, and invite note", () => {
  const seed = createCalendarSeed();
  const initial = createCalendarInitialValue(seed);

  assert.deepEqual(serializeCalendar(initial).data, {
    proposedMeetings: [],
    conflictsAvoided: [],
    inviteNote: "",
  });

  const edited = {
    ...initial,
    proposedSlotsByRequestId: {
      "meet-1": "slot-1b",
      "meet-2": "slot-2a",
      "meet-3": "slot-3b",
    },
    conflictsAvoided: ["evt-3"],
    inviteNote: "All proposed slots include timezone labels.",
  };

  assert.deepEqual(serializeCalendar(edited).data, {
    proposedMeetings: [
      {
        requestId: "meet-1",
        attendee: "Sarah Jensen",
        slotId: "slot-1b",
        label: "Tue 4:00 PM ET",
        timezone: "ET",
      },
      {
        requestId: "meet-2",
        attendee: "Mara Chen",
        slotId: "slot-2a",
        label: "Wed 9:00 AM PT",
        timezone: "PT",
      },
      {
        requestId: "meet-3",
        attendee: "Lina Ramos",
        slotId: "slot-3b",
        label: "Thu 10:00 AM CET",
        timezone: "CET",
      },
    ],
    conflictsAvoided: ["evt-3"],
    inviteNote: "All proposed slots include timezone labels.",
  });
  assert.deepEqual(createCalendarInitialValue(seed), initial);
});

test("support serializer captures classification, refund choice, escalation, and reply", () => {
  const seed = createSupportSeed();
  const initial = createSupportInitialValue(seed);

  assert.deepEqual(serializeSupport(initial).data, {
    classification: "damaged_item",
    refundChoice: "",
    escalateToClient: false,
    draftedReply: "",
  });

  const edited = {
    ...initial,
    refundChoice: "approve_refund",
    escalateToClient: true,
    replyDraft: "I am sorry the kit arrived damaged. We can refund or replace it today.",
  };

  assert.deepEqual(serializeSupport(edited).data, {
    classification: "damaged_item",
    refundChoice: "approve_refund",
    escalateToClient: true,
    draftedReply: "I am sorry the kit arrived damaged. We can refund or replace it today.",
  });
  assert.deepEqual(createSupportInitialValue(seed), initial);
});

test("ecommerce serializer captures selected action, admin notes, and customer response", () => {
  const seed = createEcommerceSeed();
  const initial = createEcommerceInitialValue(seed);

  assert.deepEqual(serializeEcommerce(initial).data, {
    orderId: "#AM-3129",
    selectedAction: "ship_replacement",
    adminNotes: "",
    customerFacingResponse: "",
  });

  const edited = {
    ...initial,
    selectedAction: "issue_full_refund",
    adminNotes: "Photo evidence attached; no restock required.",
    customerResponse: "We have issued the refund and confirmed the damaged item report.",
  };

  assert.deepEqual(serializeEcommerce(edited).data, {
    orderId: "#AM-3129",
    selectedAction: "issue_full_refund",
    adminNotes: "Photo evidence attached; no restock required.",
    customerFacingResponse: "We have issued the refund and confirmed the damaged item report.",
  });
  assert.deepEqual(createEcommerceInitialValue(seed), initial);
});

test("automation serializer captures trigger, action sequence, mappings, and QA notes", () => {
  const seed = createAutomationSeed();
  const initial = createAutomationInitialValue(seed);

  assert.deepEqual(serializeAutomation(initial).data, {
    triggerId: "ticket_tagged",
    actionSequence: [],
    fieldMappings: {
      ticket_id: "",
      customer_email: "",
      client_email: "",
      owner: "",
      due_date: "",
      summary: "",
    },
    qaNotes: "",
  });

  const edited = {
    ...initial,
    actionSequence: ["notify_client", "create_task", "log_note"],
    fieldMappings: {
      ...initial.fieldMappings,
      client_email: "client.email",
      customer_email: "ticket.customer.email",
      summary: "ticket.latest_reply",
    },
    qaNotes: "Test damaged_item and non-damaged tags before enabling.",
  };

  assert.deepEqual(serializeAutomation(edited).data, {
    triggerId: "ticket_tagged",
    actionSequence: ["notify_client", "create_task", "log_note"],
    fieldMappings: {
      ticket_id: "",
      customer_email: "ticket.customer.email",
      client_email: "client.email",
      owner: "",
      due_date: "",
      summary: "ticket.latest_reply",
    },
    qaNotes: "Test damaged_item and non-damaged tags before enabling.",
  });
  assert.deepEqual(createAutomationInitialValue(seed), initial);
});
