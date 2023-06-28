import { Injectable } from '@angular/core';
import { GenericFetcherService } from '../generic-fetcher/generic-fetcher.service';
import { AlertController } from '@ionic/angular';
import { ApiService } from './api.service';
@Injectable({
  providedIn: 'root'
})
export class ApiWatcherService {

  private isAlertShown = false;

  constructor(private genericFetcher: GenericFetcherService, private alertController: AlertController, private apiService: ApiService) {}

  private checkFor401Error(): void {
    if (!this.isAlertShown && this.apiService.getLastStatusCode() === 401) {
      this.isAlertShown = true;
      this.showAlert('Authorization error. Please login again.');
    }
  }

  async  showAlert(message: string, dismissable?: boolean ) {
    const alert = await this.alertController.create({
      message: message || '',
      header: 'Error',
      animated: true,
      buttons: ['OK'],
      cssClass: 'alert-auth-css',
      backdropDismiss: dismissable || true
    });

    await alert.present();
  }
}
