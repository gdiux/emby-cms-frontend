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

const routes: Routes = [
    
    { 
        path: 'dashboard',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children:
        [
          { path: '', component: DashboardComponent, data:{ title: 'Dashboard' } },
          { path: 'profile/:id', component: ProfileComponent, data:{ title: 'Profile' } },
          { path: 'emby-users', component: EmbyUsersComponent, data:{ title: 'Users Emby' } },
          { path: 'emby-servers', component: EmbyServersComponent, data:{ title: 'Servers Emby' } },
          { path: 'subscriptions', component: SubscriptionsComponent, data:{ title: 'Subscriptions' } },
          { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
        ] 
      },    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
