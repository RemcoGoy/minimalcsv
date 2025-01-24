"use client";

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PlusIcon, Trash2Icon } from "lucide-react";
import { EditableCell } from "./EditableCell";
import { EditableHeader } from "./EditableHeader";

export function InlineEditableTable({ data }: { data: any[] }) {
  const [headers, setHeaders] = React.useState<any[]>(data[0]);
  const [rows, setRows] = React.useState<any[]>(data.slice(1));

  const [editingCell, setEditingCell] = React.useState<{
    row: number;
    column: number;
    isHeader?: boolean;
  } | null>(null);

  const handleEdit = (row: number, column: number, isHeader?: boolean) => {
    setEditingCell({ row, column, isHeader });
  };

  const handleSave = (
    row: number,
    column: number,
    value: string,
    isHeader?: boolean,
  ) => {
    if (isHeader) {
      setHeaders((prevHeaders) =>
        prevHeaders.map((header, j) => (j === column ? value : header)),
      );
    } else {
      setRows((prevData) =>
        prevData.map((item: any[], i: number) =>
          i === row
            ? item.map((val: any, j: number) => (j === column ? value : val))
            : item,
        ),
      );
    }
    setEditingCell(null);
  };

  const handleCancel = () => {
    setEditingCell(null);
  };

  const handleDelete = (row: number) => {
    setRows((prevData) => prevData.filter((_, i) => i !== row));
  };

  const handleDeleteColumn = (column: number) => {
    setHeaders((prevHeaders) => prevHeaders.filter((_, i) => i !== column));
    setRows((prevData) =>
      prevData.map((row: any[]) => row.filter((_, i) => i !== column)),
    );
  };

  const handleAddRow = () => {
    setRows((prevData) => [...prevData, Array(headers.length).fill("")]);
  };

  const handleAddColumn = () => {
    setHeaders((prevHeaders) => [...prevHeaders, "new_column"]);
    setRows((prevData) => prevData.map((row) => [...row, ""]));
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            {headers.map((header, j) => (
              <TableHead key={header}>
                <EditableHeader
                  key={`header-${j}`}
                  value={header}
                  isEditing={Boolean(
                    editingCell?.isHeader && editingCell?.column === j,
                  )}
                  onEdit={() => handleEdit(0, j, true)}
                  onSave={(value) => handleSave(0, j, value, true)}
                  onCancel={handleCancel}
                  onDelete={() => handleDeleteColumn(j)}
                />
              </TableHead>
            ))}
            <TableHead className="text-right">
              <Button onClick={handleAddColumn} variant="ghost" size="icon">
                <PlusIcon className="h-4 w-4" />
              </Button>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={i}>
              {headers.map((header, j) => (
                <EditableCell
                  key={`${i}-${header}`}
                  value={row[j]}
                  isEditing={
                    !editingCell?.isHeader &&
                    editingCell?.row === i &&
                    editingCell?.column === j
                  }
                  onEdit={() => handleEdit(i, j)}
                  onSave={(value) => handleSave(i, j, value)}
                  onCancel={handleCancel}
                />
              ))}
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(i)}
                >
                  <Trash2Icon className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Button onClick={handleAddRow} variant="ghost" size="icon">
        <PlusIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}
