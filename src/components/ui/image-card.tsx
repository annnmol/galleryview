"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageCardProps {
  id: string;
  title: string;
  url: string;
  alt: string;
  onDelete?: (id: string) => void;
  className?: string;
}

export function ImageCard({
  id,
  title,
  url,
  alt,
  onDelete,
  className
}: ImageCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleDelete = () => {
    if (onDelete) {
      onDelete(id);
    }
  };

  return (
    <div className="w-full max-w-[200px] mx-auto">
      <Card
        className={cn(
          "group relative overflow-hidden border-0 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer bg-gradient-to-br from-slate-50 to-slate-100 aspect-square",
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
          className={cn(
            "absolute top-1.5 right-1.5 z-10 h-6 w-6 p-0 bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-200 shadow-sm",
            isHovered ? "opacity-100 scale-100" : "opacity-0 scale-90"
          )}
        >
          <Trash2 className="h-3 w-3 text-red-500" />
        </Button>

        {/* Image Container */}
        <div className="w-full h-full overflow-hidden bg-muted">
          {!imageError ? (
            <div
              className={cn(
                "w-full h-full transition-transform duration-300 ease-out",
                isHovered && "scale-105"
              )}
            >
              {/* Placeholder since we don't have real images */}
              <div className="w-full h-full bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-8 h-8 bg-white/80 rounded-lg mx-auto mb-2 flex items-center justify-center shadow-sm">
                    <div className="w-4 h-4 bg-gradient-to-br from-blue-400 to-purple-500 rounded-sm"></div>
                  </div>
                  <p className="text-xs font-medium text-slate-600 px-2 line-clamp-2">{title}</p>
                </div>
              </div>
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

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-2">
          <h3 className="text-white font-medium text-xs truncate">{title}</h3>
        </div>

        {/* Hover Overlay */}
        <div
          className={cn(
            "absolute inset-0 bg-black/0 transition-all duration-300",
            isHovered && "bg-black/5"
          )}
        />
      </Card>
    </div>
  );
}