import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { FileValidationService } from '../services/file-validation.service';
import { BulkUpload } from '../services/responses/bulk-upload.Response';
import { FileSelectEvent } from 'primeng/fileupload';
import { HttpErrorResponse } from '@angular/common/http';
import { Message, MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrl: './add-form.component.scss',
})
export class AddFormComponent {

  selectedFile: File | null = null;
  isDimmed: boolean = true;
  messages!: Message[];

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private fileValidationService: FileValidationService,
  ) {}

  submitForm(): void {
    const validation = this.fileValidationService.validate(this.selectedFile);
    if (!validation.valid) {
      if (validation.summary) {
        this.messageService.add({
          severity: 'error',
          summary: validation.summary,
          detail: validation.detail,
        });
      }
      return;
    }

    this.userService.bulkUpload(this.selectedFile!).subscribe({
      next: (res: BulkUpload) => {
        console.log(res.message);
        console.log(res.usersCreated);
        this.messageService.add({
          severity: 'success',
          summary: 'Upload successful',
          detail: 'Users have been uploaded successfully.',
        });
      },
      error: (err: HttpErrorResponse) => {
        const errors = err.error.errors as Record<string, string[]>;
        const errorMessages: Message[] = [];
        Object.entries(errors).forEach(([row, messages]) => {
          errorMessages.push({
            severity: 'error',
            summary: row,
            detail: messages.join('\n'),
          });
        });
        this.messages = errorMessages;
      },
    });
    this.isDimmed = true;
  }

  onSelect(event: FileSelectEvent): void {
    this.messages = [];
    if (event.files && event.files.length > 0) {
      this.isDimmed = false;
      this.selectedFile = event.files[0];
    }
  }

  downloadTemplate(): void {
    this.userService.downloadTemplate().subscribe({
      next: (response) => {
        const blob = response.body!;
        const contentDisposition = response.headers.get('Content-Disposition') ?? '';
        const fileNameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
        const fileName = fileNameMatch ? fileNameMatch[1].replace(/['"]/g, '') : 'bulk-user-template.xlsx';

        const url = URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = fileName;
        anchor.click();
        URL.revokeObjectURL(url);
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Download failed',
          detail: 'Could not download the template. Please try again.',
        });
      },
    });
  }
}
