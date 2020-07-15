import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ContextMenuModule } from 'ngx-contextmenu';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AgGridModule } from 'ag-grid-angular';
import { BlockUIModule } from 'ng-block-ui';

import { BeeCoreModule } from '@bee/core/bee-core.module';
import { LayoutModule } from '@bee/ui/layout/layout.module';

import { NotFoundComponent } from '@bee/page/not-found/not-found.component';
import { AppComponent } from '@bee/app.component';
import { BeeRoutingModule } from '@bee/core/bee-routing.module';



@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    BlockUIModule.forRoot(),
    AgGridModule.withComponents([]),
    NgxDatatableModule.forRoot({messages: {
        emptyMessage: '查询暂无数据',
        totalMessage: '条',
        selectedMessage: '选中'
    }}),
    SweetAlert2Module.forRoot(),
    ContextMenuModule.forRoot(),
    BeeCoreModule,
    LayoutModule,
    BeeRoutingModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
