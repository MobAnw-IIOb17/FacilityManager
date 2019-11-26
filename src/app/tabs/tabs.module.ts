import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      { path: 'damage-details', loadChildren: '../damage-details/damage-details.module#DamageDetailsPageModule'},
      { path: 'object-manager-new', loadChildren: '../object-manager-new/object-manager-new.module#ObjectManagerNewPageModule' },
      { path: 'object-manager-control-list', loadChildren: './object-manager-control-list/object-manager-control-list.module#ObjectManagerControlListPageModule' },
      { path: 'object-manager-control-new', loadChildren: './object-manager-control-new/object-manager-control-new.module#ObjectManagerControlNewPageModule' },
      { path: 'object-manager-control-view', loadChildren: './object-manager-control-view/object-manager-control-view.module#ObjectManagerControlViewPageModule' },
    ]
  },
  {
    path:'',
    redirectTo:'/tabs/damage-details',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
