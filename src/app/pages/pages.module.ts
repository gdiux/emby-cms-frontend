import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// COMPONENTS
import { PagesComponent } from './pages.component';
import { HeaderComponent } from '../shared/header/header.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { BreadcrumsComponent } from '../shared/breadcrums/breadcrums.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PipesModule } from '../pipes/pipes.module';
import { ProfileComponent } from './profile/profile.component';
import { EmbyUsersComponent } from './emby-users/emby-users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PagesComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    BreadcrumsComponent,
    DashboardComponent,
    ProfileComponent,
    EmbyUsersComponent
  ],
  exports: [
    DashboardComponent,
    PagesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    PipesModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }
