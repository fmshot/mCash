import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  { path: 'admin-login', component: AdminLoginComponent },
  { path: 'admin', component: AdminComponent },

  { path: '', redirectTo: '/admin-login', pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
