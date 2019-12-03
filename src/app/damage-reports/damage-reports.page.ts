import {Component, OnInit} from '@angular/core';
import {DamageService} from '../services/damage.service';
import {Damage} from '../model/damage.model';
import {NavController} from '@ionic/angular';
import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'app-damage-reports',
    templateUrl: './damage-reports.page.html',
    styleUrls: ['./damage-reports.page.scss'],
    providers: [DamageService]
})
export class DamageReportsPage implements OnInit {
    damages: Damage[] = [];

    constructor(public damageService: DamageService, public nav: NavController, protected httpClient: HttpClient) {
    }

    async ngOnInit() {
        this.damages = await this.damageService.getAllDamages().then(res => this.damages = res);
    }

    openDamageById() {
        this.nav.navigateForward('/tabs/damage-details');
    }
}
