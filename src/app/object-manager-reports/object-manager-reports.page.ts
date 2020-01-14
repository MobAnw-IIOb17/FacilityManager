import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController, IonContent } from '@ionic/angular';
import { ReportsPopovercomponentComponent } from './reports-popovercomponent/reports-popovercomponent.component';
import { ObjectChecklistService } from '../services/object-checklist.service';
import { ObjectChecklist } from '../model/object-checklist.model';

@Component({
    selector: 'app-object-manager-reports',
    templateUrl: './object-manager-reports.page.html',
    styleUrls: ['./object-manager-reports.page.scss']
})

export class ObjectManagerReportsPage implements OnInit {

    @ViewChild(IonContent, {static: false}) theContent: IonContent;

    private objectChecklists: ObjectChecklist[] = [];
    private displayListItems: Array<boolean> = [];

    constructor(
        private router: Router,
        private popoverController: PopoverController,
        private objectChecklistService: ObjectChecklistService) {
    }

    ngOnInit() { }

    /**
     * Aktualisiert die Liste beim öffnen der Page
     * und Scrollt nach oben
     */
    ionViewDidEnter() {
        this.refreshChecklistItems();
        this.theContent.scrollToTop(500);
    }

    /**
     * Route zur Nächsten Seite um eine Kontrolle zu erstellen
     */
    navToControlManagerNewPage() {
        this.router.navigateByUrl('/tabs/object-manager-new');
    }

    /**
     * Öffne Info IonCard bei Click auf list item
     * 
     * @param index Array Index vom Objekt objectChecklists aus HTML
     */
    viewChecklistItemInfo(index:any) {
        if(this.displayListItems[index] == true) {
            this.resetChecklistItemInfo();
            return;
        }
        this.resetChecklistItemInfo();
        
        //Maximiere aktuellen Index
        this.displayListItems[index] = true;
        //Scrolle Item nach oben
        this.scrollToID(0, 80*index);
    }

    /**
     * Scrollt bis zur übergebenen Koordninate
     * 
     * @param x X-Koordninate
     * @param y Y-Koordinate
     */
    scrollToID(x:number, y:number) {
        this.theContent.scrollToPoint(x, y, 500);
    }

    /**
     * Setzt alle evtl geöffneten IonCard zurück und minimiert diese
     */
    resetChecklistItemInfo() {
        this.displayListItems = [];
        this.objectChecklists.forEach((item) => {
            this.displayListItems.push(false);
          });
    }

  /**
   * Aktualisiert das Checklist Objekt für die Anzeige
   * vorher wird es gelöscht
   */
  refreshChecklistItems() {
    setTimeout(() => {
      this.objectChecklistService.getAllChecklists().then((items) => {
        if(items.length !== 0) {
          this.objectChecklists = [];
          this.objectChecklists = items;
          this.resetChecklistItemInfo();
        }
      });
    }, 100);
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
            if (dataReturned !== null) {
                if (dataReturned.data === 'refresh') {
                    this.refreshChecklistItems();
                }
                if (dataReturned.data === 'city') {
                    this.objectChecklists.sort((a, b) => (a.property.city > b.property.city) ? 1 : -1);
                }
                if (dataReturned.data === 'date') {
                }
                if (dataReturned.data === 'status') {
                    this.objectChecklists.sort((a, b) => (a.sent > b.sent) ? 1 : -1);
                }
            }
        });

        return await popover.present();
    }
}
