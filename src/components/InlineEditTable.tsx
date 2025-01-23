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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, PlusIcon, Trash2Icon } from "lucide-react";

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
                <EditableCell
                  key={`header-${j}`}
                  value={header}
                  isEditing={Boolean(
                    editingCell?.isHeader && editingCell?.column === j,
                  )}
                  onEdit={() => handleEdit(0, j, true)}
                  onSave={(value) => handleSave(0, j, value, true)}
                  onCancel={handleCancel}
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

interface EditableCellProps {
  value: string;
  isEditing: boolean;
  onEdit: () => void;
  onSave: (value: string) => void;
  onCancel: () => void;
}

function EditableCell({
  value,
  isEditing,
  onEdit,
  onSave,
  onCancel,
}: EditableCellProps) {
  const [editedValue, setEditedValue] = React.useState(value);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    setEditedValue(value);
  }, [value]);

  React.useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleBlur = () => {
    if (editedValue !== value) {
      onSave(editedValue);
    } else {
      onCancel();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSave(editedValue);
    } else if (e.key === "Escape") {
      onCancel();
    }
  };

  if (isEditing) {
    return (
      <TableCell>
        <Input
          ref={inputRef}
          value={editedValue}
          onChange={(e) => setEditedValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="h-8"
        />
      </TableCell>
    );
  }

  return (
    <TableCell>
      <div
        className="-m-1 h-8 cursor-text rounded p-1 hover:bg-accent"
        onClick={onEdit}
        onFocus={onEdit}
        tabIndex={0}
        role="button"
      >
        {value}
      </div>
    </TableCell>
  );
}
