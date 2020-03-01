import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuardService } from "./services/auth-guard.service";
import { HomePage } from './home/home.page';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
/*   {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  }, */
/*   { path: 'home/feed', loadChildren: './home/home.module#HomePageModule' },
  { path: 'home/upload', loadChildren: './upload/upload.module#UploadPageModule' },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },
  { path: 'settings', loadChildren: './settings/settings.module#SettingsPageModule' }, */
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  {
    path: '**',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    HttpClientModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
