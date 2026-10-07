/** The résumé found (or configured) at build time. */
export interface ResumeInfo {
  /** Address of the PDF, ready to use in a link. */
  url: string;
  /** Name the file is saved under when downloaded. */
  downloadName: string;
  /** File size in bytes, when the PDF is part of the site. */
  size?: number;
  /** Whether the PDF is part of this site (download works) or hosted elsewhere. */
  local: boolean;
}
