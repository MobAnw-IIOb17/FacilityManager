import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { PopovercomponentPage } from './popovercomponent/popovercomponent.page';
//import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-object-manager-control-list',
  templateUrl: './object-manager-control-list.page.html',
  styleUrls: ['./object-manager-control-list.page.scss'],
})

export class ObjectManagerControlListPage implements OnInit {
  
  data: any;
  city: string;
  object: string;
  controlItemNames:Array<string> = ['Gehweg','Garten', 'Keller', 'Heizraum'];

  constructor(private toastController: ToastController, private router: Router, private route: ActivatedRoute, private popover:PopoverController) { 
    this.route.queryParams.subscribe(params => {
      if (params && params.special) {
        this.data = params.special;
        console.log(params.special);
        this.controlItemNames.push(params.special)
        // this.data = JSON.parse(params.special);
      }
      if (this.router.getCurrentNavigation().extras.state) {
        this.city = this.router.getCurrentNavigation().extras.state.city;
        this.object = this.router.getCurrentNavigation().extras.state.object;
        document.getElementById('#object_title').innerHTML = this.object + ', ' + this.city;
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
/** Löscht das übegebene Item aus dem Array controlItemNames
 * 
 * @param selectedItem Das Item was selectiert bzw geschoben/swiped wurde
 */
  async deleteItem(selectedItem:string) {
    console.log("DELETE item");
    const toast = await this.toastController.create({
      message: 'swipe DELETE item',
      duration: 2000
    });
    toast.present();

    const index:number = this.controlItemNames.indexOf(selectedItem);
    if (index !== -1) {
        this.controlItemNames.splice(index, 1);
    } 
  }

  /** Öffnet die nächste Seite VIEW mit dem übergebenen Item
   * 
   * @param selectedItem Das Item was selectiert bzw geschoben/swiped wurde
   */
  async editItem(selectedItem:string) {
    console.log("OPEN");
    const toast = await this.toastController.create({
      message: 'swipe OPEN',
      duration: 1000
    });
    toast.present();

    let navigationExtras: NavigationExtras = {
      queryParams: {
       // special: JSON.stringify(this.itemname)
        special: selectedItem
      }
    };
    this.router.navigate(['/tabs/object-manager-control-view'], navigationExtras);
  }

  /**
   * Öffnet ein Popover für die Auswahl und hinzufügen von Kontrollitems
   */
  createPopOver() {
    this.popover.create({
      component:PopovercomponentPage,
      showBackdrop:true
    }).then((popoverElement)=>{
      popoverElement.present();
    })
  }
}
