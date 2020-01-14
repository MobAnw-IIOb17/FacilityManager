import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {NetworkSendService} from '../services/network-send.service';
import {AppCameraService} from '../services/app-camera.service';
import {SettingsService} from '../services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  private saveLocally: boolean = true;
  private loginForm: FormGroup;
  private qualitySlide: number = 30;

  constructor(
    private formBuilder: FormBuilder, 
    private router: Router, 
    private networkSendService: NetworkSendService, 
    private appCameraService: AppCameraService,
    private settingsService: SettingsService
  ) {
    this.loginForm = formBuilder.group({});
  }

  async ngOnInit() {
    let save:string = await this.settingsService.getSetting('saveLocally');
    if(save === 'false') this.saveLocally = false;
    
    let quality:string = await this.settingsService.getSetting('qualitySlide');
    if(quality) this.qualitySlide = +quality;
  }

  login() {
    const passwordField = document.getElementById('adminPassword') as HTMLIonInputElement;
    if (passwordField.value === 'Admin1234') {
      this.router.navigateByUrl('/tabs/settings-page');
    } else {
      alert('Passwort falsch!');
    }
    passwordField.value = '';
  }

  toggleSaveLocally() {
    this.appCameraService.setSaveToPhotoAlbum(this.saveLocally);
    if(this.saveLocally) {
      this.settingsService.putSetting('saveLocally', 'true');
    } else {
      this.settingsService.putSetting('saveLocally', 'false');
    }
  }

  databaseSync() {
    this.networkSendService.sync();
  }

  qualitySetting() {
    this.appCameraService.setPictureQuality(this.qualitySlide);
    let value: string = this.qualitySlide.toString();
    this.settingsService.putSetting('qualitySlide', value);
  }
}
