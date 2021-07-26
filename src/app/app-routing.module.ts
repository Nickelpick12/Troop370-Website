import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './viewer/pages/home/home.component';
import { CalendarComponent } from './viewer/pages/calendar/calendar.component';
import { ContactComponent } from './viewer/pages/contact/contact.component';

import { AdminLoginComponent } from './editor/pages/admin-login/admin-login.component';
import { HomeEditorComponent } from './editor/pages/home-editor/home-editor.component';
import { CalendarEditorComponent } from './editor/pages/calendar-editor/calendar-editor.component';
import { ContactEditorComponent } from './editor/pages/contact-editor/contact-editor.component';

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
    path: 'calendar',
    component: CalendarComponent
  },
  {
    path: 'contact',
    component: ContactComponent
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
  },
  {
    path: 'editor/calendar',
    component: CalendarEditorComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'editor/contact',
    component: ContactEditorComponent,
    canActivate: [AdminAuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
