"use client";
import { memo } from "react";
import { useOthersConnectionIds } from "@liveblocks/react/suspense";
import { Cursor } from "./cursor";
const Cursors = () => {
  const ids = useOthersConnectionIds();
  return (
    <>
      {ids.map((connectionId) => (
        <Cursor connectionId={connectionId} key={connectionId} />
      ))}
    </>
  );
};
export const CursorPresence = () => {
  return (
    <>
      <Cursors />
    </>
  );
};

CursorPresence.displayName = "CursorPresence";
