import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../services/property.service';

@Component({
  selector: 'app-object-manager-new',
  templateUrl: './object-manager-new.page.html',
  styleUrls: ['./object-manager-new.page.scss'],
})
export class ObjectManagerNewPage implements OnInit {

  cities = [];
  objects = [];
  city: string = 'Görlitz';

  constructor(private propertyService: PropertyService) { 
    this.hideItems();
  }

  ngOnInit() {
  }

  showItems() {
    this.cities = ['Eins','Zwei','Drei','Drei2'];
    //this.cities = this.propertyService.getPropertiesByCity()
  }

  async hideItems() {
    await this.delay(200);
    this.cities = [];
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
  /**
   * 
   * @param chosenCity 
   */
  chooseCity(chosenCity: string) {
    this.city = chosenCity;
    console.log(this.city);
    document.getElementById('#city_searchbar').setAttribute('value', this.city);
    this.cities = [];
  }

/**
 * Sortiert die entsprechende Liste nach der Eingabe aus dem Event
 * @param event wird benötigt,um den Inhalt der Searchbar zu ermitteln
 * @param list
 */
  predictiveSearch(event, list : Array<String>) {
    this.showItems();
    console.log(list);
    var val = event.target.value;
    this.cities = this.cities.filter((i) => {
      return (i.toLowerCase().indexOf(val.toLowerCase()) > -1);
    });
  }
}
