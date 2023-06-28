import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouterStateService {

  private routeHistory: string[] = [];

  constructor(private router: Router) {
    this.init();
  }

  private init(): void {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      // Only add route to history if it's not a back navigation triggered by this service
      if (!event.urlAfterRedirects.includes('/router-state')) {
        this.routeHistory.push(event.urlAfterRedirects);
      }
    });
  }

  public jumpBack(n: number): void {
    const historyLength = this.routeHistory.length;
    if (n >= historyLength) {
      // If n is greater than or equal to history length, navigate to the root
      this.router.navigateByUrl('/');
    } else {
      // Navigate back n routes
      const targetIndex = historyLength - 1 - n;
      const targetRoute = this.routeHistory[targetIndex];
      this.router.navigateByUrl(targetRoute);
    }
  }
}
