import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Storage} from '@ionic/storage';

import {Property} from '../model/property.model';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  private propertyDb: Storage;

  constructor(private http: HttpClient) {
    this.propertyDb = new Storage({
      name: '__facilityManagerDb',
      storeName: '_properties',
      driverOrder: ['sqlite', 'indexeddb', 'websql', 'localstorage']
    });
  }

  getAllProperties(): Promise<Property[]> {
    const properties: Property[] = [];
    return new Promise<Property[]>(resolve => {
      this.updateProperties().then(() => {
        this.propertyDb.forEach((value: Property) => {
          properties.push(value);
        }).then(() => {
          resolve(properties);
        });
      });
    });
  }

  getProperty(uid: string): Promise<Property> {
    return new Promise<Property>(resolve => {
      this.updateProperties().then(() => {
        this.propertyDb.get(uid).then((p) => {
          resolve(p);
        });
      });
    });
  }

  getPropertiesByCity(city: string): Promise<Property[]> {
    const properties: Property[] = [];
    return new Promise<Property[]>(resolve => {
      this.updateProperties().then(() => {
        this.propertyDb.forEach((value: Property) => {
          if (value.city === city) {
            properties.push(value);
          }
        }).then(() => {
          resolve(properties);
        });
      });
    });
  }

  getPropertyCities(): Promise<string[]> {
    const cities: string[] = [];
    return new Promise<string[]>(resolve => {
      this.updateProperties().then(() => {
        this.propertyDb.forEach((property: Property) => {
          if (!cities.includes(property.city)) {
            cities.push(property.city);
          }
        }).then(() => {
          resolve(cities);
        });
      });
    });
  }

  updateProperties(): Promise<void> {
    return new Promise<void>(resolve => {
      this.http.get<Property[]>('http://dev.inform-objektservice.de/hmdinterface/rest/object/').subscribe(data => {
        this.insertIntoDb(data).then(resolve);
      }, error => {
        console.log(error);
        resolve();
      });
    });
  }

  private async insertIntoDb(data: Property[]) {
    for (const o of data) {
      const p: Property = {
        uid: o.uid,
        deleted: o.deleted,
        hidden: o.hidden,
        title: o.title,
        street: o.street,
        zip: o.zip,
        city: o .city,
        owner: o.owner
      };
      await this.propertyDb.set(p.uid, p);
    }
  }
}
