import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  private loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {
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
}
