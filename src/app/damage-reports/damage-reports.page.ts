import {Component, OnInit} from '@angular/core';
import {DamageService} from '../services/damage.service';
import {Damage} from '../model/damage.model';
import { Router, NavigationExtras } from '@angular/router';
import {Property} from '../model/property.model';
import {Employee} from '../model/employee.model';

@Component({
  selector: 'app-damage-reports',
  templateUrl: './damage-reports.page.html',
  styleUrls: ['./damage-reports.page.scss'],
  providers: [DamageService]
})
export class DamageReportsPage implements OnInit {
  damages: Damage[] = [];
  damage: Damage;

  constructor(public damageService: DamageService, private router: Router) {
  }

  async ngOnInit() {
    this.damages = await this.damageService.getAllDamages() as Damage[];

    if (this.damages.length == 0) {
      this.makeUndefinedDamage();
    }
  }

  openDamage(damage: Damage) {
    let navigationExtras: NavigationExtras = {
      state: {
        damage
      }
    };
    this.router.navigateByUrl('/tabs/damage-details', navigationExtras);
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
      owner: 'undefinedMaier'
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
      images: [
        'iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=='
      ],
      location: 'undefinedLocation',
      sent: false,
      sentTimestamp: null,
    }

    this.damages.push(this.damage);

    this.damage = {
      uid: 'undefinedUid',
      createDate: 'undefinedCreateDate',
      property: undefinedProperty,
      employee: undefinedEmployee,
      description: 'undefinedDescription',
      images: [
        'iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==',
        'iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=='
      ],
      location: 'undefinedLocation',
      sent: false,
      sentTimestamp: null,
    }

    this.damages.push(this.damage);

    this.damage = {
      uid: 'undefinedUid',
      createDate: 'undefinedCreateDate',
      property: undefinedProperty,
      employee: undefinedEmployee,
      description: 'undefinedDescription',
      images: [
        'iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==',
        'iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==',
        'iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=='
      ],
      location: 'undefinedLocation',
      sent: false,
      sentTimestamp: null,
    }

    this.damages.push(this.damage);
  }
}
