import { Injectable } from '@angular/core';
import {Storage} from '@ionic/storage';
import {ObjectChecklist} from '../model/object-checklist.model';

@Injectable({
  providedIn: 'root'
})
export class ObjectChecklistService {

  private checklistDb: Storage;

  constructor() {
    this.checklistDb = new Storage({
      name: '__facilityManagerDb',
      storeName: '_checklists',
      driverOrder: ['sqlite', 'indexeddb', 'websql', 'localstorage']
    });
  }

  addChecklist(checklist: ObjectChecklist) {
    this.checklistDb.set(checklist.property.uid, checklist);
  }

  getAllChecklists(): Promise<ObjectChecklist[]> {
    const checklists: ObjectChecklist[] = [];
    return this.checklistDb.forEach((value: ObjectChecklist) => {
      checklists.push(value);
    }).then(() => {
      return checklists;
    });
  }

  getChecklist(objectId: string): Promise<ObjectChecklist> {
    return this.checklistDb.get(objectId).then((c) => {
      return c;
    });
  }
}
