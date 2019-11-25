import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DamageDetailsPage } from './damage-details.page';
import {MatListModule} from '@angular/material';

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
    MatListModule
  ],
  declarations: [DamageDetailsPage]
})
export class DamageDetailsPageModule {}
