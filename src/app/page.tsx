"use client";

import React, { useState, useCallback, useEffect } from "react";
import { useDropzone, FileRejection } from "react-dropzone";
import { v4 as uuidv4 } from "uuid";
import { ImageCard } from "@/components/ui/image-card";
import { toast } from "sonner";

export default function Home() {
  const [files, setFiles] = useState<
    Array<{
      id: string;
      file: File;
      uploading: boolean;
      progress: number;
      key?: string;
      isDeleting: boolean;
      error: boolean;
      objectUrl?: string;
    }>
  >([]);

  const uploadFile = (file: File) => {
    // Dummy upload function - will be implemented later
    console.log("Uploading file:", file.name);
    // toast.success(`Selected ${files.length} file(s)`, {
    //   description: `Files: ${files.map((f) => f.file.name).join(", ")}`,
    // });
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length) {
      setFiles((prevFiles) => [
        ...prevFiles,
        ...acceptedFiles.map((file) => ({
          id: uuidv4(),
          file,
          uploading: false,
          progress: 0,
          isDeleting: false,
          error: false,
          objectUrl: URL.createObjectURL(file),
        })),
      ]);

      acceptedFiles.forEach(uploadFile);
    }
  }, []);

  const rejectedFiles = useCallback((fileRejection: FileRejection[]) => {

    console.log(`🚀 ~ rejectedFiles ~ fileRejection:`, fileRejection);

    if (fileRejection.length) {
      const toomanyFiles = fileRejection.find(
        (rejection) => rejection.errors[0].code === "too-many-files"
      );

      const fileSizetoBig = fileRejection.find(
        (rejection) => rejection.errors[0].code === "file-too-large"
      );

      if (toomanyFiles) {
        toast.error("Too many files selected, max is 2");
      }

      if (fileSizetoBig) {
        toast.error("File size exceeds 5mb limit");
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected: rejectedFiles,
    maxFiles: 2,
    maxSize: 1024 * 1024 * 2, // 2mb
    accept: {
      "image/*": [],
    },
  });

  useEffect(() => {
    return () => {
      // Cleanup object URLs when component unmounts
      files.forEach((file) => {
        if (file.objectUrl) {
          URL.revokeObjectURL(file.objectUrl);
        }
      });
    };
  }, [files]);

  const handleDeleteFile = (id: string) => {
    const fileToDelete = files.find((f) => f.id === id);
    if (fileToDelete?.objectUrl) {
      URL.revokeObjectURL(fileToDelete.objectUrl);
    }
    setFiles(files.filter((f) => f.id !== id));
    toast.success("File deleted successfully");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
            GalleryView
          </h1>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            {/* Upload, organize, and showcase your images with ease */}
            Right way to upload files on bucket
          </p>
        </div>

        {/* Dropzone Section */}
        <div className="max-w-xl mx-auto mb-12">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragActive
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50"
            }`}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center gap-2">
              <div className="text-2xl">📁</div>
              {isDragActive ? (
                <p className="text-sm text-muted-foreground">
                  Drop the files here...
                </p>
              ) : (
                <div>
                  <p className="text-sm font-medium">
                    Drag & drop files here, or click to select
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Max 5 files, 10MB each. Images only.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Files Grid */}
        {files.length > 0 && (
          <div className="max-w-6xl mx-auto">
            <h2 className="text-lg font-semibold mb-6 text-center">
              Your Files
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
              {files.map((file) => (
                <ImageCard
                  key={file.id}
                  id={file.id}
                  title={file.file.name}
                  url={file.objectUrl || ""}
                  alt={file.file.name}
                  onDelete={handleDeleteFile}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
