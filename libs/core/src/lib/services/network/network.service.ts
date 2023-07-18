import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  private networkStatus = new Subject<string>();

  constructor() {
    this.monitorNetwork();
  }

  getNetworkStatus() {
    return this.networkStatus.asObservable();
  }

  private monitorNetwork() {
    const localNavigator = navigator as any;
    const connection: MyNetworkInformation = localNavigator.connection || localNavigator.mozConnection || localNavigator.webkitConnection;

    if (connection) {
      connection.addEventListener('change', () => {
        this.updateNetworkStatus(connection);
      });

      // Initial network status check
      this.updateNetworkStatus(connection);
    }
  }

  private updateNetworkStatus(connection: MyNetworkInformation) {
    // Here, we consider a downlink speed of less than 2 Mbps as bad
    if (connection.downlink < 2) {
      this.networkStatus.next('Network speed is bad');
    } else {
      this.networkStatus.next('Network speed is good');
    }
  }
}

interface MyNetworkInformation {
  downlink: number;
  effectiveType: 'slow-2g' | '2g' | '3g' | '4g';
  rtt: number;
  saveData: boolean;
  onchange: null | (() => void);
  addEventListener: (type: string, listener: (this: this, ev: Event) => any, options?: boolean | AddEventListenerOptions) => void;
  removeEventListener: (type: string, listener: (this: this, ev: Event) => any, options?: boolean | EventListenerOptions) => void;
}
