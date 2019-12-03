import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private settingsDb: Storage;

  constructor() {
    this.settingsDb = new Storage({
      name: '__facilityManagerDb',
      storeName: '_settings',
      driverOrder: ['sqlite', 'indexeddb', 'websql', 'localstorage']
    });
  }

  putSetting(key: string, value: string) {
    this.settingsDb.set(key, value);
  }

  getSetting(key: string): Promise<string> {
    return this.settingsDb.get(key).then((s) => {
      return s as string;
    });
  }
}
