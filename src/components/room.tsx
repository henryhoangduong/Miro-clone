"use client";
import React, { ReactNode } from "react";
import { RoomProvider, ClientSideSuspense } from "@liveblocks/react/suspense";
interface RoomProps {
  children: ReactNode;
  roomId: string;
  fallback: NonNullable<ReactNode> | null;
}
const Room = ({ children, roomId, fallback }: RoomProps) => {
  return (
    <RoomProvider id={roomId} initialPresence={{}}>
      <ClientSideSuspense fallback={fallback}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  );
};

export default Room;
