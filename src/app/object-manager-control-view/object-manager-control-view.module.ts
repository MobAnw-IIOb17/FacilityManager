import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ObjectManagerControlViewPage } from './object-manager-control-view.page';

const routes: Routes = [
  {
    path: '',
    component: ObjectManagerControlViewPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ObjectManagerControlViewPage]
})
export class ObjectManagerControlViewPageModule {}
