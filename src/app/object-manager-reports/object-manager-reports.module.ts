import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ObjectManagerReportsPage } from './object-manager-reports.page';
import {NetworkListenerDirective} from '../directives/network-listener.directive';

const routes: Routes = [
  {
    path: '',
    component: ObjectManagerReportsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ObjectManagerReportsPage]
})
export class ObjectManagerReportsPageModule {}
