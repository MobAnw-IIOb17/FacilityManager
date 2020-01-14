import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {NetworkSendService} from '../services/network-send.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  private loginForm: FormGroup;
  public qualitiSlide: number = 30;

  constructor(private formBuilder: FormBuilder, private router: Router, private networkSendService: NetworkSendService) {
    this.loginForm = formBuilder.group({});
  }

  ngOnInit() {
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

  databaseSync() {
    this.networkSendService.sync();
  }

  qualitySetting() {
    console.log("qualitySleder event")
  }
}
