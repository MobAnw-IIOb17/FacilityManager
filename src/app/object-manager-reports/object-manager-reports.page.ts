import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController, IonContent, Platform, LoadingController } from '@ionic/angular';
import { ReportsPopovercomponentComponent } from './reports-popovercomponent/reports-popovercomponent.component';
import { ObjectChecklistService } from '../services/object-checklist.service';
import { ObjectChecklist } from '../model/object-checklist.model';

@Component({
    selector: 'app-object-manager-reports',
    templateUrl: './object-manager-reports.page.html',
    styleUrls: ['./object-manager-reports.page.scss']
})

export class ObjectManagerReportsPage implements OnInit {

    @ViewChild(IonContent, { static: false }) theContent: IonContent;

    private objectChecklists: ObjectChecklist[] = [];
    private displayListItems: Array<boolean> = [];
    private sortCity: boolean = false;
    private sortDate: boolean = false;
    private sortStatus: boolean = false;
    private dateYesterday: Date = new Date();

    constructor(
        private router: Router,
        private loadingController: LoadingController,
        private popoverController: PopoverController,
        private objectChecklistService: ObjectChecklistService,
        private platform: Platform) { }

    ngOnInit() {
    }

    /**
     * Aktualisiert die Liste beim öffnen der Page
     * und Scrollt nach oben
     */
    ionViewDidEnter() {
        this.refreshChecklistItems(true);
        this.theContent.scrollToTop(500);

        // Handle für device back button
        this.platform.backButton.subscribeWithPriority(0, () => {
            navigator['app'].exitApp();
        });
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
    viewChecklistItemInfo(index: any) {
        if (this.displayListItems[index] === true) {
            this.resetChecklistItemInfo();
            return;
        }
        this.resetChecklistItemInfo();

        // Maximiere aktuellen Index
        this.displayListItems[index] = true;
        // Scrolle Item nach oben
        this.scrollToID(0, 80 * index);
    }

    /**
     * Scrollt bis zur übergebenen Koordinate
     *
     * @param x X-Koordinate
     * @param y Y-Koordinate
     */
    scrollToID(x: number, y: number) {
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
     * Setzt aktuelle zeit - 1 Tag für Anzeige maximal 24h
     * Aktualisiert das Checklist Objekt für die Anzeige
     * vorher wird es gelöscht
     */
    async refreshChecklistItems(loader: boolean) {
        this.dateYesterday = (d => new Date(d.setDate(d.getDate() - 10)))(new Date());

        let loading: HTMLIonLoadingElement;

        if (loader) {
            loading = await this.loadingController.create({
                spinner: 'circles',
                message: 'Lade',
                duration: 4000
            });
            await loading.present();
        }

        await this.objectChecklistService.getAllChecklists().then((items) => {
            if (items.length !== 0) {
                this.objectChecklists = [];
                this.objectChecklists = items;
                this.objectChecklists.sort((a, b) => (a.sent < b.sent) ? 1 : -1);
                this.resetChecklistItemInfo();
            }

            if (loader) {
                loading.dismiss();
            }
        });
    }

    /**
     * Beim Zeihen nach unten auf der Page, werden alle Elemente aktualisiert
     *
     * @param event Refresh Event
     */
    doRefresh(event) {
        this.refreshChecklistItems(false);

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
                    this.refreshChecklistItems(true);
                }
                if (dataReturned.data === 'city') {
                    if (this.sortCity) {
                        this.objectChecklists.sort((a, b) => (a.property.city > b.property.city) ? 1 : -1);
                        this.sortCity = false;
                    } else {
                        this.objectChecklists.sort((a, b) => (a.property.city < b.property.city) ? 1 : -1);
                        this.sortCity = true;
                    }
                }
                if (dataReturned.data === 'date') {
                    if (this.sortDate) {
                        this.objectChecklists.sort((a, b) => (a.sentTimestamp < b.sentTimestamp) ? 1 : -1);
                        this.sortDate = false;
                    } else {
                        this.objectChecklists.sort((a, b) => (a.sentTimestamp > b.sentTimestamp) ? 1 : -1);
                        this.sortDate = true;
                    }
                }
                if (dataReturned.data === 'status') {
                    if (this.sortStatus) {
                        this.objectChecklists.sort((a, b) => (a.sent < b.sent) ? 1 : -1);
                        this.sortStatus = false;
                    } else {
                        this.objectChecklists.sort((a, b) => (a.sent > b.sent) ? 1 : -1);
                        this.sortStatus = true;
                    }
                }
            }
        });

        return await popover.present();
    }
}
