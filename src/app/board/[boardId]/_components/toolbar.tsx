"use client";
import { Skeleton } from "@/components/ui/skeleton";
import React, { useEffect } from "react";
import { ToolButton } from "./tool-button";
import {
  Circle,
  MousePointer2,
  Pencil,
  Redo2,
  Square,
  StickyNote,
  Text,
  Type,
  Undo2,
} from "lucide-react";
import { CanvasMode, LayerType } from "@/types/canvas";
import { CanvasState } from "@/types/canvas";
interface ToolbarProps {
  canvasState: CanvasState;
  setCanvasState: (newState: CanvasState) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

const Toolbar = ({
  canvasState,
  setCanvasState,
  undo,
  redo,
  canUndo,
  canRedo,
}: ToolbarProps) => {
  return (
    <div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4">
      <div className="bg-white rounded-md p-1.5 flex gap-y-1 flex-col items-center shadow-md">
        <ToolButton
          Icon={MousePointer2}
          label="Select"
          onClick={() => setCanvasState({ mode: CanvasMode.None })}
          isActive={
            canvasState.mode == CanvasMode.None ||
            canvasState.mode === CanvasMode.Translating ||
            canvasState.mode === CanvasMode.SelectionNet ||
            canvasState.mode === CanvasMode.Pressing ||
            canvasState.mode === CanvasMode.Resizing
          }
        />
        <ToolButton
          Icon={Type}
          label="Type"
          onClick={() => {
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Text,
            });
          }}
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Text
          }
        />
        <ToolButton
          Icon={StickyNote}
          label="Sticky note"
          onClick={() => {
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Note,
            });
          }}
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Note
          }
        />
        <ToolButton
          Icon={Square}
          label="Rectangle"
          onClick={() => {
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Rectangle,
            });
          }}
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Rectangle
          }
        />
        <ToolButton
          Icon={Circle}
          label="Ellipse"
          onClick={() => {
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Ellipse,
            });
          }}
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Ellipse
          }
        />
        <ToolButton
          Icon={Pencil}
          label="Pen"
          onClick={() => {
            setCanvasState({ mode: CanvasMode.Pencil });
          }}
          isActive={canvasState.mode == CanvasMode.Pencil}
        />
      </div>
      <div className="bg-white rounded-md px-1.5 flex flex-col items-center shadow-md ">
        <ToolButton
          Icon={Undo2}
          label="Undo"
          onClick={undo}
          isDisabled={!canUndo}
        />
        <ToolButton
          Icon={Redo2}
          label="Redo"
          onClick={redo}
          isDisabled={!canRedo}
        />
      </div>
    </div>
  );
};

export default Toolbar;

export const ToolbarSkeleton = () => {
  return (
    <div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4 h-[360px] w-[52px] rounded-md bg-white">
      <Skeleton className="h-full w-full bg-muted-400 " />
    </div>
  );
};
