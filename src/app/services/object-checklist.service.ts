import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Storage} from '@ionic/storage';
import {Checklist} from '../model/checklist.model';
import {ChecklistItem} from '../model/checklist-item.model';
import {ObjectChecklist} from '../model/object-checklist.model';
import {Property} from '../model/property.model';
import {PropertyService} from './property.service';
import {ObjectDefaultChecklist} from '../model/object-default-checklist.model';

@Injectable({
  providedIn: 'root'
})

/**
 * This service provides functionality for interacting with the object checklist webservice
 * and manages the internal checklist database.
 *
 * @var {string} TO_SEND
 *  marker to set an item as to be sent
 * @var {string} sent
 *  marker to set an item as sent
 * @var {Storage} checklistDb
 *  the internal database containing the checklists for all the objects/properties
 */
export class ObjectChecklistService {

  private static TO_SEND = 'toSend';
  private static SENT = 'sent';
  private checklistDb: Storage;

  /**
   * The constructor creates a new ionic storage as employee database.
   * @param http the HttpClient to interact with the webservice
   * @param propertyService the PropertyService to connect the checklists to the respective objects/properties
   */
  constructor(private http: HttpClient, private propertyService: PropertyService) {
    this.checklistDb = new Storage({
      name: '__facilityManagerDb',
      storeName: '_checklists',
      driverOrder: ['sqlite', 'indexeddb', 'websql', 'localstorage']
    });
  }

  /**
   * This method adds a new ObjectChecklist to the database.
   * TODO: maybe more detailed description
   * @param checklist the checklist to be added
   */
  addChecklist(checklist: ObjectChecklist): Promise<void> {
    return new Promise<void>(resolve => {
      this.checklistDb.get(ObjectChecklistService.TO_SEND).then((array: ObjectChecklist[]) => {
        array.push(checklist);
        this.checklistDb.set(ObjectChecklistService.TO_SEND, array).then(() => {
          resolve();
        });
      });
    });
  }

  /**
   * This method gets all checklists, no matter if to send or already sent.
   * @return a promise containing an array of all the ObjectChecklists
   */
  getAllChecklists(): Promise<ObjectChecklist[]> {
    const checklists: ObjectChecklist[] = [];
    return new Promise<ObjectChecklist[]>(resolve => {
      this.checklistDb.get(ObjectChecklistService.TO_SEND).then((a: ObjectChecklist[]) => {
        a.forEach((oc: ObjectChecklist) => {
          checklists.push(oc);
        });
      });
      this.checklistDb.get(ObjectChecklistService.SENT).then((a: ObjectChecklist[]) => {
        a.forEach((oc: ObjectChecklist) => {
          checklists.push(oc);
        });
      });
      resolve(checklists);
    });
  }

  /**
   * Gets the default checklist of an object/property from the webservice.
   * @param objectId the id of the object of which we want to get the checklist
   * @return a promise containing a new ObjectChecklist extracted from the default checklist provided by the webservice
   */
  getDefaultChecklist(objectId: string): Promise<ObjectChecklist> {
    return new Promise<ObjectChecklist>(resolve => {
      this.http.get<ObjectDefaultChecklist>('http://dev.inform-objektservice.de/hmdinterface/rest/control/' + objectId + '/')
        .subscribe(data => {
          this.convertObject(data).then(oc => {
            this.checklistDb.set(data.object_uid.toString(), oc).then(() => {
              resolve(oc);
            });
          });
        }, error => {
          this.checklistDb.get(objectId).then(c => {
            resolve(c);
          });
        });
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
      checklist: c
    };
  }
}
