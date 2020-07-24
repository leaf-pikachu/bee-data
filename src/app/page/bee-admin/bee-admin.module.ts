import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ContextMenuModule } from 'ngx-contextmenu';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgbDropdownModule, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { BeeAdminRoutingModule } from '@bee/page/bee-admin/bee-admin-routing.module';
import { Home1Component } from '@bee/page/bee-admin/home/home1.component';
import { ModuleComponent } from './module/module.component';
import { BeeFormModule } from '@bee/ui/form/bee-form.module';
import { ModuleParentSelectComponent } from './module/module-parent-select/module-parent-select.component';
import { IconSelectComponent } from './module/icon-select/icon-select.component';
import { IconComponent } from './icon/icon.component';
import { BeeTableModule } from '@bee/ui/table/table.module';
import { ModuleAedComponent } from './module/module-aed/module-aed.component';
import { TableComponent } from './table/table.component';
import { TableAedComponent } from './table/table-aed/table-aed.component';



@NgModule({
  declarations: [
    Home1Component,
    ModuleComponent,
    ModuleParentSelectComponent,
    IconSelectComponent,
    IconComponent,
    ModuleAedComponent,
    TableComponent,
    TableAedComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    BeeFormModule,
    BeeTableModule,
    BeeAdminRoutingModule,
    ContextMenuModule,
    NgbTooltipModule,
    NgbDropdownModule,
    SweetAlert2Module,
    NgxDatatableModule,
    NgbPaginationModule
  ]
})
export class BeeAdminModule { }
