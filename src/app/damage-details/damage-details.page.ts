import {Component, OnInit} from '@angular/core';
import { Damage } from '../model/damage.model';
import { Router, ActivatedRoute} from '@angular/router';
import { GalleryService } from '../services/gallery.service';

@Component({
    selector: 'app-damage-details',
    templateUrl: './damage-details.page.html',
    styleUrls: ['./damage-details.page.scss'],
})

export class DamageDetailsPage {
    damage: Damage;

    constructor(private router: Router, private route: ActivatedRoute, private galleryService: GalleryService) {
        this.route.queryParams.subscribe(() => {
            if (this.router.getCurrentNavigation().extras.state) {
                this.damage = this.router.getCurrentNavigation().extras.state.damage;
            }
        });
    }

    ngAfterViewInit() {
        this.galleryService.selectGallery(document.getElementById('gallery-grid_02'));
    }

    ionViewDidEnter() {
        this.galleryService.resetGallery();
        this.galleryService.arrayToGallery(this.damage.images);
    }
}


/*
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
*/