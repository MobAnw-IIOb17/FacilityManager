import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Storage} from '@ionic/storage';

import {Employee} from '../model/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private employeeDb: Storage;

  constructor(private http: HttpClient) {
    this.employeeDb = new Storage({
      name: '__facilityManagerDb',
      storeName: '_employees',
      driverOrder: ['sqlite', 'indexeddb', 'websql', 'localstorage']
    });
  }

  getAllEmployees(): Promise<Employee[]> {
    const employees: Employee[] = [];
    return new Promise<Employee[]>((resolve) => {
      this.updateEmployees().then(() => {
        this.employeeDb.forEach((value: any, key: string) => {
          employees.push(value);
        }).then(() => {
          resolve(employees);
        });
      });
    });
  }

  getEmployee(uid: string): Promise<Employee> {
    return new Promise<Employee>((resolve) => {
      this.updateEmployees().then(() => {
        this.employeeDb.get(uid).then((e) => {
          resolve(e);
        });
      });
    });
  }

  updateEmployees(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.http.get<Employee[]>('http://dev.inform-objektservice.de/hmdinterface/rest/employee/').subscribe(data => {
        this.insertIntoDb(data).then(resolve);
      }, error => {
        resolve();
      });
    });
  }

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
