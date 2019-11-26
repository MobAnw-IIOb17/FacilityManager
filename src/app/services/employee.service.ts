import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';

import { Employee } from '../model/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private employeeDb: Storage;

  constructor() {
    this.employeeDb = new Storage({
      name: '__facilityManagerDb',
      storeName: '_employees',
      driverOrder: ['sqlite', 'indexeddb', 'websql', 'localstorage']
    });
  }

  getAllEmployees(): Promise<Employee[]> {
    const employees: Employee[] = [];
    return this.employeeDb.forEach((value: any, key: string) => {
      employees.push(value);
    }).then(() => {
      return employees;
    });
  }

  getEmployee(uid: string): Promise<Employee> {
    return this.employeeDb.get(uid).then((e) => {
      return e;
    });
  }
}
