import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { Base64 } from '@ionic-native/base64/ngx';

@Injectable({
  providedIn: 'root'
})
export class AppCameraService {
  options: CameraOptions = {
    quality: 30,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true
  };

  constructor(private camera: Camera, private base64: Base64, private file: File) { }

  setCameraOptions(cameraOptions: CameraOptions) {
    this.options = cameraOptions;
  }

  async importPicture() {
    this.options.sourceType = this.camera.PictureSourceType.PHOTOLIBRARY;
    let imageData = await this.camera.getPicture(this.options);
    return imageData;
  }

  async takePicture() {
    this.options.sourceType = this.camera.PictureSourceType.CAMERA;
    let imageData = await this.camera.getPicture(this.options);
    return imageData;
  }
}
