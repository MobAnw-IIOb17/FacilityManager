import {Component, OnInit} from '@angular/core';
import {DamageService} from '../services/damage.service';
import {Damage} from '../model/damage.model';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-damage-reports',
  templateUrl: './damage-reports.page.html',
  styleUrls: ['./damage-reports.page.scss'],
  providers: [DamageService]
})
export class DamageReportsPage implements OnInit {
  damages: Damage[] = [];

  constructor(public damageService: DamageService, private router: Router) {
  }

  async ngOnInit() {
    this.damages = await this.damageService.getAllDamages() as Damage[];
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
