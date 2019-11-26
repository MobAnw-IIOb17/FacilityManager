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
      { path: 'damage-reports', loadChildren: '../damage-reports/damage-reports.module#DamageReportsPageModule'},
      { path: 'object-manager-new', loadChildren: '../object-manager-new/object-manager-new.module#ObjectManagerNewPageModule' },
    ]
  },
  {
    path:'',
    redirectTo:'/tabs/damage-reports', //default page (opens when app is started)
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
