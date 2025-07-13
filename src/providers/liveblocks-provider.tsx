"use client";
import React from "react";
import { LiveblocksProvider, RoomProvider } from "@liveblocks/react/suspense";

const LiveblocksProvider_ = ({ children }: { children: React.ReactNode }) => {
  return (
    <LiveblocksProvider
      publicApiKey={
        "pk_dev_H4GJFToH9QI4_nydx_iZrmkOf5SChmsG_h5WAHVu_OHo9sRT6kxz51VkFWwZqguu"
      }
    >
      {children}
    </LiveblocksProvider>
  );
};

export default LiveblocksProvider_;
