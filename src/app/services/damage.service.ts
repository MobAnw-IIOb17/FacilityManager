import {Injectable} from '@angular/core';

import {Storage} from '@ionic/storage';

import {Damage} from '../model/damage.model';

import {HttpClient} from '@angular/common/http';
import {delay} from 'rxjs/operators';
import {NetworkQueryService} from './network-query.service';

@Injectable({
  providedIn: 'root'
})

/**
 * This service provides access to an intermediate database to save pending damage reports and
 * sends them to the Webservice as soon as there's internet access.
 *
 * @var {string} TO_SEND
 *  marker to set an item as to be sent
 * @var {string} sent
 *  marker to set an item as sent
 * @var {Storage} damageDb
 *  the internal database containing damage reports
 * @var {Damage[]} toSend
 *  an array with all the damage reports pending to send
 * @var {Damage[]} sent
 *  an array with all damage reports that are already sent
 */
export class DamageService {

  private static TO_SEND = 'toSend';
  private static SENT = 'sent';
  private damageDb: Storage;
  private toSend: Damage[] = [];
  private sent: Damage[] = [];
  private DELAY_TIME = 0.1;

  /**
   * The constructor creates a new ionic storage as damage database with two columns:
   * `TO_SEND` and `SEND` for distinguishing between pending damage reports and already sent ones.
   * It also creates two arrays for storing the damage reports of each of these two columns.
   * @param http the http client to interact with the webservice
   * @param networkService networkService for checking if internet is available
   */
  constructor(private http: HttpClient, private networkService: NetworkQueryService) {
    this.damageDb = new Storage({
      name: '__facilityManagerDb',
      storeName: '_damages',
      driverOrder: ['sqlite', 'indexeddb', 'websql', 'localstorage']
    });
    this.damageDb.get(DamageService.TO_SEND).then((toSend) => {
      if (toSend === null) {
        this.damageDb.set(DamageService.TO_SEND, this.toSend);
      } else {
        this.toSend = toSend;
      }
    });
    this.damageDb.get(DamageService.SENT).then((sent) => {
      if (sent === null) {
        this.damageDb.set(DamageService.SENT, this.sent);
      } else {
        this.sent = sent;
      }
    });
  }

  /**
   * This method adds a new damage to the database by first pushing it to the `toSend` array and then
   * syncing the array with the database.
   * If there is online access, it directly sends the damage report to the webservice.
   * @param damage the damage object to be added to the database
   * @return promise containing the execution of the database adding method
   */
  addDamage(damage: Damage): Promise<any> {
    if (this.networkService.isOnline) {
      this.sendDamage(damage);
    } else {
      this.toSend.push(damage);
      return this.damageDb.set(DamageService.TO_SEND, this.toSend);
    }
  }

  /**
   * This method lists all damage objects contained in the database.
   * @return promise with an array containing all damages
   */
  async getAllDamages(): Promise<Damage[]> {
    const damages: Damage[] = [];
    const dToSend: Damage[] = await this.damageDb.get(DamageService.TO_SEND);
    for (const d of dToSend) {
      damages.push(d);
    }
    const dSent: Damage[] = await this.damageDb.get(DamageService.SENT);
    for (const d of dSent) {
      d.sent = true;
      damages.push(d);
    }
    return damages;
  }

  /**
   * This method sends all not yet sent damages to the webservice and puts them to `SENT`.
   */
  sendPendingDamages() {
    if (this.toSend === []) {
      delay(this.DELAY_TIME);
      if (this.toSend === []) {
        return;
      }
    }
    this.toSend.forEach((value) => {
      this.deleteItemFromArray(value, this.toSend);
      this.sendDamage(value);
    });
  }

  /**
   * This is a helper method to send a single damage report to the webservice,
   * adding all required attributes which are not given by the damage object specification.
   * @param damage the damage object to be sent
   */
  private sendDamage(damage: Damage) {
    const ts: number = Date.now();
    this.http.post('http://dev.inform-objektservice.de/hmdinterface/rest/damage/',
      '{"pid": "0", "crdate": ' + damage.createDate + ', "tstamp": ' + damage.createDate + ', "hidden": "0", ' +
      '"archived": "0", "sent_on": "0", "cruser_id": "0", "description": ' + damage.description +
      ', "deleted": "0", "object_uid": ' + damage.property.uid + ', "employee_uid": ' + damage.employee.uid +
      ', "phone": "", "tenant": "", "location": ' + damage.location +
      ', "date": ' + ts + ', "images": ' + damage.images + ', "seen": "0" }')
      .subscribe(data => {
        damage.sentTimestamp = ts;
        this.sent.push(damage);
        return this.damageDb.set(DamageService.SENT, this.sent);
      }, error => {
        this.toSend.push(damage);
        return this.damageDb.set(DamageService.TO_SEND, this.toSend);
      });
  }

  /**
   * This is a helper method to delete an item from an array.
   * @param item the item that should be deleted, e.g. a damage object
   * @param array the array that the item should be deleted from
   */
  private deleteItemFromArray(item: any, array: any[]) {
    array.forEach((arrayItem, index) => {
      if (arrayItem === item) {
        array.splice(index, 1);
      }
    });
  }
}
