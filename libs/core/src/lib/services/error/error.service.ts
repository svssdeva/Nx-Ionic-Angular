import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor( private alertController: AlertController) {}

  public async handleHttpError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred. Please try again later.';
    if (error.error && typeof error.error === 'string') {
      errorMessage = error.error;
    } else if (error.status === 404) {
      errorMessage = 'The requested resource was not found.';
    } else if (error.status === 403) {
      errorMessage = 'You do not have permission to access this resource.';
    } else if (error.status === 500) {
      errorMessage = 'Internal server error occurred.';
    }
    await this.showErrorMessage(errorMessage);
  }

  public async handleCodeError(error: any) {
    const errorMessage = 'An error occurred. Please try again later.';
    await this.showErrorMessage(errorMessage);
    console.error('Code error occurred:', error);
  }

  async  showErrorMessage(message: string, dismissable?: boolean ) {
    const alert = await this.alertController.create({
      message: message,
      header: 'Error',
      animated: true,
      buttons: ['OK'],
      cssClass: 'alert-error-css',
      backdropDismiss: dismissable || true
    });

    await alert.present();
  }
}
