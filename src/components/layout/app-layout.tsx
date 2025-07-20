"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Home, Image, Video, FileText, Music, Upload } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface AppLayoutProps {
  children: React.ReactNode;
  onUploadClick?: () => void;
}

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Images", href: "/images", icon: Image },
  { name: "Videos", href: "/videos", icon: Video },
  { name: "Documents", href: "/documents", icon: FileText },
  { name: "Audio", href: "/audio", icon: Music },
];

export function AppLayout({ children, onUploadClick }: AppLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-foreground">GalleryView</h1>
            <Button onClick={onUploadClick} className="gap-2">
              <Upload className="h-4 w-4" />
              Upload
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r bg-muted/20 min-h-[calc(100vh-73px)]">
          <div className="p-4">
            <div className="space-y-1">
              <div className="px-2 py-1 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Discover
              </div>
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
            
            <div className="mt-8 space-y-1">
              <div className="px-2 py-1 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Library
              </div>
              <div className="space-y-1">
                {navigation.slice(1).map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  
                  return (
                    <Link
                      key={`library-${item.name}`}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors",
                        isActive
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
