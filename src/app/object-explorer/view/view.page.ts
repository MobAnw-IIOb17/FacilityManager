import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Property} from '../../model/property.model';
import {PropertyService} from '../../services/property.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {

  private property: Property;

  constructor(private propertyService: PropertyService, private router: Router, private route: ActivatedRoute) {
    this.property = this.propertyService.getEmptyProperty();
    this.route.params.subscribe(() => {
      const uid: string = this.router.getCurrentNavigation().extras.state.property;
      this.propertyService.getProperty(uid).then((p: Property) => {
        this.property = p;
      });
    });
  }

  ngOnInit() {
  }

}
