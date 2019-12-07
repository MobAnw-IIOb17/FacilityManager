import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: './tabs/tabs.module#TabsPageModule'
      },
      {
        path: 'damage-reports',
        children: [
          {
            path: '',
            loadChildren: './damage-reports/damage-reports.module#DamageReportsPageModule'
          },
          {
            path: 'damage-details',
            loadChildren: './damage-details/damage-details.module#DamageDetailsPageModule'
          },
          {
            path: 'damage-form',
            loadChildren: './damage-form/damage-form.module#DamageFormPageModule'
          }
        ]
      },
      {
        path: 'object-manager-new',
        children: [
          {
            path: '',
            loadChildren: './object-manager-new/object-manager-new.module#ObjectManagerNewPageModule'
          },
          {
            path: 'object-manager-control-list',
            children: [
              {
                path: '',
                loadChildren: './object-manager-control-list/object-manager-control-list.module#ObjectManagerControlListPageModule'
              },
              {
                path: 'popovercomponent',
                loadChildren: './object-manager-control-list/popovercomponent/popovercomponent.module#PopovercomponentPageModule'
              }
            ]
          },
          {
            path: 'object-manager-control-new',
            loadChildren: './object-manager-control-new/object-manager-control-new.module#ObjectManagerControlNewPageModule'
          },
          {
            path: 'object-manager-control-view',
            loadChildren: './object-manager-control-view/object-manager-control-view.module#ObjectManagerControlViewPageModule'
          }
        ]
      },
      {
        path: 'settings',
        children: [
          {
            path: '',
            loadChildren: './settings/settings.module#SettingsPageModule'
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
