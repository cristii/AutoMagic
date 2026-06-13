"use client";

import { Badge } from "@automagic/ui";
import { useCallback, useEffect, useMemo, useState } from "react";

import type { ToolType } from "../_data/sandbox";
import {
  SIMULATED_TOOL_PAYLOAD_EVENT,
  SIMULATED_TOOL_RESET_EVENT,
  SIMULATED_TOOL_SUBMIT_EVENT,
} from "./events";
import { getSimulatedTool } from "./index";
import type { SerializedToolPayload, ToolMode } from "./types";

export function SimulatedToolRunner({
  toolType,
  mode,
}: {
  toolType: ToolType;
  mode: ToolMode;
}) {
  const tool = useMemo(() => getSimulatedTool(toolType), [toolType]);
  const seed = useMemo(() => tool.seedData(), [tool]);
  const [value, setValue] = useState(() => tool.initialValue(seed));
  const [submittedPayload, setSubmittedPayload] = useState<SerializedToolPayload | null>(null);

  const reset = useCallback(() => {
    setValue(tool.initialValue(seed));
    setSubmittedPayload(null);
  }, [seed, tool]);

  const payload = useMemo(() => tool.serialize(value), [tool, value]);
  const payloadJson = useMemo(() => JSON.stringify(payload), [payload]);

  const prepareSubmission = useCallback(() => {
    const nextPayload = tool.serialize(value);
    setSubmittedPayload(nextPayload);
    window.dispatchEvent(
      new CustomEvent(SIMULATED_TOOL_PAYLOAD_EVENT, {
        detail: {
          mode,
          payload: nextPayload,
          payloadJson: JSON.stringify(nextPayload),
          toolType: tool.type,
        },
      }),
    );
  }, [mode, tool, value]);

  useEffect(() => {
    const handleReset = () => reset();
    const handleSubmit = () => prepareSubmission();

    window.addEventListener(SIMULATED_TOOL_RESET_EVENT, handleReset);
    window.addEventListener(SIMULATED_TOOL_SUBMIT_EVENT, handleSubmit);

    return () => {
      window.removeEventListener(SIMULATED_TOOL_RESET_EVENT, handleReset);
      window.removeEventListener(SIMULATED_TOOL_SUBMIT_EVENT, handleSubmit);
    };
  }, [prepareSubmission, reset]);

  const Surface = tool.Surface;

  return (
    <div className="simulated-tool-runner" data-tool-type={tool.type}>
      <Surface seed={seed} mode={mode} value={value} onChange={setValue} />
      <input name="payload_json" readOnly type="hidden" value={payloadJson} />
      {submittedPayload ? (
        <div className="inline-row tool-submit-state" role="status">
          <Badge tone="success">Payload prepared</Badge>
          <span className="muted">{submittedPayload.summary}</span>
        </div>
      ) : null}
    </div>
  );
}
