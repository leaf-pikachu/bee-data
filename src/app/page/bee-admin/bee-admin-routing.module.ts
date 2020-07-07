import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home1Component } from '@bee/page/bee-admin/home/home1.component';
import { ModuleComponent } from '@bee/page/bee-admin/module/module.component';
import { IconComponent } from '@bee/page/bee-admin/icon/icon.component';

const adminRoutes: Routes = [{
    path: '', redirectTo: 'home'
  }, {
    path: 'module', component: ModuleComponent
  }, {
    path: 'home', component: Home1Component
  }, {
    path: 'icon', component: IconComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class BeeAdminRoutingModule {

}
