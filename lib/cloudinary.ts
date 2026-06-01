// Cloudinary signed-upload helper for the photo studio.
//
// We use SIGNED uploads rather than an unsigned preset: the browser can only
// upload after a password-gated server route hands it a short-lived signature.
// The API secret stays server-side (in CLOUDINARY_URL); nothing is exposed to
// the client beyond the per-upload signature, api key, timestamp, and folder.

import { createHash } from "crypto";

const UPLOAD_FOLDER = "tbr-studio";

interface CloudinaryConfig {
  cloudName: string;
  apiKey: string;
  apiSecret: string;
}

// CLOUDINARY_URL format: cloudinary://<api_key>:<api_secret>@<cloud_name>
function parseConfig(): CloudinaryConfig | null {
  const raw = process.env.CLOUDINARY_URL;
  if (!raw) return null;
  const match = raw.match(/^cloudinary:\/\/([^:]+):([^@]+)@(.+)$/);
  if (!match) return null;
  const [, apiKey, apiSecret, cloudName] = match;
  if (!apiKey || !apiSecret || !cloudName) return null;
  return { cloudName, apiKey, apiSecret };
}

export function isCloudinaryConfigured(): boolean {
  return parseConfig() !== null;
}

export interface UploadSignature {
  cloudName: string;
  apiKey: string;
  timestamp: number;
  folder: string;
  signature: string;
}

/**
 * Produce a signature for a direct browser upload. The signed parameter set
 * (here: folder + timestamp) must exactly match what the client sends in its
 * upload form, or Cloudinary rejects the request.
 */
export function signUpload(): UploadSignature | null {
  const config = parseConfig();
  if (!config) return null;
  const timestamp = Math.floor(Date.now() / 1000);
  const toSign = `folder=${UPLOAD_FOLDER}&timestamp=${timestamp}`;
  const signature = createHash("sha1")
    .update(toSign + config.apiSecret)
    .digest("hex");
  return {
    cloudName: config.cloudName,
    apiKey: config.apiKey,
    timestamp,
    folder: UPLOAD_FOLDER,
    signature,
  };
}
