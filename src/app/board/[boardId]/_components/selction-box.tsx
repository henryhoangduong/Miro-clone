"use client";
import { useSelectionBounds } from "@/hooks/use-selection-bounds";
import { LayerType, Side, XYWH } from "@/types/canvas";
import { useStorage } from "@liveblocks/react/suspense";
import { useSelf } from "@liveblocks/react/suspense";
import { memo } from "react";
interface SelectionBoxProps {
  onResizeHandlePointerDown: (corner: Side, initialBounds: XYWH) => void;
}

const HANDLE_WIDITH = 8;

export const SelectionBox = memo(
  ({ onResizeHandlePointerDown }: SelectionBoxProps) => {
    const soleLayerId = useSelf((me) =>
      me.presence.selection.length === 1 ? me.presence.selection[0] : null,
    );
    const isShowingHandles = useStorage(
      (root) =>
        soleLayerId && root.layers.get(soleLayerId)?.type !== LayerType.Path,
    );
    const bounds = useSelectionBounds();
    if (!bounds) {
      return null;
    }
    return (
      <>
        <rect
          className="fill-transparent stroke-blue-500 stroke-1 pointer-events-none"
          style={{
            transform: `translate(
            ${bounds.x}px, 
            ${bounds.y}px)`,
          }}
          x={0}
          y={0}
          width={bounds.width}
          height={bounds.height}
        />
        {isShowingHandles && (
          <>
            <rect
              className="fill-white stroke-1 stroke-blue-500"
              x={0}
              y={0}
              style={{
                cursor: "nwse-resize",
                width: `${HANDLE_WIDITH}px`,
                height: `${HANDLE_WIDITH}px`,
                transform: `translate(
                ${bounds.x - HANDLE_WIDITH / 2}px, 
                ${bounds.y - HANDLE_WIDITH / 2}px)`,
              }}
              onPointerDown={(e) => {
                e.stopPropagation();
                onResizeHandlePointerDown(Side.Top + Side.Left, bounds);
              }}
            />
            <rect
              className="fill-white stroke-1 stroke-blue-500"
              x={0}
              y={0}
              style={{
                cursor: "ns-resize",
                width: `${HANDLE_WIDITH}px`,
                height: `${HANDLE_WIDITH}px`,
                transform: `translate(
                ${bounds.x + bounds.width / 2 - HANDLE_WIDITH / 2}px, 
                ${bounds.y - HANDLE_WIDITH / 2}px)`,
              }}
              onPointerDown={(e) => {
                e.stopPropagation();
                onResizeHandlePointerDown(Side.Top, bounds);
              }}
            />
            <rect
              className="fill-white stroke-1 stroke-blue-500"
              x={0}
              y={0}
              style={{
                cursor: "nesw-resize",
                width: `${HANDLE_WIDITH}px`,
                height: `${HANDLE_WIDITH}px`,
                transform: `translate(
                ${bounds.x - HANDLE_WIDITH / 2 + bounds.width}px, 
                ${bounds.y - HANDLE_WIDITH / 2}px)`,
              }}
              onPointerDown={(e) => {
                e.stopPropagation();
                onResizeHandlePointerDown(Side.Top + Side.Right, bounds);
              }}
            />
            <rect
              className="fill-white stroke-1 stroke-blue-500"
              x={0}
              y={0}
              style={{
                cursor: "ew-resize",
                width: `${HANDLE_WIDITH}px`,
                height: `${HANDLE_WIDITH}px`,
                transform: `translate(
                ${bounds.x - HANDLE_WIDITH / 2 + bounds.width}px, 
                ${bounds.y + bounds.height / 2 - HANDLE_WIDITH / 2}px)`,
              }}
              onPointerDown={(e) => {
                e.stopPropagation();
                onResizeHandlePointerDown(Side.Right, bounds);
              }}
            />
            <rect
              className="fill-white stroke-1 stroke-blue-500"
              x={0}
              y={0}
              style={{
                cursor: "nwse-resize",
                width: `${HANDLE_WIDITH}px`,
                height: `${HANDLE_WIDITH}px`,
                transform: `translate(
                ${bounds.x - HANDLE_WIDITH / 2 + bounds.width}px, 
                ${bounds.y - HANDLE_WIDITH / 2 + bounds.height}px)`,
              }}
              onPointerDown={(e) => {
                e.stopPropagation();
                onResizeHandlePointerDown(Side.Right + Side.Bottom, bounds);
              }}
            />
            <rect
              className="fill-white stroke-1 stroke-blue-500"
              x={0}
              y={0}
              style={{
                cursor: "ns-resize",
                width: `${HANDLE_WIDITH}px`,
                height: `${HANDLE_WIDITH}px`,
                transform: `translate(
                ${bounds.x + bounds.width / 2 - HANDLE_WIDITH / 2}px, 
                ${bounds.y - HANDLE_WIDITH / 2 + bounds.height}px)`,
              }}
              onPointerDown={(e) => {
                e.stopPropagation();
                onResizeHandlePointerDown(Side.Bottom, bounds);
              }}
            />
            <rect
              className="fill-white stroke-1 stroke-blue-500"
              x={0}
              y={0}
              style={{
                cursor: "nesw-resize",
                width: `${HANDLE_WIDITH}px`,
                height: `${HANDLE_WIDITH}px`,
                transform: `translate(
                ${bounds.x - HANDLE_WIDITH / 2}px, 
                ${bounds.y - HANDLE_WIDITH / 2 + bounds.height}px)`,
              }}
              onPointerDown={(e) => {
                e.stopPropagation();
                onResizeHandlePointerDown(Side.Bottom + Side.Left, bounds);
              }}
            />
            <rect
              className="fill-white stroke-1 stroke-blue-500"
              x={0}
              y={0}
              style={{
                cursor: "ew-resize",
                width: `${HANDLE_WIDITH}px`,
                height: `${HANDLE_WIDITH}px`,
                transform: `translate(
                ${bounds.x - HANDLE_WIDITH / 2}px, 
                ${bounds.y - HANDLE_WIDITH / 2 + bounds.height / 2}px)`,
              }}
              onPointerDown={(e) => {
                e.stopPropagation();
                onResizeHandlePointerDown(Side.Left, bounds);
              }}
            />
          </>
        )}
      </>
    );
  },
);
