"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";

export interface ImageItem {
  id: string;
  filename: string;
  url: string;
  createdAt: string;
}

interface ImageGalleryProps {
  images: ImageItem[];
  className?: string;
}

export function ImageGallery({ images, className }: ImageGalleryProps) {
  if (images.length === 0) {
    return (
      <div className="text-center py-12">
        <Image 
          src="/placeholder-image.svg" 
          alt="No images" 
          width={120} 
          height={120} 
          className="mx-auto text-muted-foreground mb-4 opacity-50"
        />
        <h3 className="text-lg font-medium mb-2">No images yet</h3>
        <p className="text-muted-foreground">
          Upload your first image to see it here
        </p>
      </div>
    );
  }

  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6", className)}>
      {images.map((image) => (
        <Card 
          key={image.id} 
          className="group overflow-hidden border-0 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
        >
          <div className="aspect-square overflow-hidden bg-muted">
            <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
              {/* Placeholder for actual image */}
              <div className="text-center">
                <div className="w-16 h-16 bg-slate-300 rounded-lg mx-auto mb-2"></div>
                <p className="text-xs text-slate-500 font-medium">{image.filename}</p>
              </div>
            </div>
          </div>
          <div className="p-3">
            <p className="text-sm font-medium truncate">{image.filename}</p>
            <p className="text-xs text-muted-foreground">{image.createdAt}</p>
          </div>
        </Card>
      ))}
    </div>
  );
}
