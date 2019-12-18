import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-damage-form',
  templateUrl: './damage-form.page.html',
  styleUrls: ['./damage-form.page.scss'],
})
export class DamageFormPage implements OnInit {
  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };

  constructor(private camera: Camera) { }

  ngOnInit() {
  }

  takePicture() {
    this.camera.getPicture(this.options).then((imageData) => {
      console.log(imageData);
    }, (err) => {
      // Handle error
    });
  }
}
