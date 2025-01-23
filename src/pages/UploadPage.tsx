import React, { useEffect, useState } from "react";
import {
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
  FileInput,
} from "@/components/file-upload";
import { Paperclip } from "lucide-react";
import { FileSvgDraw } from "@/components/icons";
import { useDataStore } from "@/store/dataStore";
import { useRouter } from "@tanstack/react-router";

export default function UploadPage() {
  const [files, setFiles] = useState<File[] | null>(null);
  const { setData } = useDataStore();
  const router = useRouter();

  const dropZoneConfig = {
    maxFiles: 1,
    maxSize: 1024 * 1024 * 4,
    multiple: false,
    accept: {
      "text/csv": [".csv"],
    },
  };

  useEffect(() => {
    if (files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result;
        if (typeof text === "string") {
          const content = text.split("\n").map((row) => row.split(","));
          setData(content);

          router.navigate({
            to: "/data",
          });
        }
      };
      reader.readAsText(files[0]);
    }
  }, [files]);

  return (
    <>
      <div className="flex h-full flex-col items-center justify-center gap-2">
        <div className="w-11/12">
          <FileUploader
            value={files}
            onValueChange={setFiles}
            dropzoneOptions={dropZoneConfig}
            className="relative h-full rounded-lg bg-background p-2"
          >
            <FileInput className="outline-dashed outline-1 outline-white">
              <div className="flex w-full flex-col items-center justify-center pb-4 pt-3">
                <FileSvgDraw />
              </div>
            </FileInput>
            <FileUploaderContent>
              {files &&
                files.length > 0 &&
                files.map((file, i) => (
                  <FileUploaderItem key={i} index={i}>
                    <Paperclip className="h-4 w-4 stroke-current" />
                    <span>{file.name}</span>
                  </FileUploaderItem>
                ))}
            </FileUploaderContent>
          </FileUploader>
        </div>
      </div>
    </>
  );
}
