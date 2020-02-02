import {Injectable} from '@angular/core';

import {Storage} from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})

/**
 * This service provides an interface to manage settings like currently logged in employee.
 *
 * @var {Storage} settingsDb
 *  The internal data base to save settings.
 */
export class SettingsService {

  private settingsDb: Storage;

  /**
   * This constructor creates a new ionic storage as settings database.
   */
  constructor() {
    this.settingsDb = new Storage({
      name: '__facilityManagerDb',
      storeName: '_settings',
      driverOrder: ['sqlite', 'indexeddb', 'websql', 'localstorage']
    });
  }

  /**
   * This method creates or edits a setting.
   *
   * @param key the unique name of the setting
   * @param value the value of the setting
   */
  putSetting(key: string, value: string) {
    this.settingsDb.set(key, value);
  }

  /**
   * This method returns the value of a given setting.
   *
   * @param key the unique name of the setting
   * @return a promise containing the value
   */
  getSetting(key: string): Promise<string> {
    return this.settingsDb.get(key).then((s) => {
      return s as string;
    });
  }
}
