import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { Base64 } from '@ionic-native/base64/ngx';

import { IonicModule } from '@ionic/angular';

import { DamageDetailsPage } from './damage-details.page';

const routes: Routes = [
  {
    path: '',
    component: DamageDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    Base64
  ],
  declarations: [DamageDetailsPage]
})
export class DamageDetailsPageModule {}
