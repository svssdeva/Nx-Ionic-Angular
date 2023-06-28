import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RedirectionService {

  private redirectUrl: string | null = null;

  constructor(private router: Router) {}

  setRedirectUrl(url: string): void {
    this.redirectUrl = url;
  }

  clearRedirectUrl(): void {
    this.redirectUrl = null;
  }

  redirectToSavedUrl(): void {
    if (this.redirectUrl) {
      const decodedUrl = decodeURIComponent(this.redirectUrl);
      this.router.navigateByUrl(decodedUrl);
      this.clearRedirectUrl();
    }
  }
}
