"use client";

import React from "react";
import { LucideIcon } from "lucide-react";

interface ComingSoonProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

export function ComingSoon({ title, description, icon: Icon }: ComingSoonProps) {
  return (
    <div className="text-center py-16">
      <Icon className="h-16 w-16 mx-auto text-muted-foreground mb-6" />
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-muted-foreground max-w-md mx-auto">
        {description}
      </p>
      <div className="mt-6 text-sm text-muted-foreground">
        This feature is coming soon. Stay tuned for updates!
      </div>
    </div>
  );
}
