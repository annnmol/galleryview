import { NextResponse } from "next/server";
import { paginateListObjectsV2 } from "@aws-sdk/client-s3";
import { S3 } from "@/lib/S3Client";

// Simple validation function for list request
function validateListRequest(searchParams: URLSearchParams): { 
  isValid: boolean; 
  data?: { prefix?: string; maxKeys?: number; pageSize?: number }; 
  error?: string; 
} {
  const prefix = searchParams.get('prefix') || undefined;
  const maxKeysParam = searchParams.get('maxKeys');
  const pageSizeParam = searchParams.get('pageSize');

  let maxKeys = 1000; // Default max keys
  let pageSize = 100; // Default page size

  if (maxKeysParam) {
    const parsedMaxKeys = parseInt(maxKeysParam, 10);
    if (isNaN(parsedMaxKeys) || parsedMaxKeys <= 0 || parsedMaxKeys > 1000) {
      return { isValid: false, error: "maxKeys must be a positive number between 1 and 1000" };
    }
    maxKeys = parsedMaxKeys;
  }

  if (pageSizeParam) {
    const parsedPageSize = parseInt(pageSizeParam, 10);
    if (isNaN(parsedPageSize) || parsedPageSize <= 0 || parsedPageSize > 1000) {
      return { isValid: false, error: "pageSize must be a positive number between 1 and 1000" };
    }
    pageSize = parsedPageSize;
  }

  return { 
    isValid: true, 
    data: { prefix, maxKeys, pageSize } 
  };
}

// Helper function to list objects with pagination
async function listObjects(bucketName: string, prefix?: string, maxKeys = 1000, pageSize = 100) {
  const paginator = paginateListObjectsV2(
    { client: S3, pageSize },
    { 
      Bucket: bucketName,
      Prefix: prefix,
      MaxKeys: maxKeys
    }
  );

  const objects: string[] = [];
  let totalSize = 0;
  let totalCount = 0;

  for await (const page of paginator) {
    if (page.Contents) {
      const keys = page.Contents
        .filter(obj => obj.Key) // Ensure Key exists
        .map(obj => obj.Key!); // Get object keys only
      
      objects.push(...keys);
      
      // Calculate total size and count for metadata
      totalCount += page.Contents.length;
      totalSize += page.Contents.reduce((sum, obj) => sum + (obj.Size || 0), 0);
    }

    // Stop if we've reached the maxKeys limit
    if (objects.length >= maxKeys) {
      break;
    }
  }

  return {
    objects: objects.slice(0, maxKeys), // Ensure we don't exceed maxKeys
    metadata: {
      totalCount,
      totalSize,
      prefix: prefix || null,
      maxKeys,
      returnedCount: Math.min(objects.length, maxKeys)
    }
  };
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const validation = validateListRequest(url.searchParams);

    if (!validation.isValid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    const { prefix, maxKeys, pageSize } = validation.data!;
    const bucketName = process.env.AWS_BUCKET_NAME;

    if (!bucketName) {
      throw new Error("AWS_BUCKET_NAME environment variable is not configured");
    }

    const result = await listObjects(bucketName, prefix, maxKeys, pageSize);

    return NextResponse.json({
      success: true,
      data: result.objects,
      metadata: result.metadata
    });

  } catch (error) {
    console.error("Error listing S3 objects:", error);
    return NextResponse.json(
      { error: "Failed to list objects" },
      { status: 500 }
    );
  }
}
