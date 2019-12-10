import {Component, OnInit} from '@angular/core';
import { Damage } from '../model/damage.model';
import { Property } from '../model/property.model';
import { Employee } from '../model/employee.model';
import { Router} from '@angular/router';

@Component({
    selector: 'app-damage-details',
    templateUrl: './damage-details.page.html',
    styleUrls: ['./damage-details.page.scss'],
})

export class DamageDetailsPage implements OnInit {
    damage: Damage;

    constructor(private router: Router) {
    }

    ngOnInit() {
        if (this.router.getCurrentNavigation().extras.state) {
            this.damage = this.router.getCurrentNavigation().extras.state.damage;
        } else {
            this.tollerTest();
        }
    }

    tollerTest(){
        console.log('toller Test');
        let sesamstrasse: Property = {
            uid: 'xyz',
            deleted: '0',
            hidden: '0',
            title: '',
            street: 'Sesamstraße 3',
            zip: '02766',
            city: 'Görlitz',
            owner: 'Maier'
        }

        let gunter: Employee = {
            uid: '007',
            name: 'Gunter',
            deleted: '0',
            hidden: '0'
        }

        this.damage = {
            uid: 'xyz',
            createDate: 'Heute',
            property: sesamstrasse,
            employee: gunter,
            description: 'Kaputt',
            images: []
        }
    }
}
