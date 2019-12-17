import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Storage} from '@ionic/storage';
import {Checklist} from '../model/checklist.model';
import {ChecklistItem} from '../model/checklist-item.model';
import {ObjectChecklist} from '../model/object-checklist.model';
import {Property} from '../model/property.model';
import {PropertyService} from './property.service';

@Injectable({
  providedIn: 'root'
})
export class ObjectChecklistService {

  private static TO_SEND = 'toSend';
  private static SENT = 'sent';
  private checklistDb: Storage;

  constructor(private http: HttpClient, private propertyService: PropertyService) {
    this.checklistDb = new Storage({
      name: '__facilityManagerDb',
      storeName: '_checklists',
      driverOrder: ['sqlite', 'indexeddb', 'websql', 'localstorage']
    });
  }

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
