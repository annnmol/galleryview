"use client";

import React, { useState } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { ComingSoon } from "@/components/ui/coming-soon";
import { UploadDialog } from "@/components/ui/upload-dialog";
import { Music } from "lucide-react";

export default function AudioPage() {
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);

  return (
    <>
      <AppLayout onUploadClick={() => setUploadDialogOpen(true)}>
        <ComingSoon
          title="Audio Player"
          description="Audio management with playlist creation, metadata editing, and a built-in player are in development."
          icon={Music}
        />
      </AppLayout>
      
      <UploadDialog 
        open={uploadDialogOpen} 
        onOpenChange={setUploadDialogOpen} 
      />
    </>
  );
}
