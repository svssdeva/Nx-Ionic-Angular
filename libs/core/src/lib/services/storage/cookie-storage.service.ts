import { Injectable } from "@angular/core";
@Injectable({
  providedIn: 'root'
})
export class CookieStorageService {
  private readonly encryptionKey = 'YourEncryptionKey';

  public getCookie(name: string): string | null {
    const encodedName = encodeURIComponent(name) + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');

    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(encodedName) === 0) {
        const encryptedValue = cookie.substring(encodedName.length, cookie.length);
        const decryptedValue = this.decrypt(encryptedValue);
        return decryptedValue;
      }
    }
    return null;
  }

  public setCookie(name: string, value: string, expirationDays: number): void {
    const encryptedValue = this.encrypt(value);
    const encodedName = encodeURIComponent(name) + '=';
    const encodedValue = encodeURIComponent(encryptedValue) + ';';
    const expirationDate = this.getExpirationDate(expirationDays);
    const cookieString = encodedName + encodedValue + 'expires=' + expirationDate + ';path=/';
    document.cookie = cookieString;
  }

  public deleteCookie(name: string): void {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }

  private encrypt(value: string): string {
    const encryptedValue = btoa(value + this.encryptionKey);
    return encryptedValue;
  }

  private decrypt(encryptedValue: string): string {
    const decryptedValue = atob(encryptedValue);
    const value = decryptedValue.replace(this.encryptionKey, '');
    return value;
  }

  private getExpirationDate(expirationDays: number): string {
    const currentDate = new Date();
    const expirationDate = new Date(currentDate.getTime() + expirationDays * 24 * 60 * 60 * 1000);
    return expirationDate.toUTCString();
  }
}
