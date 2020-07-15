import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { NgbDropdownModule, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ContextMenuModule } from 'ngx-contextmenu';

import { GirdComponent } from '@bee/ui/table/gird/gird.component';
import { BeeToolbarModule } from '@bee/ui/table/toolbar/toolbar.module';




@NgModule({
  declarations: [GirdComponent],
  exports: [
    GirdComponent
  ],
  imports: [
    CommonModule,

    NgxDatatableModule,
    NgbPaginationModule,
    NgbTooltipModule,
    NgbDropdownModule,
    SweetAlert2Module,
    ContextMenuModule,

    BeeToolbarModule,
  ]
})
export class BeeTableModule { }
