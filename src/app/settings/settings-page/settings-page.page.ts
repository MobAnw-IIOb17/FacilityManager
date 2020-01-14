import {Component, OnInit} from '@angular/core';
import {EmployeeService} from '../../services/employee.service';
import {Employee} from '../../model/employee.model';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.page.html',
  styleUrls: ['./settings-page.page.scss'],
})
export class SettingsPagePage implements OnInit {

  private employees: Employee[] = [];
  private employee: Employee = this.employeeService.getEmptyEmployee();
  private controlEnabled: boolean;

  constructor(private employeeService: EmployeeService) {
    employeeService.getAllEmployees().then((e: Employee[]) => {
      this.employees = e;
    });
    employeeService.getCurrentEmployee().then((e: Employee) => {
      this.employee = e;
    });
    employeeService.isControlListEnabled().then((b: boolean) => {
      this.controlEnabled = b;
    });
  }

  ngOnInit() {
  }

  async employeeChanged(event) {
    const e: Employee = await this.employeeService.getEmployee(event.target.value);
    this.employeeService.setCurrentEmployee(e);
    this.employee = event.target.value;
  }

  async controlChanged(event) {
    this.controlEnabled = event.target.checked;
    await this.employeeService.setControlListEnabled(event.target.checked);
  }
}
