import {Component, OnInit} from '@angular/core';
import { Damage } from '../model/damage.model';
import { Property } from '../model/property.model';
import { Employee } from '../model/employee.model';
import { Router, ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-damage-details',
    templateUrl: './damage-details.page.html',
    styleUrls: ['./damage-details.page.scss'],
})

export class DamageDetailsPage implements OnInit {
    damage: Damage;

    constructor(private router: Router, private route: ActivatedRoute) {
        console.log('Constructed Damage-Details');
        this.route.queryParams.subscribe(params => {
            console.log('Did the Subscribe Stuff');
            if (this.router.getCurrentNavigation().extras.state) {
                this.damage = this.router.getCurrentNavigation().extras.state.damage;
            } else {
                this.damage = makeUndefinedDamage();
            }
        });
    }

    ngOnInit() {
    }

    ionViewDidEnter() {
        console.log('Entered Damage-Details');
        console.log(this.router.getCurrentNavigation());

        
        let galleryGrid = document.getElementById('gallery');
        while(galleryGrid.lastChild) {
            galleryGrid.removeChild(galleryGrid.lastChild);
        }
        makeGallery(galleryGrid, this.damage.images);
    }
}

function makeGallery(grid: HTMLElement, images: String[]) {
    let imageIndex = 0;
    for(let i=0; i<Math.ceil(images.length/3); i++) {
        let row = document.createElement('ion-row');
        for(let j=0; j<3; j++) {
            let col = document.createElement('ion-col');
            if(imageIndex<images.length) {
                let image = document.createElement('ion-img');
                let source = 'data:image/png;base64,'+ images[imageIndex];
                image.setAttribute('src', source);
                col.appendChild(image);
            }
            imageIndex++;
            row.appendChild(col);
        }
        grid.appendChild(row);
    }
}

function makeUndefinedDamage() {
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

    let damage: Damage = {
        uid: 'undefinedUid',
        createDate: 'undefinedCreateDate',
        property: undefinedProperty,
        employee: undefinedEmployee,
        description: 'undefinedDescription',
        images: [
            'iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==',
            'iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==',
            'iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==',
            'iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==',
            'iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=='
        ],
        location: 'undefinedLocation',
        sent: false
    }
    return damage;
}
