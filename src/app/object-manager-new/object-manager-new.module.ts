import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ObjectManagerNewPage } from './object-manager-new.page';
import {NetworkListenerDirective} from '../directives/network-listener.directive';

const routes: Routes = [
  {
    path: '',
    component: ObjectManagerNewPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ObjectManagerNewPage]
})
export class ObjectManagerNewPageModule {}
