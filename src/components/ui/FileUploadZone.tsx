import { AlertCircle, Check, Loader2, X } from 'lucide-react';

export type UploadedFileStatus = 'uploading' | 'success' | 'failed';

export interface UploadedFile {
  file: File;
  status: UploadedFileStatus;
  progress: number;
  error?: string;
}

interface FileUploadZoneProps {
  files: UploadedFile[];
  onRemove: (file: UploadedFile, index: number) => void;
  emptyLabel?: string;
}

const fileSizeFormatter = new Intl.NumberFormat(undefined, {
  maximumFractionDigits: 1,
});

function clampProgress(progress: number): number {
  return Math.min(Math.max(progress, 0), 100);
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) {
    return `${fileSizeFormatter.format(bytes)} B`;
  }

  const units = ['KB', 'MB', 'GB', 'TB'];
  let value = bytes / 1024;
  let unitIndex = 0;

  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }

  return `${fileSizeFormatter.format(value)} ${units[unitIndex]}`;
}

export function FileUploadZone({
  files,
  onRemove,
  emptyLabel = 'No files added yet.',
}: FileUploadZoneProps) {
  if (files.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-4 py-6 text-center text-sm text-gray-500">
        {emptyLabel}
      </div>
    );
  }

  return (
    <ul className="space-y-3" aria-label="Uploaded files">
      {files.map((uploadedFile, index) => {
        const progress = clampProgress(uploadedFile.progress);
        const isUploading = uploadedFile.status === 'uploading';
        const isSuccess = uploadedFile.status === 'success';
        const isFailed = uploadedFile.status === 'failed';

        return (
          <li
            key={`${uploadedFile.file.name}-${uploadedFile.file.size}-${index}`}
            className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
          >
            <div className="flex items-start gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <p className="truncate text-sm font-semibold text-gray-900">
                    {uploadedFile.file.name}
                  </p>
                  <span className="text-xs text-gray-500">
                    {formatFileSize(uploadedFile.file.size)}
                  </span>
                </div>

                <div className="mt-2 flex items-center gap-2 text-xs font-medium">
                  {isUploading ? (
                    <>
                      <Loader2
                        className="h-4 w-4 animate-spin text-[#0D1B2A]"
                        aria-hidden="true"
                      />
                      <span className="text-gray-600">Uploading</span>
                    </>
                  ) : null}

                  {isSuccess ? (
                    <>
                      <Check className="h-4 w-4 text-green-600" aria-hidden="true" />
                      <span className="text-green-700">Uploaded</span>
                    </>
                  ) : null}

                  {isFailed ? (
                    <>
                      <AlertCircle className="h-4 w-4 text-red-600" aria-hidden="true" />
                      <span className="text-red-700">Upload failed</span>
                    </>
                  ) : null}
                </div>
              </div>

              <button
                type="button"
                onClick={() => onRemove(uploadedFile, index)}
                className="rounded-full p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0D1B2A]/20"
                aria-label={`Remove ${uploadedFile.file.name}`}
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            {isUploading ? (
              <div className="mt-3 space-y-1.5">
                <div
                  className="h-2 w-full overflow-hidden rounded-full bg-gray-100"
                  role="progressbar"
                  aria-label={`Upload progress for ${uploadedFile.file.name}`}
                  aria-valuenow={progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className="h-full rounded-full bg-[#E84D2A] transition-[width] duration-300 ease-out motion-reduce:transition-none"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-right text-xs text-gray-500">{progress}%</p>
              </div>
            ) : null}

            {isFailed && uploadedFile.error ? (
              <p className="mt-3 text-xs text-red-600">{uploadedFile.error}</p>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
