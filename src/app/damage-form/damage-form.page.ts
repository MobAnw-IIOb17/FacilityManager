import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AppCameraService } from '../services/app-camera.service';
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
    public appCameraService: AppCameraService
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.date = new Date;
    document.getElementById('date_input')
    .setAttribute("value", ""+this.date.getDate()+"."+(this.date.getMonth()+1)+"."+this.date.getFullYear());
  }

  addPictureCamera() {
    var ImageData = this.appCameraService.takePicture();
    this.pictures.push('data:image/jpeg;base64,'+ImageData);
    var gallery = document.getElementById('form_gallery');
    if(! (Math.floor(this.pictures.length/3) == gallery.children.length)){
      gallery.appendChild(document.createElement("ion-row"));
    }
    var row = gallery.children[gallery.children.length-1];
    if(! ((this.pictures.length-(Math.floor(this.pictures.length/3)*3)) == row.children.length)){
      row.appendChild(document.createElement("ion-col"));
    }
    var col = row.children[row.children.length-1];
    var newPicture = document.createElement("ion-img");
    newPicture.setAttribute("[src]", '"pictures['+ (this.pictures.length-1) +']" *ngIf="pictures['+ (this.pictures.length-1) +']"');
    col.appendChild(document.createElement("ion-thumbnail").appendChild(newPicture));
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
