import type { SerializedToolPayload } from "./types";

export type SupportSeed = {
  ticket: {
    id: string;
    customer: string;
    subject: string;
    message: string;
    sentiment: "calm" | "frustrated" | "angry";
  };
  orderStatus: {
    orderId: string;
    deliveredAt: string;
    returnWindowDays: number;
    conditionRequired: string;
  };
  policyNotes: string[];
  classificationOptions: string[];
  refundOptions: string[];
};

export type SupportState = {
  classification: string;
  escalateToClient: boolean;
  refundChoice: string;
  replyDraft: string;
};

export type SupportPayload = SerializedToolPayload & {
  data: {
    classification: string;
    refundChoice: string;
    escalateToClient: boolean;
    draftedReply: string;
  };
};

export function createSupportSeed(): SupportSeed {
  return {
    ticket: {
      id: "ticket-902",
      customer: "Jordan Lee",
      subject: "The premium kit arrived damaged",
      sentiment: "angry",
      message:
        "This was a birthday gift and the box arrived crushed. I want a refund today. I already sent photos and do not want to wait another week.",
    },
    orderStatus: {
      orderId: "#AM-2048",
      deliveredAt: "2026-06-10",
      returnWindowDays: 30,
      conditionRequired: "Photo evidence required for damaged goods refunds.",
    },
    policyNotes: [
      "Damaged delivery with photo evidence qualifies for replacement or refund.",
      "Apologize once, acknowledge impact, and avoid blaming the carrier.",
      "Escalate if the customer requests compensation beyond refund or replacement.",
    ],
    classificationOptions: ["damaged_item", "late_delivery", "billing", "product_question"],
    refundOptions: ["approve_refund", "offer_replacement", "escalate_edge_case", "deny_request"],
  };
}

export function createSupportInitialValue(seed: SupportSeed): SupportState {
  return {
    classification: seed.classificationOptions[0] ?? "",
    escalateToClient: false,
    refundChoice: "",
    replyDraft: "",
  };
}

export function serializeSupport(value: SupportState): SupportPayload {
  return {
    toolType: "support",
    summary: "Support ticket triage and reply",
    data: {
      classification: value.classification,
      refundChoice: value.refundChoice,
      escalateToClient: value.escalateToClient,
      draftedReply: value.replyDraft,
    },
  };
}
