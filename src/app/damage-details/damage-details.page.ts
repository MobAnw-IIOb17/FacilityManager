import {Component} from '@angular/core';
import { Damage } from '../model/damage.model';
import { Router, ActivatedRoute} from '@angular/router';
import { GalleryService } from '../services/gallery.service';
import { Platform } from '@ionic/angular';

@Component({
    selector: 'app-damage-details',
    templateUrl: './damage-details.page.html',
    styleUrls: ['./damage-details.page.scss'],
})

export class DamageDetailsPage {
    damage: Damage;

    constructor(private router: Router, private route: ActivatedRoute, private galleryService: GalleryService, private platform: Platform) {
        //Handle für device back button
        this.platform.backButton.subscribeWithPriority(0, () => {
          this.router.navigateByUrl('/tabs/damage-reports');
        });

        this.route.params.subscribe(() => {
            if (this.router.getCurrentNavigation().extras.state) {
                this.damage = this.router.getCurrentNavigation().extras.state.damage;
            }
        });
    }

    ionViewDidEnter() {
        this.galleryService.makeGallery(document.getElementById('gallery-grid_02'), this.damage.images, false);
    }
}