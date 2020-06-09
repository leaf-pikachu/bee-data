import { BrowserModule, Title } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AgGridModule } from 'ag-grid-angular';

import { BeeCoreModule } from '@bee/core/bee-core.module';
import { LayoutModule } from '@bee/layout/layout.module';

import { NotFoundComponent } from '@bee/not-found/not-found.component';
import { HomeComponent } from '@bee/home/home.component';
import { Page2Component } from '@bee/page-2/page-2.component';
import { AppComponent } from '@bee/app.component';
import { BlockUIModule } from 'ng-block-ui';



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
    BlockUIModule.forRoot(),
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
