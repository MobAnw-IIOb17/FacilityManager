import { Component, OnInit } from '@angular/core';
import { GalleryService } from '../services/gallery.service';
import { Damage } from '../model/damage.model';
import { DamageService } from '../services/damage.service';
import { PropertyService } from '../services/property.service';
import { Property } from '../model/property.model';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../model/employee.model';
import { ObjectSearchService } from '../services/object-search.service';

@Component({
  selector: 'app-damage-form',
  templateUrl: './damage-form.page.html',
  styleUrls: ['./damage-form.page.scss'],
})
export class DamageFormPage {

  public location = '';
  public description = '';

  private pictures: string[] = [];
  private date: Date;

  private firmCities: Array<string> = [];
  private cities: Array<string> = [];
  private city = '';

  private firmObjects: Array<Property> = [];
  private objects: Array<Property> = [];
  private object: Property = new Property();

  private employee: Employee = new Employee();

  constructor(
    private galleryService: GalleryService,
    private propertyService: PropertyService,
    private employeeService: EmployeeService,
    private objectSearchService: ObjectSearchService,
    private damageService: DamageService) {
      this.objectSearchService.loadCities(this.firmCities);
  }

  ionViewDidEnter() {
    this.date = new Date;
    let dateString = this.date.getDate()+"."+(this.date.getMonth()+1)+"."+this.date.getFullYear();
    document.getElementById('date_input').setAttribute("value", dateString);

    this.employeeService.getCurrentEmployee().then((item) => {
      if (item != null) {
        this.employee = item;
        document.getElementById('employee_input').setAttribute("value", this.employee.name);
      } else {
        document.getElementById('employee_input').setAttribute("value", "Kein Mitarbeiter angemeldet!");
      }
    });

    this.pictures = [];
    this.galleryService.makeGallery(document.getElementById('gallery-grid_01'), this.pictures, true);
  }

  /*chooseItem(chosenObject: string, firmList: Array<any>, s: string) {
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
        this.prop = null;
        this.objectSearchService.clearAnArray(this.firmObjects);
        document.getElementById('#object_searchbar').setAttribute('value', '');
    } else {
        if (!firmList.includes(this.getPropertyByCityAndStreet(firmList, this.city, chosenObject))) {
            this.prop = null;
            this.objectSearchService.clearAnArray(this.firmObjects);
        } else {
            this.prop = this.getPropertyByCityAndStreet(firmList, this.city, chosenObject);
            this.objectSearchService.clearAnArray(this.objects);
        }
        document.getElementById('#object_searchbar').setAttribute('value', chosenObject);
    }
    this.objectSearchService.loadObjects(this.city, this.firmObjects, this.objects, show);
  }*/

  getPropertyByCityAndStreet(list: Array<Property>, cityName: string, streetName: string) {
    let loc_prop = new Property();
    loc_prop = list.filter((values) => {
        return (values.city === cityName && values.street === streetName);
    })[0];
    return loc_prop;
  }

  locValueChanged(newValue: string) {
    this.location = newValue;
  }

  descValueChanged(newValue: string) {
    this.description = newValue;
  }

  submitForm() {
    var dmg = new Damage();

    this.damageService.getAllDamages().then((damages) => {
      if (damages.length > 0) {
        dmg.uid = "" + (1 + +(damages[damages.length-1].uid));
      } else {
        dmg.uid = "0";
      }
    });

    dmg.createDate = this.date.toString();
    dmg.property = this.object;
    dmg.employee = this.employee;
    dmg.description = this.description;
    dmg.images = this.pictures;
    dmg.location = this.location;
    console.log(dmg);
  }

  chooseItem(chosenObject: string, firmList: Array<any>, s: string) {
    const val = this.objectSearchService.chooseItem(chosenObject, firmList, s, 'df',
        this.city, this.cities, this.firmCities, this.object, this.objects, this.firmObjects);
    this.city = val.city;
    this.object = val.object;
  }
}
