import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { S3 } from "@/lib/S3Client";

// Simple validation function
function validateUploadRequest(body: any): { 
  isValid: boolean; 
  data?: { filename: string; contentType: string; fileData: string }; 
  error?: string; 
} {
  if (!body || typeof body !== "object") {
    return { isValid: false, error: "Invalid request body" };
  }

  const { filename, contentType, fileData } = body;

  if (!filename || typeof filename !== "string" || filename.trim().length === 0) {
    return { isValid: false, error: "Filename is required and must be a non-empty string" };
  }

  if (!contentType || typeof contentType !== "string" || !contentType.startsWith("image/")) {
    return { isValid: false, error: "ContentType is required and must be an image type" };
  }

  if (!fileData || typeof fileData !== "string") {
    return { isValid: false, error: "File data is required" };
  }

  return { 
    isValid: true, 
    data: { filename: filename.trim(), contentType, fileData } 
  };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = validateUploadRequest(body);

    if (!validation.isValid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    const { filename, contentType, fileData } = validation.data!;
    const bucketName = process.env.AWS_BUCKET_NAME;

    if (!bucketName) {
      throw new Error("AWS_BUCKET_NAME environment variable is not configured");
    }

    // Convert base64 to buffer
    const buffer = Buffer.from(fileData.split(',')[1], 'base64');
    
    // Check file size (2MB limit)
    if (buffer.length > 2 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File size exceeds 2MB limit" },
        { status: 400 }
      );
    }

    // Generate unique key with timestamp for better organization
    const timestamp = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const uniqueKey = `uploads/${timestamp}/${uuidv4()}-${filename}`;

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: uniqueKey,
      Body: buffer,
      ContentType: contentType,
      ContentLength: buffer.length,
    });

    await S3.send(command);

    return NextResponse.json({
      success: true,
      key: uniqueKey,
      size: buffer.length,
      message: "File uploaded successfully"
    });

  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
