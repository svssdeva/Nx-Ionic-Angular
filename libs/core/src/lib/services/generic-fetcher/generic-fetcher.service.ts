import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from '../api/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../error/error.service';
import { ApiLoadingService } from '../api/api-loading.service';

@Injectable({
  providedIn: 'root'
})
export class GenericFetcherService {
  private items: Item[] = [];
  private currentPage = 0;
  private totalPages = 0;
  private itemsSubject = new BehaviorSubject<Item[]>([]);
  private items$ = this.itemsSubject.asObservable();
  
  constructor(private apiService: ApiService, private errorService: ErrorService, private apiLoadingService: ApiLoadingService) { }
  public getItems(): Observable<Item[]> {
    if (this.currentPage === 0 || this.currentPage < this.totalPages) {
      this.fetchItems(this.currentPage + 1);
    }
    return this.items$;
  }

  private async fetchItems(page: number) {
    const errorStatus = await this.apiLoadingService.getHas401Error();
    if (errorStatus === true) {
      return; // Don't make the API call if a 401 error has occurred
    }
    this.apiService.get('page').subscribe({
      next: (response: any) => {
        this.items = [...this.items, ...response.items];
        this.currentPage = response.page;
        this.totalPages = response.totalPages;
        this.itemsSubject.next(this.items);
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {
         
          this.errorService.handleHttpError(error);
        } else {
          this.errorService.handleCodeError(error);
        }
      },
      complete: () => console.info('complete') 
  });
  }
}


interface Item {
  _id: string;
  name: string;
}