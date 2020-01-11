import {Component, OnInit} from '@angular/core';
import {EmployeeService} from '../services/employee.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  private objectMangerEnabled = false;

  constructor(private employeeService: EmployeeService) {
    employeeService.controlListEnabledObserve((b: boolean) => {
      this.objectMangerEnabled = b;
    });
  }

  ngOnInit() {
  }

}
