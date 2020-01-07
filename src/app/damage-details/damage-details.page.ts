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
            this.makeUndefinedDamage();
        }
    }

    makeUndefinedDamage(){
        let undefinedProperty: Property = {
            uid: 'undefinedUid',
            deleted: 'undefinedDeleted',
            hidden: 'undefinedHidden',
            title: 'undefinedTitle',
            street: 'undefinedStreet',
            zip: 'undefinedZip',
            city: 'undefinedCity',
            owner: 'undefinedOwner'
        }

        let undefinedEmployee: Employee = {
            uid: 'undefinedUid',
            name: 'undefinedName',
            deleted: 'undefinedDeleted',
            hidden: 'undefinedHidden'
        }

        this.damage = {
            uid: 'undefinedUid',
            createDate: 'undefinedCreateDate',
            property: undefinedProperty,
            employee: undefinedEmployee,
            description: 'undefinedDescription',
            images: [],
            location: 'undefinedLocation'
        }
    }
}
