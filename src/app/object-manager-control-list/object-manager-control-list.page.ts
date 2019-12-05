import { Component, OnInit } from '@angular/core';
import { ToastController, NavController, PopoverController } from '@ionic/angular';
import { PopoverPageComponent } from '../popover-page/popover-page.component';
//import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-object-manager-control-list',
  templateUrl: './object-manager-control-list.page.html',
  styleUrls: ['./object-manager-control-list.page.scss'],
})

export class ObjectManagerControlListPage implements OnInit {
  
  value = 0;
  
  constructor(public toastController: ToastController, public nav: NavController, public popoverController: PopoverController) {  }

  /*
  constructor(private employeeService: EmployeeService) {
    this.employeeService.getAllEmployees().then((list) => {
      list[0].uid;
    })
  }
*/

  ngOnInit() {
  }

  async deleteItem() {
    console.log("DELETE");
    const toast = await this.toastController.create({
      message: 'swipe DELETE',
      duration: 2000
    });
    toast.present();
  }

  async editItem() {
    console.log("OPEN");
    const toast = await this.toastController.create({
      message: 'swipe OPEN',
      duration: 2000
    });
    toast.present();
    this.nav.navigateForward('/tabs/object-manager-control-view');
  }
}
