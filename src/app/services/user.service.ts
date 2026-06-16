import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { BulkUpload } from './responses/bulk-upload.Response';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly uploadUrl = `${environment.apiBaseUrl}/users/bulk/upload`;
  private readonly templateUrl = `${environment.apiBaseUrl}/users/bulk/template`;

  constructor(private http: HttpClient) {}

  bulkUpload(file: File): Observable<BulkUpload> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<BulkUpload>(this.uploadUrl, formData);
  }

  downloadTemplate(): Observable<HttpResponse<Blob>> {
    return this.http.get(this.templateUrl, { responseType: 'blob', observe: 'response' });
  }
}
