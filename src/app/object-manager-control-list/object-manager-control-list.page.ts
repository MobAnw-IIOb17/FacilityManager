import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { PopovercomponentPage } from './popovercomponent/popovercomponent.page';
//import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-object-manager-control-list',
  templateUrl: './object-manager-control-list.page.html',
  styleUrls: ['./object-manager-control-list.page.scss'],
})

export class ObjectManagerControlListPage implements OnInit {
  
  data:any;
  controlItemNames:Array<string> = ['Gehweg','Garten', 'Keller', 'Heizraum'];

  constructor(private toastController: ToastController, private router: Router, private route: ActivatedRoute, private popover:PopoverController) { 
    this.route.queryParams.subscribe(params => {
      if (params && params.special) {
        this.data = params.special;
        console.log(params.special);
        this.controlItemNames.push(params.special)
        // this.data = JSON.parse(params.special);
      }
    })
   }

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
    this.router.navigateByUrl('/tabs/object-manager-control-view');
  }

  createPopOver() {
    this.popover.create({
      component:PopovercomponentPage,
      showBackdrop:true
    }).then((popoverElement)=>{
      popoverElement.present();
    })
  }
}
