import { Component, OnInit, AfterViewInit } from '@angular/core';
import { GalleryService } from '../services/gallery.service';
import { Damage } from '../model/damage.model';
import { Property } from '../model/property.model';
import {ObjectSearchService} from '../services/object-search.service';

@Component({
  selector: 'app-damage-form',
  templateUrl: './damage-form.page.html',
  styleUrls: ['./damage-form.page.scss'],
})
export class DamageFormPage {

  private pictures: string[] = [];
  private date: Date;
  private prop: Property;

  private firmCities: Array<string> = [];
  private cities: Array<string> = [];
  private city = '';

  private firmObjects: Array<Property> = [];
  private objects: Array<Property> = [];
  private object: Property = new Property();

  constructor(
      private galleryService: GalleryService,
      private objectSearchService: ObjectSearchService) {
    this.objectSearchService.loadCities(this.firmCities);
  }

  ionViewDidEnter() {
    this.date = new Date;
    let dateString = this.date.getDate()+"."+(this.date.getMonth()+1)+"."+this.date.getFullYear();
    document.getElementById('date_input').setAttribute("value", dateString);

    this.pictures = [];
    this.galleryService.makeGallery(document.getElementById('gallery-grid_01'), this.pictures, true);
  }

  submitForm() {
    const dmg = new Damage();
    dmg.uid = null; //TODO
    dmg.createDate = this.date.toString();
    dmg.property = this.prop;
    dmg.employee = null; //TODO
    dmg.description = document.getElementById('desc_input').getAttribute("value");
    dmg.images = this.pictures;
    dmg.location = document.getElementById('loc_input').getAttribute("value");
  }

  chooseItem(chosenObject: string, firmList: Array<any>, s: string) {
    const val = this.objectSearchService.chooseItem(chosenObject, firmList, s, 'df',
        this.city, this.cities, this.firmCities, this.object, this.objects, this.firmObjects);
    this.city = val.city;
    this.object = val.object;
  }
}
