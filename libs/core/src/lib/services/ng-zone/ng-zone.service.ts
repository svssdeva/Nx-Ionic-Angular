import { Injectable, NgZone } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NgZoneService {

  constructor(private ngZone: NgZone) {}

  public runOutsideNgZone(callback: () => void): void {
    this.ngZone.runOutsideAngular(() => {
      callback();
    });
  }

  public runInsideNgZone(callback: () => void): void {
    this.ngZone.run(callback);
  }
