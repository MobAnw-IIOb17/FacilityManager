import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Storage} from '@ionic/storage';

import {Property} from '../model/property.model';

@Injectable({
  providedIn: 'root'
})

/**
 * This service provides functionality to fetch the latest data from the property/object webservice
 * and manages the internal database.
 *
 * @var {Storage} propertyDb
 *  the internal database containing all properties/objects from the respective webservice
 */
export class PropertyService {

  private propertyDb: Storage;

  /**
   * This constructor creates a new ionic storage as property database.
   * @param http the HttpClient to access the webservice
   */
  constructor(private http: HttpClient) {
    this.propertyDb = new Storage({
      name: '__facilityManagerDb',
      storeName: '_properties',
      driverOrder: ['sqlite', 'indexeddb', 'websql', 'localstorage']
    });
  }

  /**
   * This method gets all properties/objects contained in the internal property database.
   * @return a promise containing an array with all properties/objects
   */
  getAllProperties(): Promise<Property[]> {
    const properties: Property[] = [];
    return new Promise<Property[]>(resolve => {
      this.propertyDb.forEach((p: Property) => {
        properties.push(p);
      }).then(() => {
        resolve(properties);
      });
    });
  }

  /**
   * This method gets a single property/object by its uid.
   * @param uid the uid of the object/property you want to get
   */
  getProperty(uid: string): Promise<Property> {
    return new Promise<Property>(resolve => {
      this.propertyDb.get(uid).then((p) => {
        resolve(p);
      });
    });
  }

  getPropertyDirectly(uid: string): Promise<Property> {
    return new Promise<Property>(resolve => {
      this.http.get<Property>('http://dev.inform-objektservice.de/hmdinterface/rest/object/' + uid + '/').subscribe(data => {
        console.log(data);
        resolve(data);
      }, _ => {
        this.getProperty(uid).then((p: Property) => {
          resolve(p);
        });
      });
    });
  }

  /**
   * This method returns all properties/objects for a given city
   * @param city the city's name
   * @return a promise containing an array with all properties/objects located in the city
   */
  getPropertiesByCity(city: string): Promise<Property[]> {
    const properties: Property[] = [];
    return new Promise<Property[]>(resolve => {
      this.propertyDb.forEach((value: Property) => {
        if (value.city === city) {
          properties.push(value);
        }
      }).then(() => {
        resolve(properties);
      });
    });
  }

  /**
   * This method gets all cities in which properties/objects are located.
   * @return a promise containing a string array with the city names
   */
  getPropertyCities(): Promise<string[]> {
    const cities: string[] = [];
    return new Promise<string[]>(resolve => {
      this.propertyDb.forEach((property: Property) => {
        if (!cities.includes(property.city)) {
          cities.push(property.city);
        }
      }).then(() => {
        resolve(cities);
      });
    });
  }

  /**
   * This method fetches the latest property/object data from the respective webservice
   * and updates the internal property database.
   */
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

  getEmptyProperty(): Property {
    return {
      uid: '',
      deleted: 'false',
      hidden: 'false',
      title: '',
      street: '',
      zip: '',
      city: '',
      owner: '',
      owner_street: '',
      owner_zip: '',
      owner_city: '',
      administrator: null,
      elektriker: null,
      heizung: null,
      sanitear: null,
      schluesseldienst: null,
      schornsteinfeger: null,
      brandschutz: null,
      rohrreinigung: null,
      fahrstuhl: null,
    };
  }

  /**
   * This is a helper method to insert a list of properties/objects into the propertyDb.
   * @param data the array of properties/objects to be inserted
   */
  private async insertIntoDb(data: Property[]) {
    for (const o of data) {
      const p: Property = {
        uid: o.uid,
        deleted: o.deleted,
        hidden: o.hidden,
        title: o.title,
        street: o.street,
        zip: o.zip,
        city: o.city,
        owner: o.owner,
        owner_street: o.owner_street,
        owner_zip: o.owner_zip,
        owner_city: o.owner_city,
        administrator: o.administrator,
        elektriker: o.elektriker,
        heizung: o.heizung,
        sanitear: o.sanitear,
        schluesseldienst: o.schluesseldienst,
        schornsteinfeger: o.schornsteinfeger,
        brandschutz: o.brandschutz,
        rohrreinigung: o.rohrreinigung,
        fahrstuhl: o.fahrstuhl,
      };
      await this.propertyDb.set(p.uid, p);
    }
  }
}
