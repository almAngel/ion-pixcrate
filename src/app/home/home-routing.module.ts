import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { FeedPage } from '../feed/feed.page';
import { AuthGuardService } from '../services/auth-guard.service';

const routes: Routes = [
  {
    path: 'home',
    component: HomePage,
    children: [
      {
        path: 'feed',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../feed/feed.module').then(m => m.FeedPageModule),
            canActivate: [AuthGuardService]
          }
        ]
      },
      {
        path: 'upload',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../upload/upload.module').then(m => m.UploadPageModule),
            canActivate: [AuthGuardService]
          }
        ]
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../profile/profile.module').then(m => m.ProfilePageModule),
            canActivate: [AuthGuardService]
          }
        ]
      },
      {
        path: 'settings',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../settings/settings.module').then(m => m.SettingsPageModule),
            canActivate: [AuthGuardService]
          }
        ]
      },
      {
        path: '',
        redirectTo: '/home/feed',
        pathMatch: 'full'
      }

    ]
  },
  {
    path: '',
    redirectTo: '/home/feed',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
