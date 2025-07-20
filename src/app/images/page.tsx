"use client";

import React, { useState } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { ImageGallery, ImageItem } from "@/components/ui/image-gallery";
import { UploadDialog } from "@/components/ui/upload-dialog";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

// Mock data for demonstration
const mockImages: ImageItem[] = [
  {
    id: "1",
    filename: "Image 1",
    url: "/placeholder1.jpg",
    createdAt: "Sep 1, 2021",
  },
  {
    id: "2",
    filename: "Image 2",
    url: "/placeholder2.jpg",
    createdAt: "Sep 1, 2021",
  },
  {
    id: "3",
    filename: "Image 3",
    url: "/placeholder3.jpg",
    createdAt: "Sep 1, 2021",
  },
];

export default function ImagesPage() {
  const [images] = useState<ImageItem[]>(mockImages);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);

  return (
    <>
      <AppLayout onUploadClick={() => setUploadDialogOpen(true)}>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">IMAGES for You</h1>
              <p className="text-muted-foreground">
                Your personal playlists image. Updated daily.
              </p>
            </div>
            <Button 
              onClick={() => setUploadDialogOpen(true)}
              className="gap-2 bg-orange-500 hover:bg-orange-600"
            >
              <Upload className="h-4 w-4" />
              Add Image
            </Button>
          </div>
          
          <ImageGallery images={images} />
        </div>
      </AppLayout>
      
      <UploadDialog 
        open={uploadDialogOpen} 
        onOpenChange={setUploadDialogOpen} 
      />
    </>
  );
}
