import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
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

  constructor(private camera: Camera, private base64: Base64) { }

  setCameraOptions(cameraOptions: CameraOptions) {
    this.options = cameraOptions;
  }

  takePicture() {
    this.camera.getPicture(this.options).then((imageData) => {
      return imageData;
    });
  }
}
