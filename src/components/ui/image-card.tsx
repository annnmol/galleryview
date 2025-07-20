"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Trash2, Upload } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageCardProps {
  id: string;
  title: string;
  url: string;
  alt: string;
  uploading?: boolean;
  progress?: number;
  error?: boolean;
  isDeleting?: boolean;
  onDelete?: (id: string) => void;
  className?: string;
}

export function ImageCard({
  id,
  title,
  url,
  alt,
  uploading = false,
  progress = 0,
  error = false,
  isDeleting = false,
  onDelete,
  className
}: ImageCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleDelete = () => {
    if (onDelete && !isDeleting && !uploading) {
      onDelete(id);
    }
  };

  return (
    <div className="w-full max-w-[200px] mx-auto">
      <Card
        className={cn(
          "group relative overflow-hidden border-0 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer aspect-square",
          uploading && "ring-2 ring-primary/20",
          error && "ring-2 ring-destructive/20",
          isDeleting && "ring-2 ring-red-300 opacity-50",
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Delete Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDelete}
          disabled={uploading || isDeleting}
          className={cn(
            "absolute top-1.5 right-1.5 z-10 h-6 w-6 p-0 bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-200 shadow-sm",
            (isHovered && !uploading && !isDeleting) ? "opacity-100 scale-100" : "opacity-0 scale-90",
            (uploading || isDeleting) && "opacity-50 cursor-not-allowed"
          )}
        >
          <Trash2 className={cn(
            "h-3 w-3",
            isDeleting ? "text-red-400 animate-pulse" : "text-red-500"
          )} />
        </Button>

        {/* Upload Progress Indicator */}
        {uploading && (
          <div className="absolute top-1.5 left-1.5 z-10 h-6 w-6 bg-white/80 backdrop-blur-sm rounded-md flex items-center justify-center shadow-sm">
            <Upload className="h-3 w-3 text-primary animate-pulse" />
          </div>
        )}

        {/* Image Container */}
        <div className="w-full h-full overflow-hidden bg-muted">
          {!imageError && url ? (
            <div
              className={cn(
                "w-full h-full transition-transform duration-300 ease-out relative",
                isHovered && !uploading && "scale-105"
              )}
            >
              <img
                src={url}
                alt={alt}
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
              
              {/* Upload Overlay */}
              {uploading && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Upload className="h-6 w-6 mx-auto mb-2 animate-pulse" />
                    <p className="text-xs font-medium">Uploading...</p>
                    <p className="text-xs opacity-80">{Math.round(progress)}%</p>
                  </div>
                </div>
              )}
              
              {/* Error Overlay */}
              {error && !isDeleting && (
                <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center">
                  <div className="text-center text-red-600">
                    <div className="w-6 h-6 bg-red-100 rounded-full mx-auto mb-1 flex items-center justify-center">
                      <span className="text-xs">!</span>
                    </div>
                    <p className="text-xs font-medium">Upload Failed</p>
                  </div>
                </div>
              )}

              {/* Delete Overlay */}
              {isDeleting && (
                <div className="absolute inset-0 bg-red-500/30 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Trash2 className="h-6 w-6 mx-auto mb-2 animate-pulse" />
                    <p className="text-xs font-medium">Deleting...</p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <div className="text-center">
                <div className="w-6 h-6 bg-muted-foreground/20 rounded-lg mx-auto mb-1"></div>
                <p className="text-xs text-muted-foreground">Image unavailable</p>
              </div>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        {uploading && (
          <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent">
            <Progress 
              value={progress} 
              className="h-1.5 bg-white/20"
            />
          </div>
        )}

        {/* Title Overlay */}
        {!uploading && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-2">
            <h3 className="text-white font-medium text-xs truncate">{title}</h3>
          </div>
        )}

        {/* Hover Overlay */}
        <div
          className={cn(
            "absolute inset-0 bg-black/0 transition-all duration-300 pointer-events-none",
            isHovered && !uploading && "bg-black/5"
          )}
        />
      </Card>
    </div>
  );
}