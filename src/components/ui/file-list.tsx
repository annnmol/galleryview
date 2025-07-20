"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, Image, Video, FileText, Music } from "lucide-react";
import { toast } from "sonner";

export interface FileItem {
  id: string;
  filename: string;
  type: "image" | "video" | "document" | "audio";
  createdAt: string;
}

interface FileListProps {
  files: FileItem[];
  onDeleteFile?: (fileId: string) => void;
}

const typeConfig = {
  image: { icon: Image, label: "Image", variant: "secondary" as const },
  video: { icon: Video, label: "Video", variant: "destructive" as const },
  document: { icon: FileText, label: "Document", variant: "outline" as const },
  audio: { icon: Music, label: "Audio", variant: "default" as const },
};

export function FileList({ files, onDeleteFile }: FileListProps) {
  const handleDelete = (fileId: string, filename: string) => {
    if (onDeleteFile) {
      onDeleteFile(fileId);
      toast.success(`${filename} has been deleted`);
    }
  };

  if (files.length === 0) {
    return (
      <div className="text-center py-12">
        <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-2">No files yet</h3>
        <p className="text-muted-foreground">
          Upload your first file to get started
        </p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Filename</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {files.map((file) => {
            const config = typeConfig[file.type];
            const Icon = config.icon;
            
            return (
              <TableRow key={file.id}>
                <TableCell className="font-medium">{file.filename}</TableCell>
                <TableCell>
                  <Badge variant={config.variant} className="gap-1">
                    <Icon className="h-3 w-3" />
                    {config.label}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {file.createdAt}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(file.id, file.filename)}
                    className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
