"use client";

import React, { useState, useCallback, useEffect, useMemo } from "react";
import { useDropzone, FileRejection } from "react-dropzone";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { ImageCard } from "@/components/ui/image-card";
import { UploadProgressPopup } from "@/components/ui/upload-progress-popup";
import { toast } from "sonner";

export type FileObj = {
  id: string;
  file: File;
  uploading: boolean;
  progress: number;
  key?: string;
  isDeleting: boolean;
  error: boolean;
  objectUrl?: string;
};
export default function Home() {
  const [files, setFiles] = useState<Array<FileObj>>([]);
  const [showUploadPopup, setShowUploadPopup] = useState(true);

  const uploadFile = async (fileObj: FileObj) => {
    try {
      if (!fileObj) {
        console.error("File not found for upload:");
        return;
      }
      setShowUploadPopup((prev) => !prev ? true : prev);

      const { file } = fileObj;

      // Set uploading state
      setFiles((prevFiles) =>
        prevFiles.map((f) =>
          f.id === fileObj.id
            ? { ...f, uploading: true, progress: 0, error: false }
            : f
        )
      );

      // Step 1: Get presigned URL from our API
      const presignedResponse = await axios.post("/api/s3/upload", {
        filename: file.name,
        contentType: file.type,
        size: file.size,
      });

      const { presignedUrl, key } = presignedResponse.data;

      // console.log(`🚀 ~ uploadFile ~ presignedUrl, key:`, presignedUrl, key);

      if (!presignedUrl || !key) {
        setFiles((prevFiles) =>
          prevFiles.map((f) =>
            f.id === fileObj.id
              ? { ...f, uploading: false, error: true, progress: 0 }
              : f
          )
        );
        toast.error(`Invalid response from presigned URL API`);
        return;
      }

      // Step 2: Upload file to S3 using presigned URL
      await axios.put(presignedUrl, file, {
        headers: {
          "Content-Type": file.type,
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );

            setFiles((prevFiles) =>
              prevFiles.map((f) =>
                f.id === fileObj.id ? { ...f, progress } : f
              )
            );
          }
        },
      });

      // Step 3: Mark upload as complete and store the S3 key
      setFiles((prevFiles) =>
        prevFiles.map((f) =>
          f.id === fileObj.id
            ? { ...f, uploading: false, progress: 100, key, error: false }
            : f
        )
      );

      toast.success(`${file.name} uploaded successfully!`);
    } catch (error: any) {
      console.error("Upload failed:", error);

      // Mark upload as failed
      setFiles((prevFiles) =>
        prevFiles.map((f) =>
          f.id === fileObj.id
            ? { ...f, uploading: false, error: true, progress: 0 }
            : f
        )
      );

      // Show error message
      const errorMessage =
        error.response?.data?.error || error.message || "Upload failed";
      toast.error(`Upload failed: ${errorMessage}`);
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length) {
      const newFiles = acceptedFiles.map((file) => ({
        id: uuidv4(),
        file,
        uploading: false,
        progress: 0,
        isDeleting: false,
        error: false,
        objectUrl: URL.createObjectURL(file),
      }));

      setFiles((prevFiles) => [...prevFiles, ...newFiles]);

      newFiles.forEach((fileObj) => {
        uploadFile(fileObj);
      });
    }
  }, []);

  const rejectedFiles = useCallback((fileRejection: FileRejection[]) => {
    console.log(`🚀 ~ rejectedFiles ~ fileRejection:`, fileRejection);

    if (fileRejection.length) {
      const invalidFileType = fileRejection.find(
        (rejection) => rejection.errors[0].code === "file-invalid-type"
      );

      const toomanyFiles = fileRejection.find(
        (rejection) => rejection.errors[0].code === "too-many-files"
      );

      const fileSizetoBig = fileRejection.find(
        (rejection) => rejection.errors[0].code === "file-too-large"
      );

      if (toomanyFiles) {
        return toast.error("Too many files selected, max is 2");
      }

      if (invalidFileType) {
        return toast.error(
          `Only images are allowed.`
        );
      }

      if (fileSizetoBig) {
        return toast.error("File size exceeds 5mb limit");
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

  const handleDeleteFile = async (id: string) => {
    try {
      const fileToDelete = files.find((f) => f.id === id);
      if (!fileToDelete) {
        toast.error("File not found");
        return;
      }

      // Set deleting state
      setFiles((prevFiles) =>
        prevFiles.map((f) => (f.id === id ? { ...f, isDeleting: true } : f))
      );

      // Only delete from S3 if file has been uploaded (has key)
      if (fileToDelete.key) {
        // Call delete API to remove from S3
        await axios.delete("/api/s3/delete", {
          data: { key: fileToDelete.key },
        });
      }

      // Clean up object URL
      if (fileToDelete.objectUrl) {
        URL.revokeObjectURL(fileToDelete.objectUrl);
      }

      // Remove from local state
      setFiles((prevFiles) => prevFiles.filter((f) => f.id !== id));

      toast.success("File deleted successfully");
    } catch (error: any) {
      console.error("Delete failed:", error);

      // Reset deleting state on error
      setFiles((prevFiles) =>
        prevFiles.map((f) => (f.id === id ? { ...f, isDeleting: false } : f))
      );

      const errorMessage =
        error.response?.data?.error || error.message || "Delete failed";
      toast.error(`Delete failed: ${errorMessage}`);
    }
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
            The right way to upload files on bucket
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
                    Max 2 files, 2MB each. Images only.
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
                  uploading={file.uploading}
                  progress={file.progress}
                  error={file.error}
                  isDeleting={file.isDeleting}
                  onDelete={handleDeleteFile}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Upload Progress Popup */}
      {showUploadPopup && (
        <UploadProgressPopup
          files={files}
          onClose={() => setShowUploadPopup(false)}
        />
      )}
    </div>
  );
}
