import {Component, OnInit} from '@angular/core';
import {PropertyService} from '../services/property.service';
import {Router, NavigationExtras} from '@angular/router';
import {FormGroup} from '@angular/forms';
import {ToastController} from '@ionic/angular';
import {Property} from '../model/property.model';
import {EmployeeService} from '../services/employee.service';
import {Employee} from '../model/employee.model';
import {ObjectSearchService} from '../services/object-search.service';

@Component({
    selector: 'app-object-manager-new',
    templateUrl: './object-manager-new.page.html',
    styleUrls: ['./object-manager-new.page.scss'],
})

export class ObjectManagerNewPage implements OnInit {

    private firmCities: Array<string> = [];
    private cities: Array<string> = [];
    private city = '';

    private firmObjects: Array<Property> = [];
    private objects: Array<Property> = [];
    private object: Property = new Property();

    private employee: Employee = new Employee();

    constructor(
        private toastController: ToastController,
        private propertyService: PropertyService,
        private employeeService: EmployeeService,
        private objectSearchService: ObjectSearchService,
        private router: Router) {
        this.objectSearchService.loadCities(this.firmCities);
        this.loadEmployee();
    }

    ngOnInit() {
    }

    /**
     * Läd den Mitarbeiter aus der Datenbank und speichert ihn ab
     */
    loadEmployee() {
        this.employeeService.getCurrentEmployee().then((item) => {
            if (item != null) {
                this.employee = item;
            }
        });
    }


    /**
     *
     * @param chosenObject
     * @param firmList
     * @param s
     */
    chooseItem(chosenObject: string, firmList: Array<any>, s: string) {
        document.getElementById('#' + s + '_searchbar').setAttribute('value', chosenObject);
        let show = false;
        if (s === 'city') {
            if (!firmList.includes(chosenObject)) {
                this.city = '';
            } else {
                this.city = chosenObject;
                this.objectSearchService.clearAnArray(this.cities);
            }
            show = true;
            this.object = null;
            this.objectSearchService.clearAnArray(this.firmObjects);
            document.getElementById('#object_searchbar').setAttribute('value', '');
        } else {
            if (!firmList.includes(this.getPropertyByCityAndStreet(firmList, this.city, chosenObject))) {
                this.object = null;
                this.objectSearchService.clearAnArray(this.firmObjects);
            } else {
                this.object = this.getPropertyByCityAndStreet(firmList, this.city, chosenObject);
                this.objectSearchService.clearAnArray(this.objects);
            }
            document.getElementById('#object_searchbar').setAttribute('value', chosenObject);
        }
        this.objectSearchService.loadObjects(this.city, this.firmObjects, this.objects, show);
    }

    getPropertyByCityAndStreet(list: Array<Property>, cityName: string, streetName: string) {
        let prop = new Property();
        prop = list.filter((values) => {
            return (values.city === cityName && values.street === streetName);
        })[0];
        return prop;
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

    /**
     * Ruft die nächste Seite auf und übergibt die ausgewählte Stadt und das ausgewählte Objekt
     */
    openOMCListInTab() {
        if (this.firmCities.includes(this.city)) {
            if (this.propertyListContainsProperty(this.firmObjects, this.object)) {
                this.router.navigate(['/tabs/object-manager-control-list'], {state: {object: this.object}});
            } else {
                this.showToast('Bitte wählen Sie eine verfügbare Straße.', 2000);
            }
        } else {
            this.showToast('Bitte wählen Sie eine verfügbare Stadt.', 2000);
        }
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
}
