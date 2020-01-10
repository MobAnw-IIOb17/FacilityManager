import { Component, OnInit } from '@angular/core';
import { PopoverController, AlertController } from '@ionic/angular';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { ObjectChecklistService } from '../services/object-checklist.service';
import { Property } from '../model/property.model';
import { Checklist } from '../model/checklist.model';
import { _countGroupLabelsBeforeOption } from '@angular/material';
import { ObjectChecklist } from '../model/object-checklist.model';
import { ControlListPopoverComponentComponent } from './control-list-popover-component/control-list-popover-component.component';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-object-manager-control-list',
  templateUrl: './object-manager-control-list.page.html',
  styleUrls: ['./object-manager-control-list.page.scss'],
})

export class ObjectManagerControlListPage implements OnInit {
  [x: string]: any;
  property = new Property();
  controllistItems: Array<Checklist> = [];
  usedControllistItems: Array<Checklist> = [];
  finishedUsedControllistItems: Array<{name: string, boolean: boolean}> = [ {name: "", boolean: true} ];
  saveItem: ObjectChecklist;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private popoverController: PopoverController,
    private alertController: AlertController,
    private emplyoeeService: EmployeeService,
    private objectChecklistService: ObjectChecklistService) {
      this.route.queryParams.subscribe(params => {
        if (params) {
          if (params.object) {
            this.property = JSON.parse(params.object);
          }
          if (params.checklist) {
            let check = JSON.parse(params.checklist);

            //Aktualisieren der Kontrollelemente in der Kontrollliste
            let used = false;
            this.usedControllistItems.forEach((element, index) => {
              if (element.name == check.name) {
                element = check;
              }

              this.usedControllistItems.forEach((element, index) => {

              });
            });
            this.finishedUsedControllistItems.forEach((element, index) => {
              if (element.name == check.name) {
                this.finishedUsedControllistItems.splice(index, 1);
              }
            });
            this.finishedUsedControllistItems.push({name: check.name, boolean: true});
          }
          let navigationExtras: NavigationExtras = {};
          this.router.navigate(['/tabs/object-manager-control-list'], navigationExtras);
        }
      })
      this.objectChecklistService.getDefaultChecklist('184').then((item) => { //property.uid
        this.copyAList(this.controllistItems, item.checklist);
        this.copyAList(this.usedControllistItems, item.checklist);
        this.saveItem = item;
        this.emplyoeeService.getCurrentEmployee().then((item) => {
          this.saveItem.employee = item;
        });
        item.checklist.forEach((element) => {
          this.finishedUsedControllistItems.push({name: element.name, boolean: false});
        });
      })
   }

   ngOnInit() {
  }

   /**
    * vorerst kopiert, noch AUSLAGERN!!
    */
  clearAList(list: Array<any>) {
    var size: number = list.length;
    for (var i: number = 0; i <= size; i++) {
      list.pop();
    }
  }
  copyAList(targetList: Array<any>, sourceList: Array<any>) {
    this.clearAList(targetList);
    for (var i: number = 0; i < sourceList.length; i++) {
      targetList.push(sourceList[i]);
    }
  }


  /**
   * Löscht das übegebene Item aus dem Array usedControllistItems
   * 
   * @param selectedItem Das Item was selectiert bzw. geschoben/swiped wurde
   */
  async deleteItem(selectedItem) {
    const index:number = this.usedControllistItems.indexOf(selectedItem);
    if (index !== -1) { 
      this.usedControllistItems.splice(index, 1);
    }
  }

  /**
   * Öffnet die nächste Seite VIEW mit dem übergebenen Item
   * 
   * @param selectedItem Das Item was selectiert bzw geschoben/swiped wurde
   * @param slidingItem Setzt das geswipte Item zurück
   */
  async editItem(selectedItem, slidingItem) {
    slidingItem.close();
    let navigationExtras: NavigationExtras = {
      queryParams: {   
        checklist: JSON.stringify(selectedItem)
      }
    };
    this.router.navigate(['/tabs/object-manager-control-view'], navigationExtras);
  }

  /**
   * Öffnet ein Popover für die Auswahl und Hinzufügen von Kontrollitems
   * Zeigt nur die nicht verwendeten Items (manuell gelöschte) aus der Vorlage aus der Datenbank
   */
  async createPopOver() {
    var missingControllistItems: Array<Checklist> = [];
    this.copyAList(missingControllistItems, this.controllistItems.filter((item) => {
      for(var i:number = 0; i < this.usedControllistItems.length; i++) {
        if (this.usedControllistItems[i].name == item.name) {
          return false;
        }
      }
      return true;
    }));

    const popover = await this.popoverController.create({
      component: ControlListPopoverComponentComponent,
      componentProps: {
        notUsedControllistItems: missingControllistItems
      }
      //Soll das PopOver bei der Action sein, so muss hier ", event" noch hin
    });

    popover.onDidDismiss().then((dataReturned) => {
      console.log("ReturnFromPopOver: ")
      console.log("" + dataReturned.data)
      if(dataReturned.role === 'add') {
        this.usedControllistItems.push(JSON.parse(dataReturned.data));
      }
    })

    return await popover.present();
  }

  /**
   * 
   */
  async saveControllElements() {
    
    //Prüfen aller Elemente auf Vollzähligkeit
    //wenn alles passt dann:
      //In Datenbank abspeichern
      //dann wechseln zu object-manager-reports
    //sonst
    //Alert was noch fehlt
    console.log(this.finishedUsedControllistItems);
    console.log(this.saveItem);
    let accept: boolean = true;
    for(let i: number = 0; i < this.finishedUsedControllistItems.length; i++) {
      if (!this.finishedUsedControllistItems[i].boolean) {
        accept = false;
        break;
      }
    }
    if (accept) {
      this.saveItem.checklist = this.usedControllistItems;
      this.objectChecklistService.addChecklist(this.saveItem);
      this.router.navigate(['/tabs/object-manager-reports']);
    } else {
      const alert = await this.alertController.create({
        header: 'Achtung',
        subHeader: 'Fehlende Eingaben',
        message: 'Nicht alle verwendeten Kontollelemente sind ausgefüllt.',
        buttons: ['OK']
      });
      await alert.present();
    }

  }
}
