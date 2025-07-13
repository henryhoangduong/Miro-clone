import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Info = () => {
  return (
    <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md">
      Info
    </div>
  );
};

export default Info;

Info.Skeleton = () => {
  return (
    <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md w-[300px]">
      <Skeleton className="h-full w-full bg-muted-400 "/>
    </div>
  )
}