import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '@bee/page/not-found/not-found.component';
import { Layout2Component } from '@bee/ui/layout/layout-2/layout-2.component';
import { BeeAdminModule } from '@bee/page/bee-admin/bee-admin.module';


const routes: Routes = [
  {
    path: '', redirectTo: 'bee', pathMatch: 'full'
  }, {
    path: 'bee', component: Layout2Component, loadChildren: '@bee/page/bee-admin/bee-admin.module#BeeAdminModule'
  },
  { path: '**', component: NotFoundComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class BeeRoutingModule {}
