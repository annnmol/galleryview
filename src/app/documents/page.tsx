"use client";

import React, { useState } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { ComingSoon } from "@/components/ui/coming-soon";
import { UploadDialog } from "@/components/ui/upload-dialog";
import { FileText } from "lucide-react";

export default function DocumentsPage() {
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);

  return (
    <>
      <AppLayout onUploadClick={() => setUploadDialogOpen(true)}>
        <ComingSoon
          title="Document Library"
          description="Document management features including PDF preview, text search, and organization tools are coming soon."
          icon={FileText}
        />
      </AppLayout>
      
      <UploadDialog 
        open={uploadDialogOpen} 
        onOpenChange={setUploadDialogOpen} 
      />
    </>
  );
}
