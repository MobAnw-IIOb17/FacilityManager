import { Component, OnInit } from '@angular/core';
import { DamageService } from '../services/damage.service';
import { Damage } from '../model/damage.model';
import { Router, NavigationExtras } from '@angular/router';
import { Property } from '../model/property.model';
import { Employee } from '../model/employee.model';

@Component({
  selector: 'app-damage-reports',
  templateUrl: './damage-reports.page.html',
  styleUrls: ['./damage-reports.page.scss'],
  providers: [DamageService]
})
export class DamageReportsPage {
  damages: Damage[] = [];
  damage: Damage;

  constructor(public damageService: DamageService, private router: Router) {
  }

  async ionViewWillEnter() {
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
}
