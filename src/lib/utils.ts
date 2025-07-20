import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function validateUploadRequest(body: any): { 
  isValid: boolean; 
  data?: { filename: string; contentType: string; size: number }; 
  error?: string; 
} {
  if (!body || typeof body !== "object") {
    return { isValid: false, error: "Invalid request body" };
  }

  const { filename, contentType, size } = body;

  if (!filename || typeof filename !== "string" || filename.trim().length === 0) {
    return { isValid: false, error: "Filename is required and must be a non-empty string" };
  }

  if (!contentType || typeof contentType !== "string" || !contentType.startsWith("image/")) {
    return { isValid: false, error: "ContentType is required and must be an image type" };
  }

  if (!size || typeof size !== "number" || size <= 0 || size > 2 * 1024 * 1024) {
    return { isValid: false, error: "Size must be a positive number and not exceed 2MB" };
  }

  return { 
    isValid: true, 
    data: { filename: filename.trim(), contentType, size } 
  };
}
