import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';

import { Damage } from '../model/damage.model';

import {HttpClient} from '@angular/common/http';
import {timestamp} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DamageService {

  private static TO_SEND = 'toSend';
  private static SENT = 'sent';
  private damageDb: Storage;
  private toSend: Damage[];
  private sent: Damage[];

  constructor(private http: HttpClient) {
    this.damageDb = new Storage({
      name: '__facilityManagerDb',
      storeName: '_damages',
      driverOrder: ['sqlite', 'indexeddb', 'websql', 'localstorage']
    });
    this.damageDb.get(DamageService.TO_SEND).then((toSend) => {
      this.toSend = toSend;
    });
    this.damageDb.get(DamageService.SENT).then((sent) => {
      this.sent = sent;
    });
  }

  addDamage(damage: Damage): Promise<any> {
    this.toSend.push(damage);
    return this.damageDb.set(DamageService.TO_SEND, this.toSend);
  }

  getAllDamages(): Promise<Damage[]> {
    const damages: Damage[] = [];
    return this.damageDb.forEach((value: Damage[], key: string) => {
      value.forEach((d: Damage) => {
        damages.push(d);
      });
    }).then(() => {
      return damages;
    });
  }

  sendPendingDamages() {
    this.toSend.forEach(function(value) {
      this.sendDamage(value);
      this.markDamageAsSent(value);
    });
  }

  sendDamage(damage: Damage) {
    this.http.post('http://dev.inform-objektservice.de/hmdinterface/rest/damage/',
        '{"pid": "0", "crdate": ' + damage.createDate + ', "tstamp": ' + damage.createDate + ', "hidden": "0", ' +
        '"archived": "0", "sent_on": "0", "cruser_id": "0", "description": ' + damage.description +
        ', "deleted": "0", "object_uid": ' + damage.property.uid + ', "employee_uid": ' + damage.employee.uid +
        ', "phone": "", "tenant": "", "location": ' + damage.location +
        ', "date": ' + timestamp + ', "images": ' + damage.images + ', "seen": "0" }')
        .subscribe(data => {
          alert(JSON.stringify(data));
        }, error => {
          alert(error);
        });
    }

  markDamageAsSent(damage: Damage): Promise<Damage> {
    this.sent.push(damage);
    // TODO: delete item from toSend
    return this.damageDb.set(DamageService.SENT, this.sent);
  }
}
