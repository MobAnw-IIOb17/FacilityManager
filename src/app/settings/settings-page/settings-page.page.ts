import {Component, OnInit} from '@angular/core';
import {EmployeeService} from '../../services/employee.service';
import {SettingsService} from '../../services/settings.service';
import {Employee} from '../../model/employee.model';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.page.html',
  styleUrls: ['./settings-page.page.scss'],
})
export class SettingsPagePage implements OnInit {

  private employees: Employee[];
  private currentEmployee: string;

  constructor(private settingsService: SettingsService, private employeeService: EmployeeService) {
    employeeService.getAllEmployees().then((e) => {
      this.employees = e;
    });
    employeeService.getCurrentEmployee().then((e) => {
      this.currentEmployee = e.uid;
    });
  }

  ngOnInit() {
  }

  async employeeChanged(event) {
    const e: Employee = await this.employeeService.getEmployee(event.target.value);
    this.employeeService.setCurrentEmployee(e);
    this.currentEmployee = event.target.value;
  }
}
