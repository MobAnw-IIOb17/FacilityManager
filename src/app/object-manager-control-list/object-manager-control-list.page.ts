import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { PopovercomponentPage } from './popovercomponent/popovercomponent.page';
import { ObjectChecklistService } from '../services/object-checklist.service';
import { Property } from '../model/property.model';
import { Checklist } from '../model/checklist.model';
import { _countGroupLabelsBeforeOption } from '@angular/material';

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

  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private popover: PopoverController,
    private objectChecklistService: ObjectChecklistService) {
      this.route.queryParams.subscribe(params => {
        if (params) {
          if(params.popOverData) {
            this.usedControllistItems.push(JSON.parse(params.popOverData));
          }
          if (params.object) {
            this.property = JSON.parse(params.object);
          }

          let navigationExtras: NavigationExtras = {  };
          this.router.navigate(['/tabs/object-manager-control-list'], navigationExtras);
        }
      })
      this.objectChecklistService.getDefaultChecklist('184').then((item) => { //property.uid
        this.copyAList(this.controllistItems, item.checklist);
        this.copyAList(this.usedControllistItems, item.checklist);
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
        checklistItem: JSON.stringify(selectedItem)
      }
    };
    this.router.navigate(['/tabs/object-manager-control-view'], navigationExtras);
  }

  /**
   * Öffnet ein Popover für die Auswahl und Hinzufügen von Kontrollitems
   * Zeigt nur die nicht verwendeten Items (manuell gelöschte) aus der Vorlage aus der Datenbank
   */
  createPopOver() {
    var missingControllistItems: Array<Checklist> = [];
    this.copyAList(missingControllistItems, this.controllistItems.filter((item) => {
      for(var i:number = 0; i < this.usedControllistItems.length; i++) {
        if (this.usedControllistItems[i].name == item.name) {
          return false;
        }
      }
      return true;
    }));
    this.popover.create({
      component:PopovercomponentPage,
      componentProps: {
        notUsedControllistItems: missingControllistItems
      },
      showBackdrop:true
    }).then((popoverElement)=>{
      popoverElement.present();
    })
  }
}
