"use client";

import React, { useState } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { ComingSoon } from "@/components/ui/coming-soon";
import { UploadDialog } from "@/components/ui/upload-dialog";
import { Video } from "lucide-react";

export default function VideosPage() {
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);

  return (
    <>
      <AppLayout onUploadClick={() => setUploadDialogOpen(true)}>
        <ComingSoon
          title="Video Gallery"
          description="Video management and playback features are currently in development. You'll be able to upload, organize, and stream your videos soon."
          icon={Video}
        />
      </AppLayout>
      
      <UploadDialog 
        open={uploadDialogOpen} 
        onOpenChange={setUploadDialogOpen} 
      />
    </>
  );
}
