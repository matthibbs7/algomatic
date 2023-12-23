"use client";

import { ReactNode, useMemo } from "react";
import { ClientSideSuspense } from "@liveblocks/react";


export function Room({ children }: { children: ReactNode }) {
  return (
      <ClientSideSuspense fallback={"... loading"}>
        {() => children}
      </ClientSideSuspense>
  );
}

