import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AgGridModule } from 'ag-grid-angular';

import { BeeAdminRoutingModule } from '@bee/page/bee-admin/bee-admin-routing.module';
import { Home1Component } from '@bee/page/bee-admin/home/home1.component';
import { ModuleComponent } from './module/module.component';
import { BeeFormModule } from '@bee/form/bee-form.module';
import { ModuleParentSelectComponent } from './module/module-parent-select/module-parent-select.component';



@NgModule({
  declarations: [
    Home1Component,
    ModuleComponent,
    ModuleParentSelectComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([]),
    BeeFormModule,
    BeeAdminRoutingModule
  ]
})
export class BeeAdminModule { }
