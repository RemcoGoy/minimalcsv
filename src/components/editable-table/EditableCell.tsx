import React from "react";
import { TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";

interface EditableCellProps {
  value: string;
  isEditing: boolean;
  onEdit: () => void;
  onSave: (value: string) => void;
  onCancel: () => void;
}

export function EditableCell({
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
