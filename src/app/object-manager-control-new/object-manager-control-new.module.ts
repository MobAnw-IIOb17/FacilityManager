import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ObjectManagerControlNewPage } from './object-manager-control-new.page';
import {NetworkListenerDirective} from '../directives/network-listener.directive';

const routes: Routes = [
  {
    path: '',
    component: ObjectManagerControlNewPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ObjectManagerControlNewPage]
})
export class ObjectManagerControlNewPageModule {}
