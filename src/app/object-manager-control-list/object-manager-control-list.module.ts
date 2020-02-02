import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ObjectManagerControlListPage } from './object-manager-control-list.page';

import { NetworkListenerDirective } from '../directives/network-listener.directive';
import { ControlListPopoverComponentComponent } from './control-list-popover-component/control-list-popover-component.component';

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
  entryComponents: [ControlListPopoverComponentComponent],
  declarations: [ObjectManagerControlListPage, ControlListPopoverComponentComponent]
})
export class ObjectManagerControlListPageModule { }
