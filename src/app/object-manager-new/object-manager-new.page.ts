import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Property} from '../model/property.model';
import {EmployeeService} from '../services/employee.service';
import {Employee} from '../model/employee.model';
import {ObjectSearchService} from '../services/object-search.service';
import {AlertController, Platform, PopoverController} from '@ionic/angular';

@Component({
    selector: 'app-object-manager-new',
    templateUrl: './object-manager-new.page.html',
    styleUrls: ['./object-manager-new.page.scss']
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
        private employeeService: EmployeeService,
        private alertController: AlertController,
        private objectSearchService: ObjectSearchService,
        private router: Router,
        private platform: Platform
    ) {
    }

    ngOnInit() {
    }

    /**
     * Aktualisiert die Liste beim Öffnen der Seite und Scrollt nach oben
     * Laden der verfügbaren Städte sowie des Mitarbeiters aus der Datenbank
     */
    ionViewDidEnter() {
        document.getElementById('#om_city_searchbar').setAttribute('value', '');
        document.getElementById('#om_object_searchbar').setAttribute('value', '');
        this.objectSearchService.loadCities(this.firmCities);
        this.loadEmployee();

        // Handle für device back button
        this.platform.backButton.subscribeWithPriority(0, () => {
            this.router.navigateByUrl('/tabs/object-manager-reports');
        });
    }

    /**
     * Läd den Mitarbeiter aus der Datenbank und speichert ihn in der Variable employee ab
     * Bring Fehler Alert, wenn kein gültiger Mitarbeiter ausgewählt wurde
     */
    loadEmployee() {
        this.employeeService.getCurrentEmployee().then(async item => {
            if (item != null) {
                this.employee = item;
            } else {
                // this.objectSearchService.showToast('Achtung! Es wurde kein Mitarbeiter angemeldet', 4000);
                document.getElementById('om_employee_input').setAttribute('value', 'Kein Mitarbeiter angemeldet!');
                const alert = await this.alertController.create({
                    header: 'Achtung!',
                    message: 'Es wurde kein Mitarbeiter angemeldet.',
                    buttons: [
                        {
                            text: 'Fortfahren'
                        },
                        {
                            text: 'Einstellungen',
                            handler: async () => {
                                await this.router.navigateByUrl('/tabs/settings');
                            }
                        }
                    ]
                });
                await alert.present();
            }
        });
    }

    /**
     * Aktualiesiert die Stadt und das Objekt in Abhängigkeit der ausgewählten Elementen in den Suchlisten
     * Ruft die Item Auswahl im Service auf und bekommt die aktuelle Auswahl als Objekt zurück
     */
    chooseItem(chosenObject: string, firmList: Array<any>, s: string) {
        const val = this.objectSearchService.chooseItem(
            chosenObject,
            firmList,
            s,
            'om',
            this.city,
            this.cities,
            this.firmCities,
            this.object,
            this.objects,
            this.firmObjects
        );
        this.city = val.city;
        this.object = val.object;
    }
}
