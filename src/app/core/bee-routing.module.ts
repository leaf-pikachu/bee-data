import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '@bee/not-found/not-found.component';
import { Page2Component } from '@bee/page-2/page-2.component';
import { Layout1Component } from '@bee/layout/layout-1/layout-1.component';
import { HomeComponent } from '@bee/home/home.component';
import { Layout2Component } from '@bee/layout/layout-2/layout-2.component';
import { ModuleComponent } from '@bee/page/module/module.component';
import { BeeAdminModule } from '@bee/page/bee-admin/bee-admin.module';




const routes: Routes = [
  { path: '', component: Layout2Component, pathMatch: 'full', children: [
      { path: '', component: HomeComponent },
      { path: 'module', component: ModuleComponent}
    ]
  }, {
    path: 'bee', component: Layout2Component, loadChildren: '@bee/page/bee-admin/bee-admin.module#BeeAdminModule'
  },
  { path: 'page-2', component: Layout1Component, children: [
      { path: '', component: Page2Component },
    ]},
  { path: '**', component: NotFoundComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class BeeRoutingModule {}
