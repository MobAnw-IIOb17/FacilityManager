import {Injectable} from '@angular/core';
import {PropertyService} from './property.service';
import {Property} from '../model/property.model';

@Injectable({
    providedIn: 'root'
})
export class ObjectSearchService {

    constructor(
        private propertyService: PropertyService
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
                firmList = [];
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

}
