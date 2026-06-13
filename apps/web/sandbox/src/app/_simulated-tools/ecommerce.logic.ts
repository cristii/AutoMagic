import type { SerializedToolPayload } from "./types";

export type EcommerceSeed = {
  order: {
    id: string;
    customer: string;
    email: string;
    total: string;
    fulfillment: "unfulfilled" | "partially_fulfilled" | "fulfilled";
    paymentStatus: "paid" | "refunded" | "partially_refunded";
  };
  customerRequest: string;
  products: Array<{
    sku: string;
    name: string;
    refundable: boolean;
    fulfillable: boolean;
  }>;
  refundMetadata: {
    maxRefund: string;
    restockRequired: boolean;
    policyNote: string;
  };
  actionOptions: string[];
};

export type EcommerceState = {
  adminNotes: string;
  customerResponse: string;
  selectedAction: string;
};

export type EcommercePayload = SerializedToolPayload & {
  data: {
    orderId: string;
    selectedAction: string;
    adminNotes: string;
    customerFacingResponse: string;
  };
};

export function createEcommerceSeed(): EcommerceSeed {
  return {
    order: {
      id: "#AM-3129",
      customer: "Jordan Lee",
      email: "jordan@example.com",
      total: "$148.00",
      fulfillment: "fulfilled",
      paymentStatus: "paid",
    },
    customerRequest:
      "Customer reports one damaged premium kit and asks for either a replacement shipped today or a refund.",
    products: [
      { sku: "AM-412", name: "Premium kit", refundable: true, fulfillable: true },
      { sku: "AM-204", name: "Monthly refill", refundable: true, fulfillable: false },
    ],
    refundMetadata: {
      maxRefund: "$148.00",
      restockRequired: false,
      policyNote: "Damaged shipped items can be refunded without restocking when photos are attached.",
    },
    actionOptions: [
      "ship_replacement",
      "issue_full_refund",
      "issue_partial_refund",
      "escalate_to_client",
    ],
  };
}

export function createEcommerceInitialValue(seed: EcommerceSeed): EcommerceState {
  return {
    adminNotes: "",
    customerResponse: "",
    selectedAction: seed.actionOptions[0] ?? "",
  };
}

export function serializeEcommerce(
  value: EcommerceState,
  seed = createEcommerceSeed(),
): EcommercePayload {
  return {
    toolType: "ecommerce",
    summary: "Ecommerce order workflow",
    data: {
      orderId: seed.order.id,
      selectedAction: value.selectedAction,
      adminNotes: value.adminNotes,
      customerFacingResponse: value.customerResponse,
    },
  };
}
