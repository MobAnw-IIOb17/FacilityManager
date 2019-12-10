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
    damages: Damage[] = [
        {
            uid: 'uid',
            createDate: 'string',
            property: null,
            employee: null,
            description: 'description',
            images: null
        },
        {
            uid: 'uid',
            createDate: 'string',
            property: null,
            employee: null,
            description: 'description',
            images: null
        }];

    constructor(public damageService: DamageService,    private nav: NavController) {
    }

    async ngOnInit() {
        // this.damages = await this.damageService.getAllDamages() as Damage[];
        // this.damages = '../assets/damage-list.json';
        console.log(this.damages);
    }

    openDamage(uid: string) {
        this.nav.push(DamageDetailsPage, {
            uid
        });
    }
}
