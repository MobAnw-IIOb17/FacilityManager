import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../../services/property.service';
import { Property } from '../../model/property.model';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  private properties: Property[] = [];

  constructor(private propertyService: PropertyService, private router: Router, private platform: Platform) {
    propertyService.getAllProperties().then((p: Property[]) => {
      this.setProperties(p);
    });
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    // Handle für device back button
    this.platform.backButton.subscribeWithPriority(0, () => {
      navigator['app'].exitApp();
    });
  }

  propertyClick(p: Property) {
    this.router.navigate(['/tabs/object-explorer-view'], { state: { property: p.uid } });
  }

  searchProperty(event) {
    const searchString: string = event.target.value;
    this.propertyService.getAllProperties().then((ps: Property[]) => {
      const array: Property[] = [];
      for (const p of ps) {
        if (p.city.toLocaleLowerCase().indexOf(searchString.toLocaleLowerCase()) >= 0) {
          array.push(p);
          continue;
        }
        if (p.street.toLocaleLowerCase().indexOf(searchString.toLocaleLowerCase()) >= 0) {
          array.push(p);
        }
      }
      this.setProperties(array);
    });
  }

  private setProperties(array: Property[]) {
    array.sort((a: Property, b: Property) => {
      if (a.city < b.city) { return -1; }
      if (a.city > b.city) { return 1; }
      if (a.street < b.street) { return -1; }
      if (a.street > b.street) { return 1; }
      return 0;
    });
    this.properties = array;
  }
}
