import { Injectable } from '@angular/core';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import {SettingsService} from './settings.service';

@Injectable({
  providedIn: 'root'
})
export class AppCameraService {
  public options: CameraOptions = {
    quality: 30,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    saveToPhotoAlbum: true,
    correctOrientation: true
  };

  constructor(
    private camera: Camera,
    private settingsService: SettingsService
  ) { }

  async ngOnInit() {
    /**
     * Lädt Einstellung zum lokalen Speichern und zur Bildqualität
     */
    const save: string = await this.settingsService.getSetting('saveLocally');
    if (save === 'false') {
      this.setSaveToPhotoAlbum(false);
    }

    const quality: string = await this.settingsService.getSetting('qualitySlide');
    if (quality) {
      this.options.quality = +quality;
    }
  }

  /**
   * Ändert die Einstellungen der Kamera
   * @param cameraOptions Einstellungen der Kamera
   */
  setCameraOptions(cameraOptions: CameraOptions) {
    this.options = cameraOptions;
  }

  /**
   * Lässt einstellen ob neu aufgenommene Fotos in der Galerie des Gerätes gespeichert werden sollen
   * @param value True für Speichern
   */
  setSaveToPhotoAlbum(value: boolean) {
    this.options.saveToPhotoAlbum = value;
  }

  /**
   * Verändert die Qualität von erzeugten Bildern
   * @param value Qualität des Bildes
   */
  setPictureQuality(value: number) {
    this.options.quality = value;
  }

  /**
   * Lässt den Benutzer ein Bild aus der Galerie des Geräts auswählen
   */
  async importPicture() {
    this.options.sourceType = this.camera.PictureSourceType.PHOTOLIBRARY;
    const imageData = await this.camera.getPicture(this.options);
    return imageData;
  }

  /**
   * Lässt den Benutzer ein neues Foto machen
   */
  async takePicture() {
    this.options.sourceType = this.camera.PictureSourceType.CAMERA;
    const imageData = await this.camera.getPicture(this.options);
    return imageData;
  }
}
