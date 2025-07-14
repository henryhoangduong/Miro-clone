"use client";
import React from "react";
import { LiveblocksProvider, RoomProvider } from "@liveblocks/react/suspense";

const LiveblocksProvider_ = ({ children }: { children: React.ReactNode }) => {
  return (
    <LiveblocksProvider
      authEndpoint={"/api/liveblocks-auth"}
    >
      {children}
    </LiveblocksProvider>
  );
};

export default LiveblocksProvider_;
