"use client";

import { useSelectionBounds } from "@/hooks/use-selection-bounds";
import { Camera, Color } from "@/types/canvas";
import { useMutation, useSelf } from "@liveblocks/react/suspense";
import { memo } from "react";
import { ColorPicker } from "./color-picker";
interface SelectionToolsProps {
  camera: Camera;
  setLastUsedColor: (color: Color) => void;
}
export const SelectionTools = memo(
  ({ camera, setLastUsedColor }: SelectionToolsProps) => {
    const selection = useSelf((me) => me.presence.selection);

    const setFill = useMutation(
      ({ storage }, fill: Color) => {
        const liveLayers = storage.get("layers");
        selection.forEach((id) => {
          liveLayers.get(id)?.set("fill", fill);
        });
      },
      [selection, setLastUsedColor],
    );
    const selectionBounds = useSelectionBounds();
    if (!selectionBounds) {
      return;
    }
    const x = selectionBounds.width / 2 + selectionBounds.x + camera.x;
    const y = selectionBounds.y + camera.y;
    return (
      <div
        className="absolute p-3 rounded-xl bg-white shadow-sm border flex select-none"
        style={{
          transform: `translate(
          calc(${x}px - 50%),
          calc(${y - 16}px - 100%)
            )`,
        }}
      >
        <ColorPicker onChange={setFill} />
      </div>
    );
  },
);

SelectionTools.displayName = "Selection Tools";
