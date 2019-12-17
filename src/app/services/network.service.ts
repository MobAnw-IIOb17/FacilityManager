import { Injectable } from '@angular/core';

import {Network} from '@ionic-native/network';
import {HttpClient} from '@angular/common/http';
import {DamageService} from './damage.service';

@Injectable({
  providedIn: 'root'
})

export class NetworkService {

  constructor(private http: HttpClient, private damageService: DamageService) {
  }

  /**
   * @returns `true` if online, `false` if offline
   */
  isOnline() {
    return Network.type !== 'none';
  }

  onOnline() {
      // this.damageService.sendPendingDamages();
      this.testPost();
    }

    testPost() {
      this.http.post('http://dev.inform-objektservice.de/hmdinterface/rest/damage/',
          '{"pid": "0", "crdate": "1576567520", "tstamp": "1576567520", "hidden": "0", ' +
          '"archived": "0", "sent_on": "0", "cruser_id": "0", "description": "Alles ist kaputt! TEST TEST", ' +
          '"deleted": "0", "object_uid": "110", "employee_uid": "0", "phone": "", "tenant": "", "location": "", ' +
          '"date": "0", "images": "", "seen": "0" }')
          .subscribe(data => {
            alert(JSON.stringify(data));
          }, error => {
            alert(error);
          });
    }
}
