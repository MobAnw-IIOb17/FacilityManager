import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private platform: Platform) {  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.platform.backButton.subscribeWithPriority(0, () => {
      navigator['app'].exitApp();
    });
  }
}
