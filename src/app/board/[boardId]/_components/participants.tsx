"use client";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import { useOthers,useSelf } from "@liveblocks/react/suspense";
import { UserAvatar } from "./user-avatar";
const MAX_SHOWN_USERS = 2;
const Participants = () => {
  const users = useOthers()
  const currentUser = useSelf()
  const hasMoreUsers=users.length>MAX_SHOWN_USERS
  return (
    <div className="absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md">
      <div className="flex gap-2">
        {users.slice(0, MAX_SHOWN_USERS).map(({ connectionId, info }) => { return (<UserAvatar  src={info?.picture} key={connectionId} name={info?.name} fallback={ info?.name?.[0]||"A"} />)})}
      </div>
    </div>
  );
};

export default Participants;

export const ParticipantsSkeleton = () => {
  return (
    <div className="absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md w-[100px]">
      <Skeleton className="h-full w-full bg-muted-400 " />
    </div>
  );
};
