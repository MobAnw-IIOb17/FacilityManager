import { Component, OnInit, AfterViewInit } from '@angular/core';
import { GalleryService } from '../services/gallery.service';
import { Damage } from '../model/damage.model';
import { Property } from '../model/property.model';

@Component({
  selector: 'app-damage-form',
  templateUrl: './damage-form.page.html',
  styleUrls: ['./damage-form.page.scss'],
})
export class DamageFormPage implements OnInit, AfterViewInit {

  public pictures: string[] = [];
  public date;
  public prop: Property;

  constructor(
    public galleryService: GalleryService
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.date = new Date;
    document.getElementById('date_input')
    .setAttribute("value", ""+this.date.getDate()+"."+(this.date.getMonth()+1)+"."+this.date.getFullYear());
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
