import { Injectable } from '@angular/core';
import { AppCameraService } from '../services/app-camera.service';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  public imgBase64: string[] = [];
  public galleryHTML;

  constructor(
    public appCameraService: AppCameraService
  ) { }

  addCameraPicture() {
    //var ImageData = this.appCameraService.takePicture();
    var ImageData = 'iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==';
    this.imgBase64.push('data:image/png;base64,'+ImageData);
    this.addToGallery(this.imgBase64[(this.imgBase64.length-1)]);
  }

  addGalleryPicture() {
    //TODO
  }

  openDialog = () => {

  }

  deleteFromGallery = (index: number) => {
    var imageClipboard = this.imgBase64;
    this.imgBase64 = [];
    while (this.galleryHTML.hasChildNodes()) {  
      this.galleryHTML.removeChild(this.galleryHTML.firstChild);
    } 
    var i = 0;
    imageClipboard.forEach(element => {
      if(i!=index){
        this.imgBase64.push(element);
        this.addToGallery(element); 
      }
      i++;
    })
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
      newPicture.setAttribute("id",(this.imgBase64.length-1)+"_Img");
      newPicture.addEventListener("click", () => { this.deleteFromGallery((this.imgBase64.length-1)) });
      col.appendChild(newPicture);
    } else {
      this.galleryHTML = document.getElementById('gallery-grid');
      this.addToGallery(src); 
    }
  }

}
