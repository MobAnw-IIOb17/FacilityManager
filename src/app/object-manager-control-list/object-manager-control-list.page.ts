import { Component, OnInit } from '@angular/core';
import { PopoverController, AlertController, IonItemSliding } from '@ionic/angular';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { ObjectChecklistService } from '../services/object-checklist.service';
import { Property } from '../model/property.model';
import { Checklist } from '../model/checklist.model';
import { _countGroupLabelsBeforeOption, MatListSubheaderCssMatStyler } from '@angular/material';
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
  private property = new Property();
  private controllistItems: Array<Checklist> = [];
  usedControllistItems: Array<Checklist> = [];
  private finishedUsedControllistItems: Array<{name: string, boolean: boolean}> = [];
  private saveItem: ObjectChecklist;

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
            this.objectChecklistService.getDefaultChecklist('184').then((item) => { //property.uid
              this.copyAList(this.controllistItems, item.checklist);
              this.copyAList(this.usedControllistItems, item.checklist);
              this.saveItem = item;
              this.emplyoeeService.getCurrentEmployee().then((item) => {
                this.saveItem.employee = item;
              });
              this.finishedUsedControllistItems = [];
              item.checklist.forEach((element) => {
                this.finishedUsedControllistItems.push({name: element.name, boolean: false});
              });
            })
          }
          if (params.checklist) {
            let check = JSON.parse(params.checklist);

            //Aktualisieren der Kontrollelemente in der Kontrollliste
            this.usedControllistItems.forEach((element, index) => {
              if (element.name == check.name) {
                element = check;
              }
            });

            //Hinzufügen eines neuen Elementes
            let used = false;
            for(let i: number = 0; i < this.usedControllistItems.length; i++) {
              if (this.usedControllistItems[i].name == check.name) {
                used = true;
              }
            }
            if (!used) {
              this.usedControllistItems.push(check);
            }

            //Updaten der Validierungsliste
            this.addElementToValidationList(check, true);
          }
        }
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

  addElementToValidationList(newElement: Checklist, status: boolean) {
    this.removeElementFromValidationList(newElement);
    this.finishedUsedControllistItems.push({name: newElement.name, boolean: status});
  }

  removeElementFromValidationList(newElement: Checklist) {
    this.finishedUsedControllistItems.forEach((element, index) => {
      if (element.name == newElement.name) {
        this.finishedUsedControllistItems.splice(index, 1);
      }
    });
  }

  /**
   * Löscht das übegebene Item aus dem Array usedControllistItems
   * 
   * @param selectedItem Das Item was selectiert bzw. geschoben/swiped wurde
   */
  async deleteItem(selectedItem: Checklist) {
    const index:number = this.usedControllistItems.indexOf(selectedItem);
    if (index !== -1) { 
      this.usedControllistItems.splice(index, 1);
      this.removeElementFromValidationList(selectedItem);
    }
    
  }

  /**
   * Öffnet die nächste Seite VIEW mit dem übergebenen Item
   * 
   * @param selectedItem Das Item was selectiert bzw geschoben/swiped wurde
   * @param slidingItem Setzt das geswipte Item zurück
   */
  async editItem(selectedItem: Checklist, slidingItem:IonItemSliding) {
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
      if(dataReturned.role === 'add') {
        this.usedControllistItems.push(JSON.parse(dataReturned.data));
        this.addElementToValidationList(JSON.parse(dataReturned.data), false);
      }
    })

    return await popover.present();
  }

  /**
   * Prüfen aller Elemente auf Vollzähligkeit
   * wenn alles passt dann:
   *  In Datenbank abspeichern
   *  dann wechseln zu object-manager-reports
   * sonst
   *  Alert was noch fehlt
   */
  async saveControllElements() {
    let missingItems: Array<{name: string, boolean: boolean}> = [];
    let button = null;
    let text = {head: '', subHead: '', msg: ''};
    if (this.finishedUsedControllistItems.length > 0) {
      for(let i: number = 0; i < this.finishedUsedControllistItems.length; i++) {
        if (!this.finishedUsedControllistItems[i].boolean) {
          missingItems.push(this.finishedUsedControllistItems[i]);
        }
      }
      if (missingItems.length == 0) {
        text.head = 'Abschicken';
        text.subHead = 'Die Meldung wird an den Sever übermittelt.';
        text.msg = 'Sind Sie sicher?';
        button = [
          {
            text: 'Abschicken',
            handler: data => {
              this.saveItem.checklist = this.usedControllistItems;
              this.objectChecklistService.addChecklist(this.saveItem);
              this.router.navigate(['/tabs/object-manager-reports']);
            }
          },
          {
            text: 'Abbrechen'
          }
        ]
      } else {
        text.head = 'Fehlende Eingaben';
        text.subHead = 'Nicht alle verwendeten Kontollelemente sind ausgefüllt:';
        let missingItemsMessage = "";
        missingItems.forEach((element) => {
          missingItemsMessage += '\n' + element.name + '\n';
        });
        text.msg = missingItemsMessage;
        button = ['OK'];
      }
    } else {
      text.head = 'Fehler beim Abschicken';
      text.msg = 'Bitte wählen Sie mindestens ein Kontrollelement aus.';
      button = ['OK'];
    }
    const alert = await this.alertController.create({
      header: text.head,
      subHeader: text.subHead,
      message: text.msg,
      buttons: button
    });
    await alert.present();
  }
}
