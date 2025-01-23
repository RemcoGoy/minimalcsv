import React from "react";
import { useDataStore } from "@/store/dataStore";
import { InlineEditableTable } from "@/components/InlineEditTable";

export default function DataPage() {
  const { data } = useDataStore();

  return (
    <div className="flex h-full flex-col items-center gap-2">
      <div className="w-full">
        <InlineEditableTable data={data} />
      </div>
    </div>
  );
}
