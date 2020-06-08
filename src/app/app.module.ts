import { BrowserModule, Title } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgGridModule } from 'ag-grid-angular';

import { BeeCoreModule } from '@bee/core/bee-core.module';
import { LayoutModule } from '@bee/layout/layout.module';

import { NotFoundComponent } from '@bee/not-found/not-found.component';
import { HomeComponent } from '@bee/home/home.component';
import { Page2Component } from '@bee/page-2/page-2.component';
import { AppComponent } from '@bee/app.component';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';



@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,

    HomeComponent,
    Page2Component
  ],
  imports: [
    BrowserModule,
    RouterModule,
    HttpClientModule,
    NgbModule,
    AgGridModule.withComponents([]),
    NgxDatatableModule,
    BeeCoreModule,
    LayoutModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
