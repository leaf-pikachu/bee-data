import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Title } from '@angular/platform-browser';


import { CookieService } from 'ngx-cookie-service';
import { ToastrModule } from 'ngx-toastr';
import { IonicStorageModule } from '@ionic/storage';

import { BeeRoutingModule } from '@bee/core/bee-routing.module';
import { BeeThemeService } from '@bee/core/theme/bee-theme.service';
import { BeeService } from '@bee/core/service/bee.service';
import { BlockUIModule } from 'ng-block-ui';


@NgModule({
  imports:[
    RouterModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    BlockUIModule.forRoot(),
    IonicStorageModule.forRoot({
      name: 'bee-data'
    }),
    BeeRoutingModule
  ],
  providers:[
    Title,
    BeeThemeService,
    BeeService,
    CookieService
  ]
})
export class BeeCoreModule {

}
