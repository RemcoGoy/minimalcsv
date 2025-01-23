import DragWindowRegion from "@/components/DragWindowRegion";
import React from "react";

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DragWindowRegion />
      <main>{children}</main>
    </>
  );
}
