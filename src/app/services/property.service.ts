import { Injectable } from '@angular/core';

import {Storage} from '@ionic/storage';

import {Property} from '../model/property.model';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  private propertyDb: Storage;

  constructor() {
    this.propertyDb = new Storage({
      name: '__facilityManagerDb',
      storeName: '_properties',
      driverOrder: ['sqlite', 'indexeddb', 'websql', 'localstorage']
    });
  }

  getAllProperties(): Promise<Property[]> {
    const properties: Property[] = [];
    return this.propertyDb.forEach((value: Property, key: string) => {
      properties.push(value);
    }).then(() => {
      return properties;
    });
  }

  getProperty(uid: string): Promise<Property> {
    return this.propertyDb.get(uid).then((p) => {
      return p;
    });
  }

  getPropertiesByCity(city: string): Promise<Property[]> {
    const properties: Property[] = [];
    return this.propertyDb.forEach((value: Property, key: string) => {
      if (value.city === city) {
        properties.push(value);
      }
    }).then(() => {
      return properties;
    });
  }
}
