import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

// GUARDS
import { AuthGuard } from '../guards/auth.guard';

// COMPONENTS
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { EmbyUsersComponent } from './emby-users/emby-users.component';
import { EmbyServersComponent } from './emby-servers/emby-servers.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { PaymentsComponent } from './payments/payments.component';

const routes: Routes = [
    
    { 
        path: 'dashboard',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children:
        [
          { path: 'home', component: DashboardComponent, data:{ title: 'Dashboard' } },
          { path: 'payments', component: PaymentsComponent, data:{ title: 'Payments' } },
          { path: 'profile/:id', component: ProfileComponent, data:{ title: 'Profile' } },
          { path: 'emby-users', component: EmbyUsersComponent, data:{ title: 'Users Emby' } },
          { path: 'emby-servers', component: EmbyServersComponent, data:{ title: 'Servers Emby' } },
          { path: 'subscriptions', component: SubscriptionsComponent, data:{ title: 'Subscriptions' } },
          { path: '', redirectTo: '/dashboard/home', pathMatch: 'full' }
        ] 
      },    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
