import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../services/property.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-object-manager-new',
  templateUrl: './object-manager-new.page.html',
  styleUrls: ['./object-manager-new.page.scss'],
})
export class ObjectManagerNewPage implements OnInit {

  cities = [];
  objects = [];
  city: string = 'Görlitz';
  object: string = '';

  constructor(private propertyService: PropertyService, private router: Router) {
    this.hideItems(this.cities);
  }

  ngOnInit() {
  }

  /**
  * Leer Itemliste, damit sie in der Oberfläche verschwindet
  * Benötigt Verzögerung, damit man ein Item aus der Liste auswählen kann, ansonsten würde die Liste verschwinden bevor man ein Item anklicken kann
  */
  async hideItems(list: Array<string>) {
    await this.delay(200);
    this.clearAList(list);
  }

  /**
 * Warte Funktion
 * @param ms Zeit die gewartet werden soll in Millisekunden
 * @returns Promise, welches nach ms Millisekunden erfüllt wird
 */
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Löscht den Inahlt einer Liste
   * Call-by-Reference
   * @param list Liste, welche geleert werden soll
   */
  clearAList(list: Array<string>) {
    var size: number = list.length;
    for (var i: number = 0; i <= size; i++) {
      list.pop();
    }
  }

  copyAList(targetList: Array<string>, sourceList: Array<string>) {
    this.clearAList(targetList);
    for (var i: number = 0; i < sourceList.length; i++) {
      targetList.push(sourceList[i]);
    }
  }

  /**
 * 
 */
  async showCityItems(list: Array<string>) {
    return this.propertyService.getPropertyCities().then((items) => {
      if (items.length !== 0) {
        this.copyAList(list, items);
      } else {
        this.copyAList(list, ['Görlitz', 'Zittau', 'Löbau', 'Bautzen']);
      }
    });
  }

  async showObjectItems(list: Array<string>) {
    return this.propertyService.getPropertiesByCity(this.city).then((items) => {
      if (items.length !== 0) {
        var propertyList: Array<string>;
        for (var i: number = 0; i < items.length; i++) {
          propertyList[0] = items[0].street;
        }
        this.copyAList(list, propertyList);
      } else {
        this.copyAList(list, ['Brückenstraße 1', 'Bahnhofsstraße 20']);
      }
    });
  }

  /**
   * Verändert den Inhalt der Stad-Searchbar bei Auswahl einer Stadt
   * @param chosenCity die Stadt die ausgewählt wurde, wird in die Serachbar für die Stadt eingeschrieben
   * @bugs: 
   */
  chooseItem(chosenString: string, list: Array<string>, s: string = 'city') {
    document.getElementById('#' + s + '_searchbar').setAttribute('value', chosenString);
    this.clearAList(list);
    if (s == 'city') {
      document.getElementById('#object_searchbar').setAttribute('value', '');
    }
    this.city = document.getElementById('#city_searchbar').getAttribute('value');
    this.object = document.getElementById('#object_searchbar').getAttribute('value');
  }

  /**
   * Sortiert die entsprechende Liste nach der Eingabe aus dem Event
   * @param event wird benötigt,um den Inhalt der Searchbar zu ermitteln
   * @param list Liste, welche sortiert werden soll
   * @param s Indikator, welche lokale Liste geladen werden soll
   */
  async predictiveCitySearch(event, list: Array<string>, s: string = 'c') {
    switch (s) {
      case 'c': await this.showCityItems(list);
        break;
      case 'o': await this.showObjectItems(list);
        break;
    }
    var val = event.target.value;
    this.copyAList(list, list.filter((values) => {return (values.toLowerCase().includes(val.toLowerCase()))}));
  }

  href = '/tabs/object-manager-control-list';
  openOMCListInTab() {
    this.router.navigateByUrl(this.href);
  }
}
