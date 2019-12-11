import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../services/property.service';
import { Router, NavigationExtras } from '@angular/router';
import { FormGroup} from '@angular/forms';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-object-manager-new',
  templateUrl: './object-manager-new.page.html',
  styleUrls: ['./object-manager-new.page.scss'],
})
export class ObjectManagerNewPage implements OnInit {

  public validateForm: FormGroup;
  cities = [];
  firmCities = [];
  objects = [];
  city: string = '';
  object: string = '';  
  firmObjects = [];

  constructor(private toastController: ToastController, private propertyService: PropertyService, private router: Router) {
      this.loadCities();
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
    //this.chooseItem('', list, 'city');
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

  /**
   * 
   * @param list Parameter 
   * @param show gibt an, ob die geladene Liste gleich angezeigt wird
   */
  loadObjects(list: Array<string> = this.firmObjects, show: boolean = false) {
    this.propertyService.getPropertiesByCity(this.city).then((items) => {
      if (items.length !== 0) {   
        this.copyAList(list, items.map((val) => val.street));
      } else {
        this.clearAList(list);
      }
      if (show) {
        this.copyAList(this.objects, this.firmObjects);
      }
    });
  }

  /**
   * 
   * @param chosenString 
   * @param firmList 
   * @param s 
   */
  chooseItem(chosenString: string, firmList: Array<string>, s: string) {
    document.getElementById('#' + s + '_searchbar').setAttribute('value', chosenString);
    var show: boolean = false;
    if (s == 'city') {
      if (!firmList.includes(chosenString)) {
        this.city = '';
      } else {
        this.city = chosenString;
        this.clearAList(this.cities);
      }
      show = true;
      this.object = '';
      this.clearAList(this.firmObjects);
      document.getElementById('#object_searchbar').setAttribute('value', '');
    } else {
      if (!firmList.includes(chosenString)) {
        this.object = '';
        this.clearAList(this.firmObjects);
      } else {
        this.object = chosenString;
        this.clearAList(this.objects);
      }
    }
    this.loadObjects(this.firmObjects, show);
  }

  /**
   * Schreibt das Ergebnis des Filterns der Liste firmList mit dem Text des event Ereignisses in die list Liste
   * @param event wird benötigt,um den Inhalt der Searchbar zu ermitteln
   * @param list Liste, welche sortiert werden soll
   * @param firmList Liste, welche sortiert wird
   */
  predictiveCitySearch(event, list: Array<string>, firmList: Array<string>) {
    this.copyAList(list, firmList);
    var val = event.target.value;
    if (val != '') {
      this.copyAList(list, firmList.filter((values) => {return (values.toLowerCase().includes(val.toLowerCase()))}));
    }
  }

  /**
   * Zeigt einen Toast mit dem Eingabetext für 2 Sekunden.
   * @param text anzuzeigender Text
   */
  async showToast(text: string) {
    const toast = await this.toastController.create({
      message: text,
      duration: 2000
    });
    toast.present();
  }

  /**
   * Ruft die nächste Seite auf und übergibt die ausgewählte Stadt und das ausgewählte Objekt
   */
  openOMCListInTab() {
    if (this.firmCities.includes(this.city)) {
      if (this.firmObjects.includes(this.object)) {
        let navigationExtras: NavigationExtras = {
          state: {
            city: this.city,
            object: this.object
          }
        };
        this.router.navigateByUrl('/tabs/object-manager-control-list', navigationExtras);
      } else {
        this.showToast('Bitte wählen Sie eine verfügbare Straße');
      }
    } else {
      this.showToast('Bitte wählen Sie eine verfügbare Stadt');
    }
  }

}
