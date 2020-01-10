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
  private currentEmployee: string;
  private controlListEnabled: boolean;

  constructor(private employeeService: EmployeeService) {
    employeeService.getAllEmployees().then((e) => {
      this.employees = e;
    });
    employeeService.getCurrentEmployee().then((e) => {
      this.currentEmployee = e.uid;
    });
    employeeService.isControlListEnabled().then((b) => {
      this.controlListEnabled = b;
    });
  }

  ngOnInit() {
  }

  async employeeChanged(event) {
    const e: Employee = await this.employeeService.getEmployee(event.target.value);
    this.employeeService.setCurrentEmployee(e);
    this.currentEmployee = event.target.value;
  }

  async controlChanged(event) {
    this.controlListEnabled = event.target.checked;
    await this.employeeService.setControlListEnabled(event.target.checked);
  }
}
