import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { FileUploadZone, type UploadedFile } from '../FileUploadZone';

function createUploadedFile(overrides: Partial<UploadedFile> = {}): UploadedFile {
  return {
    file: new File(['file-content'], 'vaccination-record.pdf', {
      type: 'application/pdf',
    }),
    status: 'uploading',
    progress: 42,
    ...overrides,
  };
}

describe('FileUploadZone', () => {
  it('renders an empty state when no files are present', () => {
    render(<FileUploadZone files={[]} onRemove={vi.fn()} />);

    expect(screen.getByText('No files added yet.')).toBeInTheDocument();
  });

  it('matches progress bar width to the provided progress value', () => {
    const { container } = render(
      <FileUploadZone files={[createUploadedFile({ progress: 68 })]} onRemove={vi.fn()} />,
    );

    const fill = container.querySelector('[role="progressbar"] > div');
    expect(fill).not.toBeNull();
    expect((fill as HTMLDivElement).style.width).toBe('68%');
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '68');
  });

  it('shows the error message for a failed file', () => {
    render(
      <FileUploadZone
        files={[
          createUploadedFile({
            status: 'failed',
            progress: 100,
            error: 'File exceeds the allowed size.',
          }),
        ]}
        onRemove={vi.fn()}
      />,
    );

    expect(screen.getByText('Upload failed')).toBeInTheDocument();
    expect(screen.getByText('File exceeds the allowed size.')).toBeInTheDocument();
  });

  it('fires onRemove with the matching file and index', () => {
    const firstFile = createUploadedFile({
      file: new File(['one'], 'first.pdf', { type: 'application/pdf' }),
    });
    const secondFile = createUploadedFile({
      file: new File(['two'], 'second.pdf', { type: 'application/pdf' }),
      status: 'success',
      progress: 100,
    });
    const onRemove = vi.fn();

    render(<FileUploadZone files={[firstFile, secondFile]} onRemove={onRemove} />);

    fireEvent.click(screen.getByRole('button', { name: 'Remove second.pdf' }));

    expect(onRemove).toHaveBeenCalledWith(secondFile, 1);
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it('renders uploading, success, and failed states correctly', () => {
    render(
      <FileUploadZone
        files={[
          createUploadedFile({
            file: new File(['uploading'], 'uploading.pdf', { type: 'application/pdf' }),
            status: 'uploading',
            progress: 10,
          }),
          createUploadedFile({
            file: new File(['success'], 'success.pdf', { type: 'application/pdf' }),
            status: 'success',
            progress: 100,
          }),
          createUploadedFile({
            file: new File(['failed'], 'failed.pdf', { type: 'application/pdf' }),
            status: 'failed',
            progress: 70,
            error: 'Upload timed out.',
          }),
        ]}
        onRemove={vi.fn()}
      />,
    );

    expect(screen.getByText('Uploading')).toBeInTheDocument();
    expect(screen.getByText('Uploaded')).toBeInTheDocument();
    expect(screen.getByText('Upload failed')).toBeInTheDocument();
  });

  it('formats file sizes in a user-friendly way', () => {
    const file = new File([new Uint8Array(2.3 * 1024 * 1024)], 'health-report.pdf', {
      type: 'application/pdf',
    });

    render(
      <FileUploadZone
        files={[
          createUploadedFile({
            file,
            status: 'success',
            progress: 100,
          }),
        ]}
        onRemove={vi.fn()}
      />,
    );

    expect(screen.getByText('2.3 MB')).toBeInTheDocument();
  });

  it('clamps invalid progress values before rendering', () => {
    const { container } = render(
      <FileUploadZone files={[createUploadedFile({ progress: 130 })]} onRemove={vi.fn()} />,
    );

    const fill = container.querySelector('[role="progressbar"] > div');
    expect((fill as HTMLDivElement).style.width).toBe('100%');
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100');
  });
});
