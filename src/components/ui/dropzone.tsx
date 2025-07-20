"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Upload, Image as ImageIcon, CheckCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface DropzoneProps {
  onFileSelect?: (files: File[]) => void;
  accept?: Record<string, string[]>;
  maxFiles?: number;
  maxSize?: number;
  disabled?: boolean;
  className?: string;
}

export function Dropzone({
  onFileSelect,
  accept = {
    'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
  },
  maxFiles = 5,
  maxSize = 2 * 1024 * 1024, // 2MB
  disabled = false,
  className
}: DropzoneProps) {
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    if (rejectedFiles.length > 0) {
      // Handle rejected files
      rejectedFiles.forEach((file) => {
        file.errors.forEach((error: any) => {
          console.error(`File ${file.file.name}: ${error.message}`);
        });
      });
    }

    if (acceptedFiles.length > 0 && onFileSelect) {
      setIsUploading(true);
      // Simulate upload delay
      setTimeout(() => {
        onFileSelect(acceptedFiles);
        setIsUploading(false);
      }, 1000);
    }
  }, [onFileSelect]);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    open
  } = useDropzone({
    onDrop,
    accept,
    maxFiles,
    maxSize,
    disabled: disabled || isUploading,
    noClick: true, // We'll handle clicks manually
    noKeyboard: true
  });

  const dropzoneClassName = cn(
    "relative border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200 cursor-pointer",
    {
      "border-primary bg-primary/5 scale-105": isDragAccept,
      "border-red-500 bg-red-50": isDragReject,
      "border-muted-foreground/25 hover:border-muted-foreground/50": !isDragActive,
      "opacity-50 cursor-not-allowed": disabled,
      "border-green-500 bg-green-50": isUploading,
    },
    className
  );

  return (
    <div
      {...getRootProps()}
      className={dropzoneClassName}
    >
      <input {...getInputProps()} />
      
      <div className="space-y-3">
        {isUploading ? (
          <>
            <CheckCircle className="h-8 w-8 mx-auto text-green-500 animate-pulse" />
            <div>
              <h3 className="text-base font-medium text-green-700">Processing...</h3>
              <p className="text-xs text-green-600">
                Your files are being uploaded
              </p>
            </div>
          </>
        ) : (
          <>
            <div className={cn(
              "transition-transform duration-200",
              isDragActive && "scale-110"
            )}>
              {isDragAccept ? (
                <CheckCircle className="h-8 w-8 mx-auto text-primary" />
              ) : isDragReject ? (
                <X className="h-8 w-8 mx-auto text-red-500" />
              ) : (
                <ImageIcon className="h-8 w-8 mx-auto text-muted-foreground" />
              )}
            </div>
            
            <div>
              <h3 className="text-base font-medium mb-1">
                {isDragActive 
                  ? isDragAccept 
                    ? "Drop your images here" 
                    : "Some files are not supported"
                  : "Upload your images"
                }
              </h3>
              <p className="text-muted-foreground text-xs mb-3">
                {isDragActive 
                  ? "Release to upload" 
                  : "Drag and drop images here, or click to browse"
                }
              </p>
            </div>
            
            <Button
              onClick={open}
              disabled={disabled}
              variant={isDragAccept ? "default" : "outline"}
              size="sm"
              className={cn(
                "gap-2 transition-all duration-200",
                isDragAccept && "shadow-lg",
              )}
            >
              <Upload className="h-3 w-3" />
              Select Images
            </Button>
            
            <p className="text-xs text-muted-foreground">
              Supports JPEG, PNG, GIF, WebP • Max {maxFiles} files • Up to {Math.round(maxSize / (1024 * 1024))}MB each
            </p>
          </>
        )}
      </div>
      
      {/* Drag overlay */}
      {isDragActive && (
        <div className={cn(
          "absolute inset-0 rounded-lg border-2 border-dashed flex items-center justify-center",
          isDragAccept ? "bg-primary/10 border-primary" : "bg-red-50 border-red-500"
        )}>
          <div className={cn(
            "font-medium",
            isDragAccept ? "text-primary" : "text-red-500"
          )}>
            {isDragAccept ? "Drop files here" : "Invalid file type"}
          </div>
        </div>
      )}
    </div>
  );
}
