import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { AppComponent } from './app.component';
import { ProgressComponent } from './shared/progress/progress.component';
import { environment } from '../environments/environment';
import { AbsPipe } from './pipes/abs.pipe';
import { KiloPipe } from './pipes/kilo.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ProgressComponent,
    AbsPipe,
    KiloPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, 
    AngularFireAuthModule, 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
