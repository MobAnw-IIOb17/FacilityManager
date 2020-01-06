import { Component, OnInit } from '@angular/core';
import {AppCameraService} from '../services/app-camera.service';

@Component({
  selector: 'app-damage-form',
  templateUrl: './damage-form.page.html',
  styleUrls: ['./damage-form.page.scss'],
})
export class DamageFormPage implements OnInit {

  constructor(public appCameraService: AppCameraService) { }

  ngOnInit() {
  }
}
