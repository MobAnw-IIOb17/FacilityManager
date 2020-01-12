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
        this.galleryService.arrayToGallery(this.damage.images);
    }
}