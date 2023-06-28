import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders , HttpParams} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { LocalStorageService } from '../storage/local-storage.service';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  lastErrorStatusCode = 0;
  constructor( private http: HttpClient,
    private localStorageService: LocalStorageService) {}

  private get apiUrl(): string {
    // return this.globalConstants.apiUrl;
    return '';
  }
  
  public getLastStatusCode(): number {
    return this.lastErrorStatusCode;
  }

  public setLastStatusCode(code: number) {
    this.lastErrorStatusCode = code;
  }

  public get<T>(path: string, params?: HttpParams): Observable<T> {
    const url = this.apiUrl + path;
    const headers = this.buildHeaders();
    return this.http.get<T>(url, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        this.setLastStatusCode(error.status);
        return throwError(() => error);
      })
    );
  }

  public post<T>(path: string, body: any): Observable<T> {
    const url = this.apiUrl + path;
    const headers = this.buildHeaders();
    return this.http.post<T>(url, body, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        this.setLastStatusCode(error.status);
        return throwError(() => error);
      })
    );;
  }

  public put<T>(path: string, body: any): Observable<T> {
    const url = this.apiUrl + path;
    const headers = this.buildHeaders();
    return this.http.put<T>(url, body, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        this.setLastStatusCode(error.status);
        return throwError(() => error);
      })
    );;
  }

  public delete<T>(path: string): Observable<T> {
    const url = this.apiUrl + path;
    const headers = this.buildHeaders();
    return this.http.delete<T>(url, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        this.setLastStatusCode(error.status);
        return throwError(() => error);
      })
    );;
  }
  private buildHeaders(): HttpHeaders {
    let headers = new HttpHeaders();

    // Set the token from the global service (replace 'YOUR_TOKEN_SERVICE' with your actual service)
   // const token = YOUR_TOKEN_SERVICE.getToken() || '';
    const token = '';
    if (token) {
      headers = headers.append('Authorization', `Bearer ${token}`);
    }

    // Get additional headers from the LocalStorageService
    const clientType = this.localStorageService.getItem('client-type') || '';
    const clientId = this.localStorageService.getItem('client-id') || '';
    const randomId = this.localStorageService.getItem('randomid') || '';

    if (clientType) {
      headers = headers.append('Client-Type', clientType);
    }

    if (clientId) {
      headers = headers.append('Client-ID', clientId);
    }

    if (randomId) {
      headers = headers.append('RandomID', randomId);
    }

    return headers;
  }
}
