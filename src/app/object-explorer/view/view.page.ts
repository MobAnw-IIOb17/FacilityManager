import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Property} from '../../model/property.model';
import {PropertyService} from '../../services/property.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {

  private property: Property;

  constructor(private propertyService: PropertyService, private router: Router, private route: ActivatedRoute, private platform: Platform) {    
    this.property = this.propertyService.getEmptyProperty();
    this.route.params.subscribe(() => {
      const uid: string = this.router.getCurrentNavigation().extras.state.property;
      this.propertyService.getPropertyDirectly(uid).then((p: Property) => {
        this.property = p;
      });
    });
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    //Handle für device back button
    this.platform.backButton.subscribeWithPriority(0, () => {
      this.router.navigateByUrl('/tabs/object-explorer');
    });
  }

  isArtisanFilled(artisan) {
    return artisan !== null && artisan !== undefined && !Array.isArray(artisan);
  }
}
