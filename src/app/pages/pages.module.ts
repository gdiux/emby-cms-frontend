import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SwiperModule } from 'swiper/angular';
import { PipesModule } from '../pipes/pipes.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// COMPONENTS
import { PagesComponent } from './pages.component';
import { HeaderComponent } from '../shared/header/header.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { BreadcrumsComponent } from '../shared/breadcrums/breadcrums.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { EmbyUsersComponent } from './emby-users/emby-users.component';
import { EmbyServersComponent } from './emby-servers/emby-servers.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';

@NgModule({
  declarations: [
    PagesComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    BreadcrumsComponent,
    DashboardComponent,
    ProfileComponent,
    EmbyUsersComponent,
    EmbyServersComponent,
    SubscriptionsComponent
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
    ReactiveFormsModule,
    SwiperModule
  ]
})
export class PagesModule { }
