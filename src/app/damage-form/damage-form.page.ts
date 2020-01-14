import { Component, OnInit } from '@angular/core';
import { GalleryService } from '../services/gallery.service';
import { Damage } from '../model/damage.model';
import { DamageService } from '../services/damage.service';
import { PropertyService } from '../services/property.service';
import { Property } from '../model/property.model';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../model/employee.model';
import { ObjectSearchService } from '../services/object-search.service';
import { Router } from '@angular/router';

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
    private router: Router,
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

    this.galleryService.makeGallery(document.getElementById('gallery-grid_01'), this.pictures, true);
  }

  getPropertyByCityAndStreet(list: Array<Property>, cityName: string, streetName: string) {
    let loc_prop = new Property();
    loc_prop = list.filter((values) => {
        return (values.city === cityName && values.street === streetName);
    })[0];
    return loc_prop;
  }

  checkForm(): boolean{
    let check = false;
    if(this.date){
      if(this.objectSearchService.validateObject(undefined, this.city, this.firmCities, this.object, this.firmObjects)){
        if(this.employee){
          if(this.description && this.description.length > 0){
            if(this.pictures.length >= 0){
              check = true;
            } else { this.objectSearchService.showToast('Bitte fügen Sie mindestens ein Bild hinzu!', 2000); }
          } else { this.objectSearchService.showToast('Bitte fügen Sie eine Beschreibung hinzu!', 2000); }
        } else { this.objectSearchService.showToast('Bitte melden Sie sich auf diesem Gerät an!', 2000); }
      }
    }
    return check;
  }

  submitForm() {
    if(this.checkForm()){
      var dmg = new Damage();

      this.damageService.getAllDamages().then((damages) => {
        if (damages.length > 0) {
          dmg.uid = "" + (1 + +(damages[damages.length-1].uid));
        } else {
          dmg.uid = "0";
        }
      });

      dmg.createDate = this.date.getDate()+"."+(this.date.getMonth()+1)+"."+this.date.getFullYear()+" "+
        this.date.getHours()+":"+this.date.getMinutes();
      dmg.property = this.object;
      dmg.employee = this.employee;
      dmg.description = this.description;
      dmg.images = this.pictures;
      dmg.location = this.location;
      dmg.sent = false;
      dmg.sentTimestamp = null;

      this.damageService.addDamage(dmg);
      this.location = '';
      this.description = '';
      document.getElementById('#df_object_searchbar').setAttribute("value", "");
      document.getElementById('#df_city_searchbar').setAttribute("value", "");
      this.city = '';
      this.object = new Property();
      this.pictures = [];
      this.router.navigateByUrl('/tabs/damage-reports');
    }
  }

  chooseItem(chosenObject: string, firmList: Array<any>, s: string) {
    const val = this.objectSearchService.chooseItem(chosenObject, firmList, s, 'df',
        this.city, this.cities, this.firmCities, this.object, this.objects, this.firmObjects);
    this.city = val.city;
    this.object = val.object;
  }
}
