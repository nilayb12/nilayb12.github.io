import 'server-only';
import fs from 'node:fs';
import path from 'node:path';
import type { ResumeInfo } from '../interfaces/resume';

// Runs at build time. Finds the résumé PDF so the page can show the
// Résumé card only when there is one.

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const RESUME_NAME = /(resume|résumé|cv)/i;

/**
 * Uses `resume.fileUrl` from the config if set; otherwise looks in /public
 * for a PDF with "resume" or "cv" in its name (e.g. resume.pdf,
 * Nilay_Baranwal_CV.pdf). Returns null if there is no résumé.
 */
export function findResume(
  fileUrl: string,
  displayName: string,
): ResumeInfo | null {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const downloadName = `${displayName.trim().replace(/\s+/g, '-') || 'Resume'}-Resume.pdf`;

  // 1. Explicit setting in the config
  if (fileUrl) {
    if (/^https?:\/\//.test(fileUrl)) {
      return { url: fileUrl, downloadName, local: false };
    }
    const rel = fileUrl.replace(/^\/+/, '');
    const file = path.join(PUBLIC_DIR, rel);
    if (!fs.existsSync(file)) {
      console.warn(
        `[resume] resume.fileUrl is '${fileUrl}' but public/${rel} doesn't exist.`,
      );
      return null;
    }
    return {
      url: `${base}/${rel}`,
      downloadName,
      size: fs.statSync(file).size,
      local: true,
    };
  }

  // 2. Automatic: a résumé-looking PDF in /public
  if (!fs.existsSync(PUBLIC_DIR)) return null;
  const match = fs
    .readdirSync(PUBLIC_DIR)
    .filter((f) => f.toLowerCase().endsWith('.pdf') && RESUME_NAME.test(f))
    .sort()[0];
  if (!match) return null;

  const file = path.join(PUBLIC_DIR, match);
  console.log(`[resume] Found public/${match}`);
  return {
    url: `${base}/${encodeURIComponent(match)}`,
    downloadName,
    size: fs.statSync(file).size,
    local: true,
  };
}
