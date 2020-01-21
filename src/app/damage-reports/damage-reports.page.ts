import { Component, ViewChild } from '@angular/core';
import { DamageService } from '../services/damage.service';
import { Damage } from '../model/damage.model';
import { Router, NavigationExtras } from '@angular/router';
import { PopoverController, IonContent, Platform } from '@ionic/angular';
import { DamagereportspopoverComponent } from './damagereportspopover/damagereportspopover.component';

@Component({
  selector: 'app-damage-reports',
  templateUrl: './damage-reports.page.html',
  styleUrls: ['./damage-reports.page.scss'],
  providers: [DamageService]
})
export class DamageReportsPage {
  private damages: Damage[] = [];
  private damage: Damage;
  private sortCity:boolean = false;
  private sortDate:boolean = false;
  private sortStatus:boolean = false;  
  private dateYesterday:Date = new Date();

  constructor(public damageService: DamageService, private popoverController: PopoverController, private router: Router, private platform: Platform) {
    //Handle für device back button
    this.platform.backButton.subscribeWithPriority(0, () => {
      navigator['app'].exitApp();
    });
  }
  
  @ViewChild(IonContent, {static: false}) theContent: IonContent;

  /**
   * Aktualisiert die Liste beim öffnen der Page
   * und Scrollt nach oben
   */
  ionViewDidEnter() {
    this.refreshDamages();
    this.theContent.scrollToTop(500);
  }
  
   /**
    * Setzt aktuelle zeit - 1 Tag für Anzeige maximal 24h
   * Aktualisiert das Checklist Objekt für die Anzeige
   * vorher wird es gelöscht
   */
  async refreshDamages() {
    this.dateYesterday = ( d => new Date(d.setDate(d.getDate()-1)) )(new Date);
    await this.damageService.getAllDamages().then((items) => {
      if(items.length !== 0) {
        this.damages = [];
        this.damages = items;
        this.damages.sort((a, b) => (a.sent < b.sent) ? 1 : -1);
      }
    });
  }

  openDamage(damage: Damage) {
    let navigationExtras: NavigationExtras = {
      state: {
        damage
      }
    };
    this.router.navigateByUrl('/tabs/damage-details', navigationExtras);
  }

  /**
   * Beim Zeihen nach unten auf der Page, werden alle Elemente aktualisiert
   *
   * @param event Refresh Event
   */
  doRefresh(event) {
    this.refreshDamages();

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
        component: DamagereportspopoverComponent,
        event
    });

    popover.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        if (dataReturned.data === 'refresh') {
            this.refreshDamages();
        }
        if (dataReturned.data === 'city') {
          if(this.sortCity) {
            this.damages.sort((a, b) => (a.property.city > b.property.city) ? 1 : -1);
            this.sortCity = false;
          } else {
            this.damages.sort((a, b) => (a.property.city < b.property.city) ? 1 : -1);
            this.sortCity = true;
          }
        }
        if (dataReturned.data === 'date') {
          if(this.sortDate) {
            this.damages.sort((a, b) => (a.sentTimestamp < b.sentTimestamp) ? 1 : -1);
            this.sortDate = false;
          } else {
            this.damages.sort((a, b) => (a.sentTimestamp > b.sentTimestamp) ? 1 : -1);
            this.sortDate = true;
          }
        }
        if (dataReturned.data === 'status') {
          if(this.sortStatus) {
            this.damages.sort((a, b) => (a.sent < b.sent) ? 1 : -1);
            this.sortStatus = false;
          } else {
            this.damages.sort((a, b) => (a.sent > b.sent) ? 1 : -1);
            this.sortStatus = true;
          }
        }
      }
    });

    return await popover.present();
  }
}