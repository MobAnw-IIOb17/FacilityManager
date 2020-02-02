import {Injectable} from '@angular/core';
import {Network} from '@ionic-native/network';

@Injectable({
  providedIn: 'root'
})

/**
 * This service can be included to perform queries about the network connection.
 * For now you can only find out whether there is network access or not.
 */
export class NetworkQueryService {

  constructor() {
  }

  /**
   * This method can be used to test whether the app has online access or not.
   *
   * @returns `true` if online, `false` if offline
   */
  isOnline() {
    return Network.type !== 'none';
  }
}
