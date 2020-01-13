import {Injectable} from '@angular/core';
import {PropertyService} from './property.service';
import {Property} from '../model/property.model';
import {Router} from '@angular/router';
import {ToastController} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class ObjectSearchService {

    constructor(
        private router: Router,
        private toastController: ToastController,
        private propertyService: PropertyService,
    ) {
    }

    /**
     * Löscht den Inahlt einer Liste
     * Call-by-Reference zerstört keine Referenzen
     * @param list Liste, welche geleert werden soll
     */
    clearAnArray(list: Array<any>) {
        const size = list.length;
        for (let i = 0; i <= size; i++) {
            list.pop();
        }
    }

    /**
     * Kopiert sourceList in targetList ohne Referenzen zu zerstören
     * @param targetList Liste in die rein kopiert wird
     * @param sourceList Liste von der kopiert wird
     */
    public copyAnArray(targetList: Array<any>, sourceList: Array<any>) {
        this.clearAnArray(targetList);
        for (let i = 0; i < sourceList.length; i++) {
            targetList.push(sourceList[i]);
        }
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
     * Leer Itemliste, damit sie in der Oberfläche verschwindet
     * Benötigt Verzögerung, damit man ein Item aus der Liste auswählen kann,
     * ansonsten würde die Liste verschwinden bevor man ein Item anklicken kann
     */
    async hideItems(list: Array<string>) {
        await this.delay(150);
        this.clearAnArray(list);
    }

    loadCities(firmList: Array<string>) {
        this.propertyService.getPropertyCities().then((items) => {
            if (items.length !== 0) {
                this.copyAnArray(firmList, items);
            } else {
                this.copyAnArray(firmList, []);
            }
        });
    }

    /**
     *
     * @param list Parameter
     * @param show gibt an, ob die geladene Liste gleich angezeigt wird
     */
    loadObjects(city: string, firmList: Array<Property>, objects: Array<Property>, show: boolean) {
        this.propertyService.getPropertiesByCity(city).then((items) => {
            if (items.length !== 0) {
                this.copyAnArray(firmList, items.map((val) => val));
            } else {
                this.clearAnArray(firmList);
            }
            if (show) {
                this.copyAnArray(objects, firmList);
            }
        });
    }

    /**
     *
     * @param chosenObject aus
     * @param firmList fest
     * @param s str
     */
    chooseItem(chosenObject: string, firmList: Array<any>, s: string, searchbarName: string,
               city: string, cities: Array<string>, firmCities: Array<string>,
               object: Property, objects: Array<Property>, firmObjects: Array<Property>) {
        document.getElementById('#' + searchbarName.concat('_') + s + '_searchbar').setAttribute('value', chosenObject);
        let show = false;
        if (s === 'city') {
            if (!firmList.includes(chosenObject)) {
                city = '';
            } else {
                city = chosenObject;
                this.clearAnArray(cities);
            }
            show = true;
            object = null;
            this.clearAnArray(firmObjects);
            document.getElementById('#' + searchbarName + '_object_searchbar').setAttribute('value', '');
        } else {
            if (!firmList.includes(this.getPropertyByCityAndStreet(firmList, city, chosenObject))) {
                object = null;
                this.clearAnArray(firmObjects);
            } else {
                object = this.getPropertyByCityAndStreet(firmList, city, chosenObject);
                this.clearAnArray(objects);
            }
            document.getElementById('#' + searchbarName + '_object_searchbar').setAttribute('value', chosenObject);
        }
        this.loadObjects(city, firmObjects, objects, show);
        return {city, object};
    }

    getPropertyByCityAndStreet(list: Array<Property>, cityName: string, streetName: string) {
        let prop = new Property();
        prop = list.filter((values) => {
            return (values.city === cityName && values.street === streetName);
        })[0];
        return prop;
    }



    /**
     * Schreibt das Ergebnis des Filterns der Liste firmList mit dem Text des event Ereignisses in die list Liste
     * @param event wird benötigt,um den Inhalt der Searchbar zu ermitteln
     * @param list Liste, welche sortiert werden soll
     * @param firmList Liste, welche sortiert wird
     */
    predictiveCitySearch(event, list: Array<string>, firmList: Array<any>) {
        this.copyAnArray(list, firmList);
        const val = event.target.value;
        if (val !== '') {
            if (typeof (firmList[0]) === typeof ({})) {
                this.copyAnArray(list, firmList.filter((values) => {
                    return values.street.toLowerCase().includes(val.toLowerCase());
                }));
            } else {
                this.copyAnArray(list, firmList.filter((values) => {
                    return values.toLowerCase().includes(val.toLowerCase());
                }));
            }
        }
    }

    /**
     * Zeigt einen Toast mit dem Eingabetext für 2 Sekunden.
     * @param text anzuzeigender Text
     * @param time Anzeigedauer in ms
     */
    async showToast(text: string, time: number) {
        const toast = await this.toastController.create({
            message: text,
            duration: time
        });
        toast.present();
    }

    propertyListContainsProperty(list: Array<Property>, prop: Property) {
        if (!(list === null || prop === null)) {
            return list.map((val) => {
                return (
                    val.city === prop.city &&
                    val.deleted === prop.deleted &&
                    val.hidden === prop.hidden &&
                    val.owner === prop.owner &&
                    val.street === prop.street &&
                    val.title === prop.title &&
                    val.uid === prop.uid &&
                    val.zip === prop.zip
                );
            });
        }
        return false;
    }

    /**
     * Ruft die nächste Seite auf und übergibt die ausgewählte Stadt und das ausgewählte Objekt
     */
    validateObject(jmpTo: string, city: string, firmCities: Array<string>, obj: Property, firmObjects: Array<Property>) {
        if (firmCities.includes(city)) {
            if (this.propertyListContainsProperty(firmObjects, obj)) {
                this.router.navigate([jmpTo], {state: {object: obj}});
            } else {
                this.showToast('Bitte wählen Sie eine verfügbare Straße.', 2000);
            }
        } else {
            this.showToast('Bitte wählen Sie eine verfügbare Stadt.', 2000);
        }
    }
}
