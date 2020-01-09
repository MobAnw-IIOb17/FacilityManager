import { Injectable } from '@angular/core';
import { AppCameraService } from '../services/app-camera.service';
import { PopoverController, Platform } from '@ionic/angular';
import { DeletePopoverPage } from './gallery.service.components/deletePopover/deletePopover.page';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  public imgBase64: string[] = [];
  public galleryHTML;
  private rows;

  constructor(
    private popover: PopoverController,
    private platform: Platform,
    public appCameraService: AppCameraService
  ) { 
    this.platform.ready().then((readySource) => {
      this.rows = Math.floor(this.platform.width()/100);
    });
  }

  selectGallery(pageGallery) {   
    this.galleryHTML = pageGallery;
  }

  addCameraPicture() {
    //var ImageData = this.appCameraService.takePicture();
    var ImageData = 'iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==';
    this.imgBase64.push('data:image/png;base64,'+ImageData);
    this.addToGallery(this.imgBase64[(this.imgBase64.length-1)]);
  }

  addGalleryPicture() {
    //TODO
  }

  openDeletePopover = (local_index: number, local_src: string) => {
    this.popover.create({
      component:DeletePopoverPage,
      componentProps: {
        index: local_index,
        src: local_src,
        galleryService: this
      },
      showBackdrop:true
    }).then((popoverElement)=>{
      popoverElement.present();
    })
  }

  deleteFromGallery(index: number){
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
      if((this.imgBase64.length-1)%this.rows==0){
        var newRow = document.createElement("ion-row");
        for(var i = 0; i<this.rows; i++){
          newRow.appendChild(document.createElement("ion-col"));
        }
        this.galleryHTML.appendChild(newRow);
      }
      var row = this.galleryHTML.children[this.galleryHTML.children.length-1];
      var col = row.children[(this.imgBase64.length-1)%this.rows];
      var newPicture = document.createElement("ion-img");
      newPicture.setAttribute("src", src);
      newPicture.setAttribute("id",(this.imgBase64.length-1)+"_Img");
      newPicture.addEventListener("click", () => { this.openDeletePopover((this.imgBase64.length-1),src) });
      col.appendChild(newPicture);
    } else {
      throw ('No Grid has been selected for the Gallery. Please see documentation for more Informtion.'); 
    }
  }

}
