import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-damagereportspopover',
  templateUrl: './damagereportspopover.component.html',
  styleUrls: ['./damagereportspopover.component.scss'],
})
export class DamagereportspopoverComponent implements OnInit {

  constructor(public popoverController: PopoverController) { }

  ngOnInit() { }

  /**
   * Popover gibt refresh, für das Aktualisieren zurück
   *
   * @returns to ObjectManagerReportsPage OnDidDismiss "refresh"
   */
  refresh() {
    this.popoverController.dismiss('refresh');
  }

  /**
   * Popover gibt city, die Sortierung nach citys zurück
   *
   * @returns to ObjectManagerReportsPage OnDidDismiss "city"
   */
  sortByCitys() {
    this.popoverController.dismiss('city');
  }

  /**
   * Popover gibt date, die Sortierung nach date zurück
   *
   * @returns to ObjectManagerReportsPage OnDidDismiss "date"
   */
  sortByDate() {
    this.popoverController.dismiss('date');
  }

  /**
   * Popover gibt status, die Sortierung nach status zurück
   *
   * @returns to ObjectManagerReportsPage OnDidDismiss "status"
   */
  sortByStatus() {
    this.popoverController.dismiss('status');
  }
}
