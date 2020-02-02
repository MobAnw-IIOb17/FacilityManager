import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {NetworkQueryService} from './services/network-query.service';
import {NetworkSendService} from './services/network-send.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

/**
 * This is a class which is created upon opening the app
 * and contains all necessary initialising methods for example
 * hiding the splash screen and probing for a network connection.
 */
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private networkQueryService: NetworkQueryService,
    private networkSendService: NetworkSendService
  ) {
    this.initializeApp();
  }

  /**
   * This method waits until the ionic platform is ready,
   * then performs default actions like styling the status bar
   * and hiding the splash screen.
   * In our case there's also a self-defined method being executed
   * here which is the query if our device has internet access in which
   * case we perform all online actions like getting fresh data from the webservice.
   */
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleLightContent();
      this.splashScreen.hide();
      if (this.networkQueryService.isOnline()) {
        this.networkSendService.onOnline();
      }
    });
  }
}
