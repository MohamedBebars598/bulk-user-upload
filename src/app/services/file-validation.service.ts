import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

export interface FileValidationResult {
  valid: boolean;
  summary?: string;
  detail?: string;
}

@Injectable({ providedIn: 'root' })
export class FileValidationService {
  private readonly maxSizeBytes = environment.maxFileSizeMb * 1024 * 1024;

  validate(file: File | null): FileValidationResult {
    if (!file) {
      return { valid: false };
    }

    if (file.size > this.maxSizeBytes) {
      return {
        valid: false,
        summary: 'File too large',
        detail: `File size must not exceed ${environment.maxFileSizeMb} MB.`,
      };
    }

    if (!file.name.toLowerCase().endsWith('.xlsx')) {
      return {
        valid: false,
        summary: 'Invalid file type',
        detail: 'Only .xlsx files are accepted.',
      };
    }

    return { valid: true };
  }
}
