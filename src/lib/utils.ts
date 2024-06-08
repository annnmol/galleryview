import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDateTime = (dateString: Date) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    month: "short", 
    day: "numeric",
    hour: "numeric", 
    minute: "numeric", 
    hour12: true, 
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short", 
    year: "numeric", 
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric", 
    minute: "numeric", 
    hour12: true, 
  };

  const formattedDateTime: string = new Date(dateString).toLocaleString(
    "en-US",
    dateTimeOptions
  );

  const formattedDate: string = new Date(dateString).toLocaleString(
    "en-US",
    dateOptions
  );

  const formattedTime: string = new Date(dateString).toLocaleString(
    "en-US",
    timeOptions
  );

  return {
    dateTime: formattedDateTime,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  };
};

export const AVAIABLE_MEDIA_TYPES = ['image', 'video', 'document', 'audio'];

export const getCurrentMediaExtensions = (type: string) => {
  switch (type) {
    case "image":
      return IMAGE_EXTENSIONS;
    case "video":
      return VIDEO_EXTENSIONS;
    case "audio":
      return AUDIO_EXTENSIONS;
    case "document":
      return DOCUMENT_EXTENSIONS;
    default:
      return ["*"];
  }
}
export const getCoverMedia = (type: string) => {
  switch (type) {
    case "video":
      return "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?q=80&w=2065&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    case "audio":
      return "https://images.unsplash.com/photo-1619983081563-430f63602796?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    case "document":
      return "https://images.unsplash.com/photo-1619418602850-35ad20aa1700?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    default:
      return "";
  }
}

export const IMAGE_EXTENSIONS = ["image/jpeg", "image/png"];
export const VIDEO_EXTENSIONS = ["video/mp4", "video/3gp"];
export const AUDIO_EXTENSIONS = ["audio/aac", "audio/mp4", "audio/mpeg", "audio/amr"];

export const DOCUMENT_EXTENSIONS = [
  "text/csv",
  "text/plain",
  "application/pdf",
  "application/vnd.ms-powerpoint",
  "application/msword",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];