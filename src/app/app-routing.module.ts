import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component'

import { HomeEditorComponent } from './editor/home-editor/home-editor.component';
import { AdminLoginComponent } from './editor/admin-login/admin-login.component';

import { AdminAuthGuard } from './backend/admin-auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'editor',
    redirectTo: 'editor/home',
    pathMatch: 'full'
  },
  {
    path: 'editor/login',
    component: AdminLoginComponent
  },
  {
    path: 'editor/home',
    component: HomeEditorComponent,
    canActivate: [AdminAuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
