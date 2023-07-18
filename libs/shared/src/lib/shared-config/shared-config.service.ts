import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedConfigService {
  private config: any;
  constructor() {}

  setConfig(config: any) {
    this.config = config;
  }

  getConfig() {
    return this.config;
  }
}
