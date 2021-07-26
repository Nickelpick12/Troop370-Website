import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Components
import { NavigationComponent } from './viewer/components/navigation/navigation.component';

// Pages
import { HomeComponent } from './viewer/pages/home/home.component';

// Editors
import { HomeEditorComponent } from './editor/pages/home-editor/home-editor.component';
import { AddContentComponent } from './editor/components/add-content/add-content.component';
import { ManageChangesComponent } from './editor/components/manage-changes/manage-changes.component';
import { ManageImagesComponent } from './editor/components/manage-images/manage-images.component';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';
import { NavigationEditorComponent } from './editor/components/navigation-editor/navigation-editor.component';
import { AdminLoginComponent } from './editor/pages/admin-login/admin-login.component';
import { SectionEditorComponent } from './editor/components/section-editor/section-editor.component';
import { SectionComponent } from './viewer/components/section/section.component';
import { CalendarEditorComponent } from './editor/pages/calendar-editor/calendar-editor.component';
import { ContactEditorComponent } from './editor/pages/contact-editor/contact-editor.component';
import { CalendarComponent } from './viewer/pages/calendar/calendar.component';
import { ContactComponent } from './viewer/pages/contact/contact.component';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    HomeEditorComponent,
    AddContentComponent,
    ManageChangesComponent,
    ManageImagesComponent,
    NavigationEditorComponent,
    AdminLoginComponent,
    SectionEditorComponent,
    SectionComponent,
    CalendarEditorComponent,
    ContactEditorComponent,
    CalendarComponent,
    ContactComponent,
    CalendarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
