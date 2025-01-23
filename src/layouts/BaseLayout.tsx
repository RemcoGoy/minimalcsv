import DragWindowRegion from "@/components/DragWindowRegion";
import React from "react";

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full flex-col">
      <DragWindowRegion />
      <main className="mainArea">{children}</main>
    </div>
  );
}
