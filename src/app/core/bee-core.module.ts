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
import {BeeHttpService} from '@bee/core/service/bee-http.service';
import {BeeStorageService} from '@bee/core/service/bee-storage.service';
import {BeeDictionaryConstantService} from '@bee/core/service/bee-dictionary-constant.service';
import {services} from '@bee/core/service';


@NgModule({
  imports:[
    RouterModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    BlockUIModule.forRoot(),
    IonicStorageModule.forRoot({
      name: 'bee-data'
    })
  ],
  providers:[
    ...services,
    Title,
    BeeThemeService,
    CookieService
  ]
})
export class BeeCoreModule {

}
