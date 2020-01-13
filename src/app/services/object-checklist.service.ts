import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Storage} from '@ionic/storage';
import {Checklist} from '../model/checklist.model';
import {ChecklistItem} from '../model/checklist-item.model';
import {ObjectChecklist} from '../model/object-checklist.model';
import {Property} from '../model/property.model';
import {PropertyService} from './property.service';
import {ObjectDefaultChecklist} from '../model/object-default-checklist.model';
import {delay} from 'rxjs/operators';
import {NetworkQueryService} from './network-query.service';

@Injectable({
  providedIn: 'root'
})

/**
 * This service provides functionality for interacting with the object checklist webservice
 * and manages the internal checklist database.
 *
 * @var {string} TO_SEND
 *  marker to set an item as to be sent
 * @var {string} SENT
 *  marker to set an item as sent
 * @var {Storage} checklistDb
 *  the internal database containing the checklists for all the objects/properties
 * @var {ObjectChecklist[]} toSend
 *  an array with all the object checklists pending to send
 * @var {ObjectChecklist[]} sent
 *  an array with all object checklists that are already sent
 * @var {Storage} defaultChecklistDb
 *  internal database to save the default checklists from the webservice
 */
export class ObjectChecklistService {

  private static TO_SEND = 'toSend';
  private static SENT = 'sent';
  private checklistDb: Storage;
  private toSend: ObjectChecklist[] = [];
  private sent: ObjectChecklist[] = [];
  private defaultChecklistDb: Storage;
  private DELAY_TIME = 0.1;

  /**
   * The constructor creates a new ionic storage as employee database.
   * @param http the HttpClient to interact with the webservice
   * @param propertyService the PropertyService to connect the checklists to the respective objects/properties
   * @param networkService the NetworkService to check if there is online access available
   */
  constructor(private http: HttpClient,
              private propertyService: PropertyService,
              private networkService: NetworkQueryService) {
    this.checklistDb = new Storage({
      name: '__facilityManagerDb',
      storeName: '_checklists',
      driverOrder: ['sqlite', 'indexeddb', 'websql', 'localstorage']
    });
    this.checklistDb.get(ObjectChecklistService.TO_SEND).then((toSend) => {
      if (toSend === null) {
        this.checklistDb.set(ObjectChecklistService.TO_SEND, this.toSend);
      } else {
        this.toSend = toSend;
      }
    });
    this.checklistDb.get(ObjectChecklistService.SENT).then((sent) => {
      if (sent === null) {
        this.checklistDb.set(ObjectChecklistService.SENT, this.sent);
      } else {
        this.sent = sent;
      }
    });

    this.defaultChecklistDb = new Storage({
      name: '__facilityManagerDb',
      storeName: '_defaultChecklists',
      driverOrder: ['sqlite', 'indexeddb', 'websql', 'localstorage']
    });
  }

  /**
   * This method adds a new checklist to the database by first pushing it to the `toSend` array and then
   * syncing the array with the database.
   * If there is online access, it directly sends the object checklist to the webservice.
   * @param checklist the checklist to be added
   */
  addChecklist(checklist: ObjectChecklist): Promise<void> {
    if (this.networkService.isOnline) {
      this.sendChecklist(checklist);
    } else {
      this.toSend.push(checklist);
      return this.checklistDb.set(ObjectChecklistService.TO_SEND, this.toSend);
    }
  }

  /**
   * This method gets all checklists, no matter if to send or already sent.
   * @return a promise containing an array of all the ObjectChecklists
   */
  async getAllChecklists(): Promise<ObjectChecklist[]> {
    const checklists: ObjectChecklist[] = [];
    const ocToSend: ObjectChecklist[] = await this.checklistDb.get(ObjectChecklistService.TO_SEND);
    for (const oc of ocToSend) {
      checklists.push(oc);
    }
    const ocSent: ObjectChecklist[] = await this.checklistDb.get(ObjectChecklistService.SENT);
    for (const oc of ocSent) {
      oc.sent = true;
      checklists.push(oc);
    }
    return checklists;
  }

  /**
   * Fetches all default checklists from the webservice and writes them in the database.
   */
  async updateChecklists() {

    const array: Property[] = await this.propertyService.getAllProperties();
    for (const arrayItem of array) {
      await this.getDefaultChecklistFromWebservice(arrayItem.uid);
    }
  }

  /**
   * Returns an object checklist from the default database.
   * @param objectId the object-uid to which the checklist belongs
   */
  getDefaultChecklist(objectId: string): Promise<ObjectChecklist> {
    return new Promise<ObjectChecklist>(resolve => {
      this.defaultChecklistDb.get(objectId).then(checklist => {
        resolve(checklist);
      });
    });
  }

  /**
   * Sends all checklists contained in toSend and moves them to sent.
   */
  sendPendingChecklists() {
    if (this.toSend === []) {
      delay(this.DELAY_TIME);
      if (this.toSend === []) {
        return;
      }
    }
    this.toSend.forEach((value) => {
      this.deleteItemFromArray(value, this.toSend);
      this.sendChecklist(value);
    });
  }

  /**
   * This method sends a checklist to the webservice.
   * @param objectChecklist the checklist to be sent
   */
  private sendChecklist(objectChecklist: ObjectChecklist) {
    const ts: number = Date.now();
    this.http.post('http://dev.inform-objektservice.de/hmdinterface/rest/control/',
      '{"object_uid": ' + objectChecklist.property.uid + ', "update": ' + ts + ' "checklist": '
      + objectChecklist.checklist + '}')
      .subscribe(data => {
        objectChecklist.sentTimestamp = ts;
        this.sent.push(objectChecklist);
        return this.checklistDb.set(ObjectChecklistService.SENT, this.sent);
      }, error => {
        this.toSend.push(objectChecklist);
        return this.checklistDb.set(ObjectChecklistService.TO_SEND, this.toSend);
      });
  }

  /**
   * Gets the default checklist of an object/property from the webservice.
   * @param objectId the id of the object of which we want to get the checklist
   * @return a promise containing a new ObjectChecklist extracted from the default checklist provided by the webservice
   */
  private getDefaultChecklistFromWebservice(objectId: string): Promise<ObjectChecklist> {
    return new Promise<ObjectChecklist>(resolve => {
      this.http.get<ObjectDefaultChecklist>('http://dev.inform-objektservice.de/hmdinterface/rest/control/' + objectId + '/')
        .subscribe(data => {
          this.convertObject(data).then(oc => {
            this.defaultChecklistDb.set(data.object_uid.toString(), oc).then(() => {
              resolve(oc);
            });
          });
        }, error => {
          this.defaultChecklistDb.get(objectId).then(c => {
            resolve(c);
          });
        });
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

  /**
   * A helper method to convert the JSON data from the checklist webservice to an ObjectChecklist.
   * @param data the ObjectDefaultChecklist to be converted into an ObjectChecklist
   * @return a promise with the converted ObjectChecklist
   */
  private async convertObject(data: ObjectDefaultChecklist): Promise<ObjectChecklist> {
    const c: Checklist[] = [];
    Object.keys(data.checklist).forEach(k => {
      const i: ChecklistItem[] = [];
      const items = Reflect.get(data.checklist, k);
      Object.keys(items).forEach(key => {
        i.push({
          name: Reflect.get(items, key) as string,
          description: '',
          images: [],
          isOk: false
        });
      });
      c.push({
        name: k,
        items: i
      });
    });
    const p: Property = await this.propertyService.getProperty(data.object_uid.toString());
    return {
      property: p,
      employee: null,
      checklist: c,
      sent: false,
      sentTimestamp: null,
    };
  }
}
