import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';

import { Damage } from '../model/damage.model';

@Injectable({
  providedIn: 'root'
})
export class DamageService {

  private static TO_SEND = 'toSend';
  private static SEND = 'send';
  private damageDb: Storage;
  private toSend: Damage[];
  private send: Damage[];

  constructor() {
    this.damageDb = new Storage({
      name: '__facilityManagerDb',
      storeName: '_damages',
      driverOrder: ['sqlite', 'indexeddb', 'websql', 'localstorage']
    });
    this.damageDb.get(DamageService.TO_SEND).then((toSend) => {
      this.toSend = toSend;
    });
    this.damageDb.get(DamageService.SEND).then((send) => {
      this.send = send;
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
}
