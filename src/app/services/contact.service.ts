// src/app/services/contact.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface ContactPayload {
  firstName: string;
  lastName:  string;
  email:     string;
  service:   string;
  message:   string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  data?: {
    id:        string;
    fullName:  string;
    email:     string;
    service:   string;
    createdAt: string;
  };
  errors?: { field: string; message: string }[];
}

@Injectable({ providedIn: 'root' })
export class ContactService {

  private apiUrl = `${environment.apiUrl}/contact`;

  constructor(private http: HttpClient) {}

  /**
   * POST /api/contact
   * Submits contact form data to the backend, stored in MongoDB.
   */
  submitContact(payload: ContactPayload): Observable<ContactResponse> {
    return this.http.post<ContactResponse>(this.apiUrl, payload).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.status === 0) {
      // Client-side or network error
      return throwError(() => new Error('Network error — please check your connection.'));
    }
    if (error.status === 422) {
      // Validation errors from server
      const messages = error.error?.errors?.map((e: { message: string }) => e.message).join('. ');
      return throwError(() => new Error(messages || 'Please check your input and try again.'));
    }
    if (error.status === 429) {
      return throwError(() => new Error('Too many requests. Please wait a moment and try again.'));
    }
    return throwError(() => new Error(error.error?.message || 'Server error. Please try again later.'));
  }
}
