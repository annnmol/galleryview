import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3 } from "@/lib/S3Client";
import { validateUploadRequest } from "@/lib/utils";


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

    const { filename, contentType, size } = validation.data!;
    const bucketName = process.env.AWS_BUCKET_NAME;

    if (!bucketName) {
      throw new Error("AWS_BUCKET_NAME environment variable is not configured");
    }

    // Generate unique key with timestamp for better organization
    const timestamp = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const uniqueKey = `uploads/${timestamp}/${uuidv4()}-${filename}`;

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: uniqueKey,
      ContentType: contentType,
      ContentLength: size,
    });

    const presignedUrl = await getSignedUrl(S3, command, {
      expiresIn: 300, // 5 minutes - optimal for uploads
    });

    return NextResponse.json({
      presignedUrl,
      key: uniqueKey,
      expiresIn: 300
    });

  } catch (error) {
    console.error("Error generating presigned URL:", error);
    return NextResponse.json(
      { error: "Failed to generate upload URL" },
      { status: 500 }
    );
  }
}
