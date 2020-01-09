import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { Camera } from '@ionic-native/camera/ngx';
import { Base64 } from '@ionic-native/base64/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { DeletePopoverPageModule } from './services/gallery.service.components/deletePopover/deletePopover.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    DeletePopoverPageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Camera,
    Base64
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
