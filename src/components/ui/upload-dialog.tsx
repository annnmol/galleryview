"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Upload, Image, Video, FileText, Music } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const uploadTypes = [
  { id: "images", label: "Images", icon: Image, enabled: true },
  { id: "videos", label: "Videos", icon: Video, enabled: false },
  { id: "documents", label: "Documents", icon: FileText, enabled: false },
  { id: "audio", label: "Audio", icon: Music, enabled: false },
];

export function UploadDialog({ open, onOpenChange }: UploadDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Files</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="images" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            {uploadTypes.map((type) => {
              const Icon = type.icon;
              return (
                <TabsTrigger
                  key={type.id}
                  value={type.id}
                  disabled={!type.enabled}
                  className={cn(
                    "flex items-center gap-1 text-xs",
                    !type.enabled && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <Icon className="h-3 w-3" />
                  {type.label}
                </TabsTrigger>
              );
            })}
          </TabsList>
          
          <TabsContent value="images" className="mt-4">
            <div className="space-y-4">
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Upload Images</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Drag and drop your images here, or click to browse
                </p>
                <Button>Choose Images</Button>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                Supported formats: JPEG, PNG, GIF, WebP (Max 10MB each)
              </p>
            </div>
          </TabsContent>
          
          {uploadTypes.slice(1).map((type) => (
            <TabsContent key={type.id} value={type.id} className="mt-4">
              <div className="text-center py-8">
                <type.icon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Coming Soon</h3>
                <p className="text-muted-foreground">
                  {type.label} upload will be available soon.
                </p>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
