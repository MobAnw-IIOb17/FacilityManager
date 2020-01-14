import { Component } from '@angular/core';
import { DamageService } from '../services/damage.service';
import { Damage } from '../model/damage.model';
import { Router, NavigationExtras } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { DamagereportspopoverComponent } from './damagereportspopover/damagereportspopover.component';

@Component({
  selector: 'app-damage-reports',
  templateUrl: './damage-reports.page.html',
  styleUrls: ['./damage-reports.page.scss'],
  providers: [DamageService]
})
export class DamageReportsPage {
  damages: Damage[] = [];
  damage: Damage;

  constructor(public damageService: DamageService, private popoverController: PopoverController, private router: Router) {
  }

  /**
   * Aktualisiert die Liste beim öffnen der Page
   * und Scrollt nach oben
   */
  ionViewDidEnter() {
    this.refreshDamages();
  }

  async refreshDamages() {
    this.damages = await this.damageService.getAllDamages();
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
                  this.damages.sort((a, b) => (a.property.city > b.property.city) ? 1 : -1);
              }
              if (dataReturned.data === 'date') {
                this.damages.sort((a, b) => (a.sentTimestamp > b.sentTimestamp) ? 1 : -1);
              }
              if (dataReturned.data === 'status') {
                  this.damages.sort((a, b) => (a.sent > b.sent) ? 1 : -1);
              }
          }
      });

      return await popover.present();
  }
}
