import { Component, OnInit } from '@angular/core';
import {AppCameraService} from '../services/app-camera.service';

@Component({
  selector: 'app-damage-form',
  templateUrl: './damage-form.page.html',
  styleUrls: ['./damage-form.page.scss'],
})
export class DamageFormPage implements OnInit {

  public pictures: String[] = [];

  constructor(
    public appCameraService: AppCameraService
  ) { }

  ngOnInit() {
  }

<<<<<<< HEAD
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
=======
>>>>>>> 9e0f9824ecca8ea73316f7e3db6bb10173c8da72
}
