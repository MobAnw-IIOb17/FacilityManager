import { Injectable } from '@angular/core';
import { AppCameraService } from '../services/app-camera.service';
import { PopoverController, Platform } from '@ionic/angular';
import { DeletePopoverPage } from './gallery.service.components/deletePopover/deletePopover.page';

@Injectable({
  providedIn: 'root'
})

/*
* CameraService provides the following:
*   - displays the contents of a string[] with base64-images as a gallery inside a chosen HTMLElement
*   - adding Pictures to the chosen string[] by either taking new pictures with the camera or importing existing ones from the devices gallery
*   - viewing and deleting images from the displayed gallery by clicking on them
*
* Example:
*
*
*  import { GalleryService } from '../services/gallery.service';
*
*  ...
*
*  export class ExamplePage {
*    private images: string[] = []; //an array storing your Base64 images
*
*    constructor(private galleryService: GalleryService) {}
*
*    async ionViewDidEnter() { //to avoid issues the gallery should be newly initialized whenever a new Page is entered; use ionViewDidEnter or similar
*
*        let grid = document.getElementById('example-grid'); //the HTMLElement the gallery should be displayed in, preferably an <ion-grid>
*        
*        this.galleryService.makeGallery(grid, images); //initializes the gallery
*
*        this.galleryService.addGalleryPicture(); //opens the devices gallery and allows the user to import a picture into the gallery. asynchronous
*
*        this.galleryService.addCameraPicture(); //opens the devices camera and allows the user to take a picture, which is added to the gallery. asynchronous
*
*
*    }
*  }
*
*
* Things to Note:
*   - the string[] with the image sources should contain only the raw base64 data (without 'data:image/png;base64,' at the beginning)
*   - make sure makeGallery is called at least once whenever the page is entered before doing anything else with the gallery
*/

export class GalleryService {

  private imgBase64: string[] = [];
  private galleryHTML: HTMLElement;
  private columns: number;

  constructor(
    private popover: PopoverController,
    private platform: Platform,
    public appCameraService: AppCameraService
  ) { 
    this.platform.ready().then(() => {
      this.columns = Math.floor(this.platform.width()/100);

      platform.resize.subscribe(()=>{
        this.columns = Math.floor(this.platform.width()/100);
        this.buildGalleryHTML();
      });
    });
  }

  public makeGallery(htmlGrid: HTMLElement, images: string[]) {
    this.galleryHTML = htmlGrid;
    this.imgBase64 = images;
    this.buildGalleryHTML();
  }

  public async addGalleryPicture() {
    let image = await this.appCameraService.importPicture();
    this.imgBase64.push(image);
    this.addToGallery(this.imgBase64[(this.imgBase64.length-1)]);
  }

  public async addCameraPicture() {
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

  public deleteFromGallery(index: number){
    this.imgBase64.splice(index, 1);
    this.buildGalleryHTML();
  }

  private addToGallery(src: string) {
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

  /*
  * Builds a HTML gallery with all images in this.imgBase64
  */

  private buildGalleryHTML() {
    this.resetGallery();
    let images = this.imgBase64;
    if(this.galleryHTML){
      let imageIndex = 0;
      for(let i=0; i<Math.ceil(images.length/this.columns); i++) {
          let row = document.createElement('ion-row');
          for(let j=0; j<this.columns; j++) {
              let col = document.createElement('ion-col');
              if(imageIndex<images.length) {
                  let src = images[imageIndex];
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

  private resetGallery() {
    let gallery = this.galleryHTML;
    while(gallery.lastChild) {
      gallery.removeChild(gallery.firstChild);
    }
  }

  private makeNewPicture(source: string, index: number){
    let newPicture = document.createElement("ion-img");
    source = 'data:image/png;base64,' + source;
    newPicture.setAttribute("src", source);
    newPicture.setAttribute("id",index+"_Img");
    newPicture.addEventListener("click", () => { this.openDeletePopover(index,source) });
    return newPicture;
  }
}
