import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private encryptionKey = 'your-encryption-key'; // Replace with your encryption key

  private encryptData(data: string): string | null {
    try {
      const key = this.encryptionKey;
      let encrypted = '';
      for (let i = 0; i < data.length; i++) {
        const charCode = data.charCodeAt(i) ^ key.charCodeAt(i % key.length);
        encrypted += String.fromCharCode(charCode);
      }
      return btoa(encrypted);
    } catch (error) {
      console.error('Error encrypting data:', error);
      return null;
    }
  }

  private decryptData(encryptedData: string): string | null {
    try {
      const key = this.encryptionKey;
      const encrypted = atob(encryptedData);
      let decrypted = '';
      for (let i = 0; i < encrypted.length; i++) {
        const charCode = encrypted.charCodeAt(i) ^ key.charCodeAt(i % key.length);
        decrypted += String.fromCharCode(charCode);
      }
      return decrypted;
    } catch (error) {
      console.error('Error decrypting data:', error);
      return null;
    }
  }

  getItem(key: string): any {
    const encryptedData = localStorage.getItem(key);
    if (encryptedData) {
      const decryptedData = this.decryptData(encryptedData);
      if (decryptedData) {
        return JSON.parse(decryptedData);
      }
    }
    return null;
  }

  setItem(key: string, value: any): void {
    const encryptedData = this.encryptData(JSON.stringify(value));
    if (encryptedData) {
      localStorage.setItem(key, encryptedData);
    }
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}
