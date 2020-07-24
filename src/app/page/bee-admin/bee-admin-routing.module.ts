import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Home1Component } from '@bee/page/bee-admin/home/home1.component';
import { ModuleComponent } from '@bee/page/bee-admin/module/module.component';
import { IconComponent } from '@bee/page/bee-admin/icon/icon.component';
import { NotFoundComponent } from '@bee/page/not-found/not-found.component';
import { TableComponent } from '@bee/page/bee-admin/table/table.component';

const adminRoutes: Routes = [{
    path: '', redirectTo: 'home', pathMatch: 'full'
  }, {
    path: 'module', component: ModuleComponent
  }, {
    path: 'home', component: Home1Component
  }, {
    path: 'icon', component: IconComponent
  } , {
    path: 'table', component: TableComponent
  } , {
    path: '**', component: NotFoundComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class BeeAdminRoutingModule {

}
