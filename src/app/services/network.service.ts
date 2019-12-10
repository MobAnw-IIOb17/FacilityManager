import { Injectable } from '@angular/core';

import {Network} from '@ionic-native/network';

@Injectable({
  providedIn: 'root'
})

export class NetworkService {

  constructor() { }

  /**
   * @returns `true` if online, `false` if offline
   */
  isOnline() {
    return Network.type !== 'none';
  }

  onOnline() {
    alert('hello, i\'m the network service'); // for debugging purposes
    // TODO: send data to webservice
  }

}
