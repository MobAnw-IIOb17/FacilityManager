import { Component, OnInit, AfterViewInit } from '@angular/core';
import { GalleryService } from '../services/gallery.service';
import { Damage } from '../model/damage.model';
import { Property } from '../model/property.model';

@Component({
  selector: 'app-damage-form',
  templateUrl: './damage-form.page.html',
  styleUrls: ['./damage-form.page.scss'],
})
export class DamageFormPage {

  private pictures: string[] = [];
  private date: Date;
  private prop: Property;

  constructor(private galleryService: GalleryService) {
  }

  ionViewDidEnter() {
    this.date = new Date;
    let dateString = this.date.getDate()+"."+(this.date.getMonth()+1)+"."+this.date.getFullYear();
    document.getElementById('date_input').setAttribute("value", dateString);

    this.pictures = [];
    this.galleryService.makeGallery(document.getElementById('gallery-grid_01'), this.pictures);
  }

  submitForm() {
    var dmg = new Damage();
    dmg.uid = null; //TODO
    dmg.createDate = this.date.toString();
    dmg.property = this.prop;
    dmg.employee = null; //TODO
    dmg.description = document.getElementById('desc_input').getAttribute("value");
    dmg.images = this.pictures;
    dmg.location = document.getElementById('loc_input').getAttribute("value");
  }
}
