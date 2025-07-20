"use client";

import { FileObj } from "@/app/page";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, CheckCircle, Trash2, Upload, X } from "lucide-react";
import { useMemo } from "react";

interface FileUploadItem {
  id: string;
  fileName: string;
  progress: number;
  status: "uploading" | "completed" | "error" | "deleting";
  error?: string;
}

interface UploadProgressPopupProps {
  files: FileObj[];
  onClose: () => void;
}

export function UploadProgressPopup({
  files,
  onClose,
}: UploadProgressPopupProps) {
  if (files.length === 0) return null;

  // Convert files to upload popup format
  const activeUploads = useMemo(
    () =>
      files.map((fileObj) => ({
        id: fileObj.id,
        fileName: fileObj.file?.name,
        progress: fileObj.progress,
        status: fileObj.uploading
          ? ("uploading" as const)
          : fileObj.progress === 100
          ? ("completed" as const)
          : ("uploading" as const),
        error: fileObj.error ? "Upload failed" : undefined,
      })),
    [files]
  );

  const getStatusIcon = (file: FileUploadItem) => {
    switch (file.status) {
      case "uploading":
        return <Upload className="h-4 w-4 text-blue-500 animate-pulse" />;
      case "deleting":
        return <Trash2 className="h-4 w-4 text-red-500 animate-pulse" />;
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusText = (file: FileUploadItem) => {
    switch (file.status) {
      case "uploading":
        return `Uploading... ${file.progress}%`;
      case "deleting":
        return "Deleting...";
      case "completed":
        return "Upload complete";
      case "error":
        return file.error || "Upload failed";
      default:
        return "";
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80">
      <Card className="bg-white shadow-lg border py-1 gap-0">
        <div className="flex items-center justify-between p-3 border-b">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {activeUploads.length > 0 && (
                <Upload className="h-4 w-4 text-blue-500" />
              )}
              <span className="font-medium text-sm">
                {activeUploads.length > 0
                  ? `${activeUploads.length} ${
                      activeUploads.length === 1 ? "upload" : "uploads"
                    }`
                  : `${files.length} ${files.length === 1 ? "item" : "items"}`}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-6 w-6 p-0"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>
        <div className="max-h-64 overflow-y-auto">
          {activeUploads.map((file) => (
            <div
              key={file.id}
              className="flex items-center gap-3 p-3 border-b last:border-b-0"
            >
              <div className="flex-shrink-0">{getStatusIcon(file)}</div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{file.fileName}</p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-xs text-muted-foreground">
                    {getStatusText(file)}
                  </p>
                </div>

                {file.status === "uploading" && (
                  <Progress value={file.progress} className="h-1 mt-1" />
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
