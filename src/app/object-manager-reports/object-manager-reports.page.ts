import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Property } from '../model/property.model';
import { PopoverController } from '@ionic/angular';
import { ReportsPopovercomponentComponent } from './reports-popovercomponent/reports-popovercomponent.component';
import { ObjectChecklistService } from '../services/object-checklist.service';
import { ObjectChecklist } from '../model/object-checklist.model';

@Component({
  selector: 'app-object-manager-reports',
  templateUrl: './object-manager-reports.page.html',
  styleUrls: ['./object-manager-reports.page.scss'],
})

export class ObjectManagerReportsPage implements OnInit {

  private objectItems: Array<Property> = [];
  private objectChecklists: ObjectChecklist[] = [];
  private objectChecklist: ObjectChecklist = new ObjectChecklist();

  constructor(
    private router: Router, 
    private popoverController:PopoverController, 
    private objectChecklistService:ObjectChecklistService) { }

  ngOnInit() { }

  /**
   * Aktualisiert die Liste beim öffnen der Page
   */
  ionViewDidEnter() {
    this.refreshChecklistItems();
  } 

  /**
   * Route zur Nächsten Seite um eine Kontrolle zu erstellen
   */
  navToControlManagerNewPage() {
    this.router.navigateByUrl('/tabs/object-manager-new');
  }

  /**
   * Aktualisiert das Checklist Objekt für die Anzeige
   * vorher wird es gelöscht
   */
  refreshChecklistItems() {
    setTimeout(() => {
      this.objectChecklistService.getAllChecklists().then((items) => {
        console.log("[refreshChecklistItems] items.length: " + items.length);
        if(items.length !== 0) {
          console.log(items);
          this.objectChecklists = [];
          this.objectChecklists = items;
        }
      });
    }, 800);
  }

  /**
   * Beim Zeihen nach unten auf der Page, werden alle Elemente aktualisiert
   * 
   * @param event Refresh Event 
   */
  doRefresh(event) {
    this.refreshChecklistItems();

    setTimeout(() => {
      event.target.complete();
    }, 800);
  }

  /**
   * Öffnet ein PopOver oben Rechts mit einem Menu für die Auswahl
   *  - Aktualisieren
   *  - Sortieren nach Stadt, Status
   * 
   * unter onDidDismiss() wird die Rückgabe des Popover verarbeitet
   */
  async openPopover() {
    const popover = await this.popoverController.create({
      component: ReportsPopovercomponentComponent,
      event
    });

    popover.onDidDismiss().then((dataReturned) => {
      if(dataReturned !== null) {
        if(dataReturned.data === "refresh") {
          this.refreshChecklistItems();
        }
        if(dataReturned.data === "city") {
          this.objectChecklists.sort((a, b) => (a.property.city > b.property.city) ? 1 : -1)
        }
        if(dataReturned.data === "date") {
        }
        if(dataReturned.data === "status") {
          this.objectChecklists.sort((a, b) => (a.sent > b.sent) ? 1 : -1)
        }
      }
    })

    return await popover.present();
  }
}
