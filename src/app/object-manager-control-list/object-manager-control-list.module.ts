import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ObjectManagerControlListPage } from './object-manager-control-list.page';

const routes: Routes = [
  {
    path: '',
    component: ObjectManagerControlListPage
  }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
  declarations: [ObjectManagerControlListPage]
})
export class ObjectManagerControlListPageModule {}
