import { Badge, Select, Textarea } from "@automagic/ui";

import {
  createEcommerceInitialValue,
  createEcommerceSeed,
  serializeEcommerce,
  type EcommerceSeed,
  type EcommerceState,
} from "./ecommerce.logic";
import type { SimulatedToolDefinition } from "./types";

export const ecommerceTool: SimulatedToolDefinition<
  EcommerceSeed,
  EcommerceState,
  ReturnType<typeof serializeEcommerce>
> = {
  type: "ecommerce",
  label: "Ecommerce admin",
  description: "Practice order review, fulfillment/refund actions, admin notes, and customer responses.",
  seedData: createEcommerceSeed,
  initialValue: createEcommerceInitialValue,
  Surface: EcommerceSurface,
  serialize: serializeEcommerce,
};

function EcommerceSurface({
  seed,
  value,
  onChange,
}: {
  seed: EcommerceSeed;
  mode: "mission" | "freeplay";
  value: EcommerceState;
  onChange: (value: EcommerceState) => void;
}) {
  return (
    <div className="tool-window">
      <div className="tool-list" aria-label="Order details">
        <div>
          <strong>{seed.order.id}</strong>
          <span>{seed.order.customer}</span>
          <small>{seed.order.email}</small>
        </div>
        <div>
          <strong>{seed.order.total}</strong>
          <span>{seed.order.fulfillment.replace("_", " ")}</span>
          <small>{seed.order.paymentStatus.replace("_", " ")}</small>
        </div>
        <div>
          <strong>Refund policy</strong>
          <span>{seed.refundMetadata.maxRefund} max</span>
          <small>{seed.refundMetadata.policyNote}</small>
        </div>
      </div>
      <div className="tool-workspace">
        <div className="section-heading">
          <h3>Order workflow</h3>
          <p className="muted">{seed.customerRequest}</p>
        </div>
        <div className="table-scroll">
          <table className="table-like">
            <thead>
              <tr>
                <th>SKU</th>
                <th>Product</th>
                <th>Refundable</th>
                <th>Fulfillable</th>
              </tr>
            </thead>
            <tbody>
              {seed.products.map((product) => (
                <tr key={product.sku}>
                  <td>{product.sku}</td>
                  <td>{product.name}</td>
                  <td>
                    <Badge tone={product.refundable ? "success" : "danger"}>
                      {product.refundable ? "Yes" : "No"}
                    </Badge>
                  </td>
                  <td>
                    <Badge tone={product.fulfillable ? "success" : "warning"}>
                      {product.fulfillable ? "Yes" : "No"}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Select
          label="Admin action"
          onChange={(event) => onChange({ ...value, selectedAction: event.currentTarget.value })}
          options={seed.actionOptions.map((option) => ({
            label: option.replaceAll("_", " "),
            value: option,
          }))}
          value={value.selectedAction}
        />
        <Textarea
          label="Admin notes"
          onChange={(event) => onChange({ ...value, adminNotes: event.currentTarget.value })}
          placeholder="Record policy checks, fulfillment decision, and internal follow-up..."
          value={value.adminNotes}
        />
        <Textarea
          label="Customer-facing response"
          onChange={(event) => onChange({ ...value, customerResponse: event.currentTarget.value })}
          placeholder="Write the response the customer will receive..."
          value={value.customerResponse}
        />
      </div>
    </div>
  );
}
