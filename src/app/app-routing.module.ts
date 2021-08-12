import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './viewer/pages/home/home.component';
import { CalendarComponent } from './viewer/pages/calendar/calendar.component';
import { EventsComponent } from './viewer/pages/events/events.component';
import { EventComponent } from './viewer/pages/event/event.component';
import { ForNewScoutsComponent } from './viewer/pages/for-new-scouts/for-new-scouts.component';
import { ScoutResoursesComponent } from './viewer/pages/scout-resourses/scout-resourses.component';
import { ContactComponent } from './viewer/pages/contact/contact.component';

import { AdminLoginComponent } from './editor/pages/admin-login/admin-login.component';
import { HomeEditorComponent } from './editor/pages/home-editor/home-editor.component';
import { CalendarEditorComponent } from './editor/pages/calendar-editor/calendar-editor.component';
import { EventsEditorComponent } from './editor/pages/events-editor/events-editor.component';
import { EventEditorComponent } from './editor/pages/event-editor/event-editor.component';
import { ForNewScoutsEditorComponent } from './editor/pages/for-new-scouts-editor/for-new-scouts-editor.component';
import { ScoutResoursesEditorComponent } from './editor/pages/scout-resourses-editor/scout-resourses-editor.component';
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
    path: 'events',
    component: EventsComponent
  },
  {
    path: 'events/:id',
    component: EventComponent
  },
  {
    path: 'for-new-scouts',
    component: ForNewScoutsComponent
  },
  {
    path: 'resourses',
    component: ScoutResoursesComponent
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
    path: 'editor/events',
    component: EventsEditorComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'editor/events/:id',
    component: EventEditorComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'editor/for-new-scouts',
    component: ForNewScoutsEditorComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'editor/resourses',
    component: ScoutResoursesEditorComponent,
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
