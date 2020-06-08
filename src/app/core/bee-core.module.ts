import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Title } from '@angular/platform-browser';
import { IonicStorageModule } from '@ionic/storage';

import { BeeRoutingModule } from '@bee/core/bee-routing.module';
import { BeeThemeService } from '@bee/core/theme/bee-theme.service';
import { BeeService } from '@bee/core/bee.service';
import {CookieService} from 'ngx-cookie-service';

@NgModule({
  imports:[
    RouterModule,
    IonicStorageModule.forRoot({
      name: 'bee-data',
      version: 1.4

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
