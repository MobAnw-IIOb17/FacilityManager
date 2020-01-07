import { Injectable } from '@angular/core';
import { AppCameraService } from '../services/app-camera.service';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  public imgBase64: string[];
  public galleryHTML;

  constructor(
    public appCameraService: AppCameraService
  ) { }

  addCameraPicture() {
    var ImageData = this.appCameraService.takePicture();
    this.imgBase64.push('data:image/png;base64,'+ImageData);
    this.addToGallery(this.imgBase64[(this.imgBase64.length-1)]);
  }

  addToGallery(src: string) {
    if(this.galleryHTML){
      if((this.imgBase64.length-1)%3==0){
        this.galleryHTML.appendChild(document.createElement("ion-row"));
      }
      var row = this.galleryHTML.children[this.galleryHTML.children.length-1];
      row.appendChild(document.createElement("ion-col"));
      var col = row.children[row.children.length-1];
      var newPicture = document.createElement("ion-img");
      newPicture.setAttribute("src", src);
      col.appendChild(newPicture);
    } else {
      this.galleryHTML = document.getElementById('gallery-grid');
      this.addToGallery(src); 
    }
  }



}
