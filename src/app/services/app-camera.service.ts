import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { Base64 } from '@ionic-native/base64/ngx';

@Injectable({
  providedIn: 'root'
})
export class AppCameraService {
  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };

  constructor(private camera: Camera, private base64: Base64, private file: File) { }

  setCameraOptions(cameraOptions: CameraOptions) {
    this.options = cameraOptions;
  }

  async importPicture() {
    let local_options = this.options;
    local_options.sourceType = this.camera.PictureSourceType.PHOTOLIBRARY
    this.camera.getPicture(local_options).then((imageData) => {
      return imageData;
    }, (err) => {
      return "";
    });
  }

  async takePicture() {
    this.camera.getPicture(this.options).then((imageData) => {
      return imageData;
    });
  }
}
