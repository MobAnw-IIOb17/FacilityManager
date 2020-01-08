import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../services/property.service';
import { Router, NavigationExtras } from '@angular/router';
import { FormGroup} from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Property } from '../model/property.model';

@Component({
  selector: 'app-object-manager-new',
  templateUrl: './object-manager-new.page.html',
  styleUrls: ['./object-manager-new.page.scss'],
})

export class ObjectManagerNewPage implements OnInit {

  public validateForm: FormGroup;
  firmCities: Array<string> = [];
  cities: Array<string> = [];
  city: string = '';
  
  firmObjects: Array<Property> = [];
  objects: Array<Property> = [];
  object: Property = new Property();  
  

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
  clearAList(list: Array<any>) {
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
  public copyAList(targetList: Array<any>, sourceList: Array<any>) {
    this.clearAList(targetList);
    for (var i: number = 0; i < sourceList.length; i++) {
      targetList.push(sourceList[i]);
    }
  }

  loadCities() {
      this.propertyService.getPropertyCities().then((items) => {
        if (items.length !== 0) {
          this.firmCities = items;
        } else {
          this.firmCities = [];
        }
      });
  }

  /**
   * 
   * @param list Parameter 
   * @param show gibt an, ob die geladene Liste gleich angezeigt wird
   */
  loadObjects(list: Array<Property> = this.firmObjects, show: boolean = false) {
    this.propertyService.getPropertiesByCity(this.city).then((items) => {
      if (items.length !== 0) {   
        this.copyAList(list, items.map((val) => val));
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
  chooseItem(chosenObject: string, firmList: Array<any>, s: string) {
    document.getElementById('#' + s + '_searchbar').setAttribute('value', chosenObject);
    var show: boolean = false;
    if (s == 'city') {
      if (!firmList.includes(chosenObject)) {
        this.city = '';
      } else {
        this.city = chosenObject;
        this.clearAList(this.cities);
      }
      show = true;
      this.object = null;
      this.clearAList(this.firmObjects);
      document.getElementById('#object_searchbar').setAttribute('value', '');
    } else {
      if (!firmList.includes(this.getPropertyByCityAndStreet(firmList, this.city, chosenObject))) {
        this.object = null;
        this.clearAList(this.firmObjects);
      } else {
        this.object = this.getPropertyByCityAndStreet(firmList, this.city, chosenObject);
        this.clearAList(this.objects);
      }
      document.getElementById('#object_searchbar').setAttribute('value', chosenObject);
      }
    this.loadObjects(this.firmObjects, show);
  }

  getPropertyByCityAndStreet(list: Array<Property>, cityName: string, streetName: string) {
    var prop = new Property();
    prop = list.filter((values) => {return (values.city == cityName && values.street == streetName)})[0];
    return prop
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
      //problem mit der firmlist
      this.copyAList(list, firmList.filter((values) => {return values.toLowerCase().includes(val.toLowerCase())}));
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
      if (this.propertyListContainsProperty(this.firmObjects, this.object)) {
        let navigationExtras: NavigationExtras = {
          queryParams: {
            object: JSON.stringify(this.object)
          }
        };
        this.router.navigate(['/tabs/object-manager-control-list'], navigationExtras);
      } else {
        this.showToast('Bitte wählen Sie eine verfügbare Straße.');
      }
    } else {
      this.showToast('Bitte wählen Sie eine verfügbare Stadt.');
    }
  }

  propertyListContainsProperty(list: Array<Property>, prop: Property) {
    if (!(list == null || prop == null)) {
      return list.map((val) => {
        if (
          val.city == prop.city &&
          val.deleted == prop.deleted &&
          val.hidden == prop.hidden &&
          val.owner == prop.owner &&
          val.street == prop.street &&
          val.title == prop.title &&
          val.uid == prop.uid &&
          val.zip == prop.zip
        ) return true;
        return false;
      })
    }
    return false;

  }
}
