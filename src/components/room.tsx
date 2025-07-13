"use client";
import React, { ReactNode } from "react";
import { RoomProvider, ClientSideSuspense } from "@liveblocks/react/suspense";
interface RoomProps {
  children: ReactNode;
  roomId: string;
}
const Room = ({ children, roomId }: RoomProps) => {
  return (
    <RoomProvider id={roomId} initialPresence={{}}>
      <ClientSideSuspense fallback={<div>...loading</div>}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  );
};

export default Room;
