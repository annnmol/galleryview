"use client";

import React, { useState } from "react";
import { Dropzone } from "@/components/ui/dropzone";
import { ImageCard } from "@/components/ui/image-card";
import { toast } from "sonner";

// Mock data for demonstration
const mockImages = [
  {
    id: "1",
    title: "Mountain Landscape",
    url: "/api/placeholder/400/300",
    alt: "Beautiful mountain landscape"
  },
  {
    id: "2", 
    title: "City Skyline",
    url: "/api/placeholder/400/300",
    alt: "Modern city skyline"
  },
  {
    id: "3",
    title: "Ocean Sunset",
    url: "/api/placeholder/400/300", 
    alt: "Sunset over the ocean"
  },
  {
    id: "4",
    title: "Forest Path",
    url: "/api/placeholder/400/300",
    alt: "Path through a green forest"
  },
  {
    id: "5",
    title: "Mountain Landscape",
    url: "/api/placeholder/400/300",
    alt: "Beautiful mountain landscape"
  },
  {
    id: "6", 
    title: "City Skyline",
    url: "/api/placeholder/400/300",
    alt: "Modern city skyline"
  },
  {
    id: "7",
    title: "Ocean Sunset",
    url: "/api/placeholder/400/300", 
    alt: "Sunset over the ocean"
  },
  {
    id: "8",
    title: "Forest Path",
    url: "/api/placeholder/400/300",
    alt: "Path through a green forest"
  }
];

export default function Home() {
  const [images, setImages] = useState(mockImages);

  const handleFileSelect = (files: File[]) => {
    if (files && files.length > 0) {
      toast.success(`Selected ${files.length} file(s)`, {
        description: `Files: ${files.map(f => f.name).join(', ')}`
      });
      // File processing logic will be added later
    }
  };

  const handleDeleteImage = (id: string) => {
    setImages(images.filter(img => img.id !== id));
    toast.success("Image deleted successfully");
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
            Upload, organize, and showcase your images with ease
          </p>
        </div>

        {/* Dropzone Section */}
        <div className="max-w-xl mx-auto mb-12">
          <Dropzone onFileSelect={handleFileSelect} />
        </div>

        {/* Images Grid */}
        {images.length > 0 && (
          <div className="max-w-6xl mx-auto">
            <h2 className="text-lg font-semibold mb-6 text-center">Your Images</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
              {images.map((image) => (
                <ImageCard
                  key={image.id}
                  id={image.id}
                  title={image.title}
                  url={image.url}
                  alt={image.alt}
                  onDelete={handleDeleteImage}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
