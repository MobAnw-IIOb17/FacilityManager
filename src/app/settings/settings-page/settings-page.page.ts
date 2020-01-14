import {Component, OnInit} from '@angular/core';
import {EmployeeService} from '../../services/employee.service';
import {Employee} from '../../model/employee.model';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.page.html',
  styleUrls: ['./settings-page.page.scss'],
})
export class SettingsPagePage implements OnInit {

  private employees: Employee[];
  private currentEmployee: Employee;
  private controlListEnabled: boolean;

  constructor(private employeeService: EmployeeService) {
    employeeService.getAllEmployees().then((e) => {
      this.employees = e;
      employeeService.getCurrentEmployee().then((e) => {
        this.currentEmployee = e;
      });
    });
    employeeService.isControlListEnabled().then((b) => {
      this.controlListEnabled = b;
    });
  }

  ngOnInit() {
  }

  employeeChanged() {
    this.employeeService.setCurrentEmployee(this.currentEmployee);
  }

  async controlChanged(event) {
    this.controlListEnabled = event.target.checked;
    await this.employeeService.setControlListEnabled(event.target.checked);
  }

  compareEmployees(e1: Employee, e2: Employee) {
    return e1.uid === e2.uid;
  }
}
