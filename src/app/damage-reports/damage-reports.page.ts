import {Component, OnInit} from '@angular/core';
import {DamageService} from '../services/damage.service';
import {Damage} from '../model/damage.model';
import {NavController} from '@ionic/angular';
import {DamageDetailsPage} from '../damage-details/damage-details.page';

@Component({
    selector: 'app-damage-reports',
    templateUrl: './damage-reports.page.html',
    styleUrls: ['./damage-reports.page.scss'],
    providers: [DamageService]
})
export class DamageReportsPage implements OnInit {
    damages: Damage[] = [];

    constructor(public damageService: DamageService, private nav: NavController) {
    }

    async ngOnInit() {
        this.damages = await this.damageService.getAllDamages() as Damage[];
    }

    openDamage(uid: string) {
        this.nav.push(DamageDetailsPage, {
            uid
        });
    }
}
