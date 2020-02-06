import { Injectable } from '@angular/core';

import { PopoverController, Platform } from '@ionic/angular';

import { AppCameraService } from './app-camera.service';
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
*        this.galleryService.makeGallery(grid, images, true); //initializes the gallery. the boolean specifies whether pictures in the gallery are deletable
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
*   - to access the contents of the gallery simply use the array you used to initialize it. as the contents of the gallery change the array is also updated
*/

export class GalleryService {

  private imgBase64: string[] = [];
  private galleryHTML: HTMLElement;
  private deletable: boolean = false;
  private columns: number;

  constructor(
    private popover: PopoverController,
    private platform: Platform,
    public appCameraService: AppCameraService
  ) {
    /**
     * Initialisiere die Anzahl der Spalten abhängig von der Bildschirmbreite
     */
    this.platform.ready().then(() => {
      this.columns = Math.floor(this.platform.width() / 100);
    });
  }

  /**
   * Erzeugt eine Galerie
   * 
   * @param htmlGrid Element in dem die Galerie erzeugt werden soll
   * @param images Bilder die in der Galerie gezeigt werden sollen
   * @param deletable Bilder in der Galerie können gelöscht werden
   */
  public makeGallery(htmlGrid: HTMLElement, images: string[], deletable: boolean) {
    this.setGallery(htmlGrid, images, deletable);
    this.buildGalleryHTML();
  }

  /**
   * Wählt eine bestimmte Galerie aus
   * 
   * @param htmlGrid Element in der die Galerie erzeugt wurde
   * @param images Bilder in der Galerie
   * @param deletable Bilder in der Galerie können gelöscht werden
   */
  public setGallery(htmlGrid: HTMLElement, images: string[], deletable: boolean) {
    this.galleryHTML = htmlGrid;
    this.imgBase64 = images;
    this.deletable = deletable;
  }

  /**
   * Fügt ein Bild aus der Galerie des Gerätes zur Galerie hinzu
   */
  public async addGalleryPicture() {
    const image = await this.appCameraService.importPicture();
    this.imgBase64.push(image);
    this.addToGallery(this.imgBase64[(this.imgBase64.length - 1)]);
  }

  /**
   * Lässt den Benutzer ein Foto machen um es der Galerie hinzuzufügen
   */
  public async addCameraPicture() {
    const image = await this.appCameraService.takePicture();
    this.imgBase64.push(image);
    this.addToGallery(this.imgBase64[(this.imgBase64.length - 1)]);
  }

  /**
   * Öffnet ein Popover um das gewählte Bild zu löschen
   */
  public openDeletePopover = (local_index: number, local_array: string[], local_html: HTMLElement) => {
    this.popover.create({
      component: DeletePopoverPage,
      componentProps: {
        index: local_index,
        src_array: local_array,
        root_html: local_html
      },
      showBackdrop: true
    }).then((popoverElement) => {
      popoverElement.present();
    });
  }

  /**
   * Löscht ein Bild aus der Galerie
   * @param index Index des Bildes
   */
  public deleteFromGallery(index: number) {
    this.imgBase64.splice(index, 1);
    this.buildGalleryHTML();
  }

  /**
   * Fügt der Galerie ein Bild hinzu
   * @param src Base64 String des Bildes
   */
  private addToGallery(src: string) {
    if (this.galleryHTML) {
      if ((this.imgBase64.length - 1) % this.columns === 0) {
        const newRow = document.createElement('ion-row');
        for (let i = 0; i < this.columns; i++) {
          newRow.appendChild(document.createElement('ion-col'));
        }
        this.galleryHTML.appendChild(newRow);
      }
      const row = this.galleryHTML.children[this.galleryHTML.children.length - 1];
      const col = row.children[(this.imgBase64.length - 1) % this.columns];

      const newPicture = this.makeNewPicture(src, this.imgBase64.length - 1);

      col.appendChild(newPicture);
    } else {
      throw ('No Grid has been selected for the Gallery');
    }
  }

  /**
   * Baut die Galerie
   */
  private buildGalleryHTML() {
    this.resetGallery();
    const images = this.imgBase64;
    if (this.galleryHTML) {
      let imageIndex = 0;
      for (let i = 0; i < Math.ceil(images.length / this.columns); i++) {
          const row = document.createElement('ion-row');
          for (let j = 0; j < this.columns; j++) {
              const col = document.createElement('ion-col');
              if (imageIndex < images.length) {
                  const src = images[imageIndex];
                  const newPicture = this.makeNewPicture(src, imageIndex);

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

  /**
   * Leere die Galerie
   */
  private resetGallery() {
    let gallery = this.galleryHTML;
    while (gallery.lastChild) {
      gallery.removeChild(gallery.firstChild);
    }
  }

  /**
   * Erzeugt ein HTML-Element mit dem Bild
   * @param source Base64-String des Bildes
   * @param index Index des Bildes
   */
  private makeNewPicture(source: string, index: number) {
    let newPicture = document.createElement('ion-img');
    source = 'data:image/png;base64,' + source;
    newPicture.setAttribute('src', source);
    let src_array = this.imgBase64;
    let root_html = this.galleryHTML;
    if(this.deletable){
      newPicture.addEventListener('click', () => { this.openDeletePopover(index, src_array, root_html); });
    }
    return newPicture;
  }
}
