import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { environment } from '../environments/environment';

import { reducers } from './app.reducers';

import { AppComponent } from './app.component';
import { MeetupListComponent } from './meetup/meetup-list/meetup-list.component';
import { MeetupCreateComponent } from './meetup/meetup-create/meetup-create.component';
import { MeetupViewComponent } from './meetup/meetup-view/meetup-view.component';
import { MeetupEffects } from './meetup/store/meetup.effects';
import { AuthEffects } from './authStore/auth.effects';

const appRoutes: Routes = [
  { path: '', redirectTo: '/meetups', pathMatch: 'full' },
  { path: 'meetups', component: MeetupListComponent },
  { path: 'meetups/create', component: MeetupCreateComponent },
  { path: 'meetups/edit/:id', component: MeetupCreateComponent},
  { path: 'meetups/:id', component: MeetupViewComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    MeetupListComponent,
    MeetupCreateComponent,
    MeetupViewComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([MeetupEffects, AuthEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25 //  Retains last 25 states
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
