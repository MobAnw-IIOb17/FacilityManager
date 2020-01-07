import { Component, OnInit } from '@angular/core';
import { ToastController, PopoverController } from '@ionic/angular';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { PopovercomponentPage } from './popovercomponent/popovercomponent.page';
import { PropertyService } from '../services/property.service';
import { ObjectChecklistService } from '../services/object-checklist.service';
import { Property } from '../model/property.model';
import { Checklist } from '../model/checklist.model';
import { _countGroupLabelsBeforeOption } from '@angular/material';

//import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-object-manager-control-list',
  templateUrl: './object-manager-control-list.page.html',
  styleUrls: ['./object-manager-control-list.page.scss'],
})

export class ObjectManagerControlListPage implements OnInit {
  [x: string]: any;
  
  propertyUid;
  property = new Property();
  propertyCity = '';
  propertyStreet = '';
  controlItemNames: Array<Checklist> = [];

  constructor(private toastController: ToastController, 
    private router: Router, 
    private route: ActivatedRoute, 
    private popover: PopoverController,
    private propertyService: PropertyService,
    private objectChecklistService: ObjectChecklistService) {
      console.log("constructor");
      this.route.queryParams.subscribe(params => {
        console.log("constructor2");
        if (params) {
          if(params.popOverData) {
            var parsedObject = JSON.parse(params.popOverData);
            console.log(parsedObject);
            this.controlItemNames.push(parsedObject);
          }
          if (params.objectUid) {
            this.propertyUid = params.objectUid;
            this.propertyCity = params.objectCity;
            this.propertyStreet = params.objectStreet;
            this.propertyService.getProperty(this.propertyUid).then((item) => { this.property = item});
          }
        }
      })
      this.objectChecklistService.getDefaultChecklist('184').then((item) => {
        console.log(item);
        console.log(item.checklist);
        this.controlItemNames = item.checklist;
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
  async deleteItem(selectedItem) {
    /*
    console.log("DELETE item");
    const toast = await this.toastController.create({
      message: 'swipe DELETE item',
      duration: 2000
    });
    toast.present();
    */
    const index:number = this.controlItemNames.indexOf(selectedItem);
    if (index !== -1) { 
      this.controlItemNames.splice(index, 1);
    }
  }

  /** Öffnet die nächste Seite VIEW mit dem übergebenen Item
   * 
   * @param selectedItem Das Item was selectiert bzw geschoben/swiped wurde
   * @param slidingItem Setzt das geswipte Item zurück
   */
  async editItem(selectedItem:string, slidingItem) {
    /*
    console.log("OPEN");
    const toast = await this.toastController.create({
      message: 'swipe OPEN',
      duration: 1000
    });
    toast.present();
    */
    slidingItem.close();

    let navigationExtras: NavigationExtras = {
      queryParams: {
       // special: JSON.stringify(this.itemname)
        checklistItem: selectedItem
      }
    };
    this.router.navigate(['/tabs/object-manager-control-view'], navigationExtras);
  }

  /**
   * Öffnet ein Popover für die Auswahl und Hinzufügen von Kontrollitems
   */
  createPopOver() {
    this.popover.create({
      component:PopovercomponentPage,
      componentProps: {
        controlPopOverNames: this.controlItemNames
      },
      showBackdrop:true
    }).then((popoverElement)=>{
      popoverElement.present();
    })
  }
}
