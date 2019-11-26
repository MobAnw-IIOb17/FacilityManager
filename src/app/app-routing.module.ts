import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'object-manager-new', loadChildren: '../object-manager-new/object-manager-new.module#ObjectManagerNewPageModule' },
  { path: 'object-manager-control-list', loadChildren: './object-manager-control-list/object-manager-control-list.module#ObjectManagerControlListPageModule' },
  { path: 'object-manager-control-new', loadChildren: './object-manager-control-new/object-manager-control-new.module#ObjectManagerControlNewPageModule' },
  { path: 'object-manager-control-view', loadChildren: './object-manager-control-view/object-manager-control-view.module#ObjectManagerControlViewPageModule' },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
