import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  private loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.loginForm = formBuilder.group({});
  }

  ngOnInit() {
  }

  login() {
    const passwordField = document.getElementById('adminPassword') as HTMLIonInputElement;
    console.log();
    if (passwordField.value === 'Admin1234') {

    }
  }
}
