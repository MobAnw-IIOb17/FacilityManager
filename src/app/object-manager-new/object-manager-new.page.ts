import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../services/property.service';

@Component({
  selector: 'app-object-manager-new',
  templateUrl: './object-manager-new.page.html',
  styleUrls: ['./object-manager-new.page.scss'],
})
export class ObjectManagerNewPage implements OnInit {

  cities = [];

  constructor(private propertyService: PropertyService) { 
    this.showItems();
  }

  ngOnInit() {
  }

  showItems() {
    this.cities = ['Eins','Zwei','Drei'];
  }

  predictiveSearch(event) {
    this.showItems();
    var val = event.target.value;
    this.cities = this.cities.filter((i) => {
      return (i.toLowerCase().indexOf(val.toLowerCase()) > -1);
    });
  }

  hideItems() {
    this.cities = [];
  }
}
