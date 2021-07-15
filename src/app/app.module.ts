import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Components
import { NavigationComponent } from './components/navigation/navigation.component';
import { FooterComponent } from './components/footer/footer.component';

// Pages
import { HomeComponent } from './pages/home/home.component';

// Editors
import { HomeEditorComponent } from './editor/home-editor/home-editor.component';
import { AddContentComponent } from './editor/add-content/add-content.component';
import { ManageChangesComponent } from './editor/manage-changes/manage-changes.component';
import { ManageImagesComponent } from './editor/manage-images/manage-images.component';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';
import { NavigationEditorComponent } from './editor/navigation-editor/navigation-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    FooterComponent,
    HomeEditorComponent,
    AddContentComponent,
    ManageChangesComponent,
    ManageImagesComponent,
    NavigationEditorComponent
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
