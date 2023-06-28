import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiLoadingService {

  private isApiFiringSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isApiFiring$: Observable<boolean> = this.isApiFiringSubject.asObservable();

  private has401ErrorSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public has401Error$: Observable<boolean> = this.has401ErrorSubject.asObservable();

  public setIsApiFiring(value: boolean): void {
    this.isApiFiringSubject.next(value);
  }

  public setHas401Error(value: boolean): void {
    this.has401ErrorSubject.next(value);
  }

  public async getHas401Error(): Promise<boolean> {
    const data = await lastValueFrom(this.has401Error$);
    return data;
  }
  public async getIsApiFiring(): Promise<boolean> {
    const data = await lastValueFrom(this.isApiFiring$);
    return data;
  }
}
