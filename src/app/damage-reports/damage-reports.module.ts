import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DamageReportsPage } from './damage-reports.page';

import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatListModule} from "@angular/material/list";

const routes: Routes = [
  {
    path: '',
    component: DamageReportsPage
  }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MatInputModule,
        MatFormFieldModule,
        RouterModule.forChild(routes),
        MatListModule
    ],
  declarations: [DamageReportsPage]
})
export class DamageReportsPageModule {}
