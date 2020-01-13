import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {TabsPage} from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: '',
        redirectTo: 'home', // default page (opens when app is started)
      },
      {
        path: 'home',
        loadChildren: '../home/home.module#HomePageModule'
      },
      {
        path: 'object-explorer',
        loadChildren: '../object-explorer/list/list.module#ListPageModule'
      },
      {
        path: 'object-explorer-view',
        loadChildren: '../object-explorer/view/view.module#ViewPageModule'
      },
      {
        path: 'damage-reports',
        loadChildren: '../damage-reports/damage-reports.module#DamageReportsPageModule'
      },
      {
        path: 'damage-details',
        loadChildren: '../damage-details/damage-details.module#DamageDetailsPageModule'
      },
      {
        path: 'damage-form',
        loadChildren: '../damage-form/damage-form.module#DamageFormPageModule'
      },
      {
        path: 'object-manager-reports',
        loadChildren: '../object-manager-reports/object-manager-reports.module#ObjectManagerReportsPageModule'
      },
      {
        path: 'object-manager-new',
        loadChildren: '../object-manager-new/object-manager-new.module#ObjectManagerNewPageModule'
      },
      {
        path: 'object-manager-control-list',
        loadChildren: '../object-manager-control-list/object-manager-control-list.module#ObjectManagerControlListPageModule'
      },
      {
        path: 'object-manager-control-new',
        loadChildren: '../object-manager-control-new/object-manager-control-new.module#ObjectManagerControlNewPageModule'
      },
      {
        path: 'object-manager-control-view',
        loadChildren: '../object-manager-control-view/object-manager-control-view.module#ObjectManagerControlViewPageModule'
      },
      {
        path: 'settings',
        loadChildren: '../settings/settings.module#SettingsPageModule'
      },
      {
        path: 'settings-page',
        loadChildren: '../settings/settings-page/settings-page.module#SettingsPagePageModule'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home', // default page (opens when app is started)
    pathMatch: 'full'
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
export class TabsPageModule {
}
