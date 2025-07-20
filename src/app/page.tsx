"use client";

import React, { useState } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { FileList, FileItem } from "@/components/ui/file-list";
import { UploadDialog } from "@/components/ui/upload-dialog";

// Mock data for demonstration
const mockFiles: FileItem[] = [
  {
    id: "1",
    filename: "Image 1",
    type: "image",
    createdAt: "Sep 1, 2021",
  },
  {
    id: "2",
    filename: "Image 2",
    type: "image",
    createdAt: "Sep 1, 2021",
  },
  {
    id: "3",
    filename: "Image 3",
    type: "image",
    createdAt: "Sep 1, 2021",
  },
  {
    id: "4",
    filename: "Document 1",
    type: "document",
    createdAt: "Sep 1, 2021",
  },
  {
    id: "5",
    filename: "Document 2",
    type: "document",
    createdAt: "Sep 1, 2021",
  },
  {
    id: "6",
    filename: "Audio 1",
    type: "audio",
    createdAt: "Sep 1, 2021",
  },
  {
    id: "7",
    filename: "Big Buck Bunny",
    type: "video",
    createdAt: "Sep 1, 2021",
  },
  {
    id: "8",
    filename: "first Blender Open",
    type: "video",
    createdAt: "Sep 1, 2021",
  },
  {
    id: "9",
    filename: "HBO GO",
    type: "video",
    createdAt: "Sep 1, 2021",
  },
];

export default function Home() {
  const [files, setFiles] = useState<FileItem[]>(mockFiles);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);

  const handleDeleteFile = (fileId: string) => {
    setFiles(files.filter(f => f.id !== fileId));
  };

  return (
    <>
      <AppLayout onUploadClick={() => setUploadDialogOpen(true)}>
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">All Files</h1>
            <p className="text-muted-foreground">
              Manage all your uploaded files in one place
            </p>
          </div>
          
          <FileList files={files} onDeleteFile={handleDeleteFile} />
        </div>
      </AppLayout>
      
      <UploadDialog 
        open={uploadDialogOpen} 
        onOpenChange={setUploadDialogOpen} 
      />
    </>
  );
}
