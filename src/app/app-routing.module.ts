import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesRoutingModule } from './pages/pages.routing';
import { LoginRoutingModule } from './auth/auth.routing';

const routes: Routes = [

  { path: '', redirectTo: '/dashboard/home', pathMatch: 'full' }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    LoginRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
