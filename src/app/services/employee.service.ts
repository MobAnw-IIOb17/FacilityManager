import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Storage} from '@ionic/storage';

import {Employee} from '../model/employee.model';
import {SettingsService} from './settings.service';

@Injectable({
  providedIn: 'root'
})

/**
 * This service manages and provides access to a wrapper database for the employee webservice
 * and also provides functionality for setting and getting the currently logged in employee.
 *
 * @var {Storage} employeeDb
 *  the internal database containing all existing employees, fetched from the webservice
 */
export class EmployeeService {

  private employeeDb: Storage;
  private controlListObserve: any[] = [];

  /**
   * The constructor creates a new ionic storage as employee database.
   * @param http the HttpClient to interact with the webservice
   * @param settingsService the SettingsService to set and get currently logged in employee
   */
  constructor(private http: HttpClient, private settingsService: SettingsService) {
    this.employeeDb = new Storage({
      name: '__facilityManagerDb',
      storeName: '_employees',
      driverOrder: ['sqlite', 'indexeddb', 'websql', 'localstorage']
    });
  }

  /**
   * This method lists all employee objects contained in the database.
   * @return promise with an array containing all employees
   */
  getAllEmployees(): Promise<Employee[]> {
    const employees: Employee[] = [];
    return new Promise<Employee[]>((resolve) => {
      this.employeeDb.forEach((value: any, key: string) => {
        employees.push(value);
      }).then(() => {
        resolve(employees);
      });
    });
  }

  /**
   * This method is for getting an Employee object by its uid.
   * @param uid the uid of the employee you want to get
   * @return a promise containing an employee object
   */
  getEmployee(uid: string): Promise<Employee> {
    return new Promise<Employee>((resolve) => {
      this.employeeDb.get(uid).then((e) => {
        resolve(e);
      });
    });
  }

  /**
   * This method syncs the local wrapper database with the webservices database to get the freshest data.
   * @return an empty promise
   */
  updateEmployees(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.http.get<Employee[]>('http://dev.inform-objektservice.de/hmdinterface/rest/employee/').subscribe(data => {
        this.insertIntoDb(data).then(resolve);
      }, error => {
        resolve();
      });
    });
  }

  /**
   * This method gets the currently logged in employee.
   * @return promise with employee object
   */
  getCurrentEmployee(): Promise<Employee> {
    return new Promise<Employee>(resolve => {
      this.settingsService.getSetting('employeeId').then((eId) => {
        this.getEmployee(eId).then((e) => {
          resolve(e);
        });
      });
    });
  }

  /**
   * This method sets the currently logged in employee.
   * @param employee the employee object to be set as current
   */
  setCurrentEmployee(employee: Employee) {
    this.settingsService.putSetting('employeeId', employee.uid);
  }

  async isControlListEnabled(): Promise<boolean> {
    return await this.settingsService.getSetting('controlList') === 'true';
  }

  controlListEnabledObserve(func) {
    this.controlListObserve.push(func);
    this.isControlListEnabled().then(func);
  }

  async setControlListEnabled(b: boolean) {
    for (const func of this.controlListObserve) {
      func(b);
    }
    this.settingsService.putSetting('controlList', b.toString());
  }

  /**
   * A helper method to insert an array of employees into the employee wrappyer database.
   * @param data the array of employees to be inserted into the database
   */
  private async insertIntoDb(data: Employee[]) {
    for (const o of data) {
      const e: Employee = {
        uid: o.uid,
        name: o.name,
        deleted: o.deleted,
        hidden: o.hidden
      };
      await this.employeeDb.set(e.uid, e);
    }
  }
}
