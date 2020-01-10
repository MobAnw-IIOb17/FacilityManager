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

export class DamageDetailsPage {
    damage: Damage;

    constructor(private router: Router, private route: ActivatedRoute) {
        console.log('Constructed Damage-Details');
        this.route.queryParams.subscribe(() => {
            if (this.router.getCurrentNavigation().extras.state) {
                this.damage = this.router.getCurrentNavigation().extras.state.damage;
            }
            
            let galleryGrid = document.getElementById('gallery');
            while(galleryGrid.lastChild) {
                galleryGrid.removeChild(galleryGrid.lastChild);
            }
            makeGallery(galleryGrid, this.damage.images);
        });
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