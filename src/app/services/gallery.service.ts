import { Injectable } from '@angular/core';
import { AppCameraService } from '../services/app-camera.service';
import { PopoverController, Platform } from '@ionic/angular';
import { DeletePopoverPage } from './gallery.service.components/deletePopover/deletePopover.page';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  private imgBase64: string[] = [];
  private galleryHTML;
  private columns;

  constructor(
    private popover: PopoverController,
    private platform: Platform,
    public appCameraService: AppCameraService
  ) { 
    this.platform.ready().then((readySource) => {
      this.columns = Math.floor(this.platform.width()/100);
    });
  }

  selectGallery(pageGallery: HTMLElement) {
    this.galleryHTML = pageGallery;
  }

  async addGalleryPicture() {
    let image = await this.appCameraService.importPicture();
    this.imgBase64.push(image);
    this.addToGallery(this.imgBase64[(this.imgBase64.length-1)]);
  }

  async addCameraPicture() {
    let image = await this.appCameraService.takePicture();
    this.imgBase64.push(image);
    this.addToGallery(this.imgBase64[(this.imgBase64.length-1)]);
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
      if((this.imgBase64.length-1)%this.columns==0){
        var newRow = document.createElement("ion-row");
        for(var i = 0; i<this.columns; i++){
          newRow.appendChild(document.createElement("ion-col"));
        }
        this.galleryHTML.appendChild(newRow);
      }
      var row = this.galleryHTML.children[this.galleryHTML.children.length-1];
      var col = row.children[(this.imgBase64.length-1)%this.columns];

      let newPicture = this.makeNewPicture(src, this.imgBase64.length-1);

      col.appendChild(newPicture);
    } else {
      throw ('No Grid has been selected for the Gallery');
    }
  }

  arrayToGallery(images: string[]) {
    this.imgBase64 = images;
    if(this.galleryHTML){
      let imageIndex = 0;
      for(let i=0; i<Math.ceil(images.length/this.columns); i++) {
          let row = document.createElement('ion-row');
          for(let j=0; j<this.columns; j++) {
              let col = document.createElement('ion-col');
              if(imageIndex<images.length) {
                  let src = 'data:image/png;base64,'+ images[imageIndex];

                  let newPicture = this.makeNewPicture(src, imageIndex);

                  col.appendChild(newPicture);
              }
              imageIndex++;
              row.appendChild(col);
          }
          this.galleryHTML.appendChild(row);
      }
    } else {
      throw ('No Grid has been selected for the Gallery'); 
    }
  }

  resetGallery() {
    let gallery = this.galleryHTML;
    while(gallery.lastChild) {
      gallery.removeChild(gallery.firstChild);
    }
  }

  makeNewPicture(source: string, index: number){
    let newPicture = document.createElement("ion-img");
    newPicture.setAttribute("src", source);
    newPicture.setAttribute("id",index+"_Img");
    newPicture.addEventListener("click", () => { this.openDeletePopover(index,source) });
    return newPicture;
  }
}
