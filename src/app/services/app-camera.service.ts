import { Injectable } from '@angular/core';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { Base64 } from '@ionic-native/base64/ngx';

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
    private base64: Base64,
    private file: File,
    private settingsService: SettingsService
  ) { }

  async ngOnInit() {
    const save: string = await this.settingsService.getSetting('saveLocally');
    if (save === 'false') {
      this.setSaveToPhotoAlbum(false);
    }
  }

  setCameraOptions(cameraOptions: CameraOptions) {
    this.options = cameraOptions;
  }

  setSaveToPhotoAlbum(value: boolean) {
    this.options.saveToPhotoAlbum = value;
  }

  setPictureQuality(value: number) {
    this.options.quality = value;
  }

  async importPicture() {
    this.options.sourceType = this.camera.PictureSourceType.PHOTOLIBRARY;
    const imageData = await this.camera.getPicture(this.options);
    return imageData;
  }

  async takePicture() {
    this.options.sourceType = this.camera.PictureSourceType.CAMERA;
    const imageData = await this.camera.getPicture(this.options);
    return imageData;
  }
}
