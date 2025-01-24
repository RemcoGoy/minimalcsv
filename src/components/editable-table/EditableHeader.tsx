import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";

interface EditableCellProps {
  value: string;
  isEditing: boolean;
  onEdit: () => void;
  onSave: (value: string) => void;
  onCancel: () => void;
  onDelete?: () => void;
}

export function EditableHeader({
  value,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  onDelete,
}: EditableCellProps) {
  const [editedValue, setEditedValue] = React.useState(value);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setEditedValue(value);
  }, [value]);

  React.useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleBlur = (e: React.FocusEvent) => {
    // Check if the new focus target is within our container
    if (!containerRef.current?.contains(e.relatedTarget as Node)) {
      if (editedValue !== value) {
        onSave(editedValue);
      } else {
        onCancel();
      }
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
      <div ref={containerRef} className="flex items-center gap-2">
        <Input
          ref={inputRef}
          value={editedValue}
          onChange={(e) => setEditedValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          className="h-8"
        />
        {onDelete && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onDelete}
            className="h-8 w-8"
          >
            <Trash2Icon className="h-4 w-4" />
          </Button>
        )}
      </div>
    );
  }

  return (
    <div
      className="-m-1 h-8 cursor-text rounded p-1 hover:bg-accent"
      onClick={onEdit}
      onFocus={onEdit}
      tabIndex={0}
      role="button"
    >
      {value}
    </div>
  );
}
