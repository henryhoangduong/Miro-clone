import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import { ToolButton } from "./tool-button";
import { Circle, MousePointer2, Pencil, Redo2, Square, StickyNote, Text, Type, Undo2 } from "lucide-react";

const Toolbar = () => {
  return (
    <div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4">
      <div className="bg-white rounded-md p-1.5 flex gap-y-1 flex-col items-center shadow-md">
        <ToolButton Icon={MousePointer2} label="Select" onClick={() => { }} isActive={ false} />
        <ToolButton Icon={Type} label="Type" onClick={() => {}} isActive={ false}/>
        <ToolButton Icon={StickyNote} label="Sticky note" onClick={() => {}}isActive={ false} />
        <ToolButton Icon={Square} label="Rectangle" onClick={() => { }} isActive={false} />
                <ToolButton Icon={Circle} label="Ellipse" onClick={() => {}} isActive={ false}/>
                <ToolButton Icon={Pencil} label="Pen" onClick={() => {}} isActive={ false}/>

      </div>
      <div className="bg-white rounded-md px-1.5 flex flex-col items-center shadow-md ">
        <ToolButton Icon={Undo2} label="Undo" onClick={() => { }} isActive={false} isDisabled={ true} />
        <ToolButton Icon={Redo2} label="Redo" onClick={() => { }} isActive={false} isDisabled={ true} />
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
