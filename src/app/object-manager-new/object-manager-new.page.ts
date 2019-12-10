import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../services/property.service';
import { Router, NavigationExtras } from '@angular/router';
import { FormBuilder, FormGroup, Validators, Validator, AbstractControl, FormControl} from '@angular/forms';
import { CityValidator } from '../custom-validators/city.validator';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-object-manager-new',
  templateUrl: './object-manager-new.page.html',
  styleUrls: ['./object-manager-new.page.scss'],
})
export class ObjectManagerNewPage implements OnInit {

  public validateForm: FormGroup;
  cities = [];
  firmCities: string[];
  objects = [];
  city: string = '';
  object: string = '';
  

  constructor(private toastController: ToastController, private propertyService: PropertyService, private router: Router) {
      this.loadCities();
      this.hideItems(this.cities);

  }

  ngOnInit() {
  }

  /**
  * Leer Itemliste, damit sie in der Oberfläche verschwindet
  * Benötigt Verzögerung, damit man ein Item aus der Liste auswählen kann, ansonsten würde die Liste verschwinden bevor man ein Item anklicken kann
  */
  async hideItems(list: Array<string>) {
    await this.delay(150);
    this.clearAList(list);
    this.chooseItem('', list, 'city');
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

/**
 * Kopiert sourceList in targetList
 * @param targetList Liste in die rein kopiert wird
 * @param sourceList Liste von der kopiert wird
 */
  copyAList(targetList: Array<string>, sourceList: Array<string>) {
    this.clearAList(targetList);
    for (var i: number = 0; i < sourceList.length; i++) {
      targetList.push(sourceList[i]);
    }
  }

  /**
 * Füllen der City-Liste (mit Referenz) mit den Werten aus der Datenbank, wenn diese keinen gültigen Wert liefert, werden feste Werte verwendet
 * @param list referenzierte City-Liste
 */
  showCityItems() {
    this.copyAList(this.cities, this.firmCities);
  }

  loadCities() {
      this.propertyService.getPropertyCities().then((items) => {
        var cityDummy = ['Görlitz', 'Zittau', 'Großschönau'];
        if (items.length !== 0) {
          this.firmCities = items;
        } else {
          this.firmCities = cityDummy;
        }
      });
  }

  showObjectItems(list: Array<string>) {
      this.propertyService.getPropertiesByCity(this.city).then((items) => {
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
      this.deleteSubObjects();
    }
    this.city = document.getElementById('#city_searchbar').getAttribute('value');
    this.object = document.getElementById('#object_searchbar').getAttribute('value');
  }

  deleteSubObjects() {
    document.getElementById('#object_searchbar').setAttribute('value', '');
  }

  /**
   * Sortiert die entsprechende Liste nach der Eingabe aus dem Event
   * @param event wird benötigt,um den Inhalt der Searchbar zu ermitteln
   * @param list Liste, welche sortiert werden soll
   * @param s Indikator, welche lokale Liste geladen werden soll
   */
  async predictiveCitySearch(event, list: Array<string>, s: string = 'c') {
    switch (s) {
      case 'c': this.showCityItems();
        break;
      case 'o': await this.showObjectItems(list);
        break;
    }
    var val = event.target.value;
    this.copyAList(list, list.filter((values) => {return (values.toLowerCase().includes(val.toLowerCase()))}));
  }

  href = '/tabs/object-manager-control-list';
  async openOMCListInTab() {
    if (this.firmCities.includes(this.city)) {
      let navigationExtras: NavigationExtras = {
        state: {
          city: this.city,
          object: this.object
        }
      };
      this.router.navigateByUrl(this.href, navigationExtras);
    } else {
      const toast = await this.toastController.create({
        message: "Bitte wählen Sie eine verfügbare Stadt",
        duration: 2000
      });
      toast.present();
    }

  }
}
