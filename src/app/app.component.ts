import { Component, OnInit } from '@angular/core';

import { AppState } from './app.reducers';
import { Store } from '@ngrx/store';
import { GetMeetups } from './meetup/store/meetup.actions';
import { Login, Logout, CheckLogin } from './authStore/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  auth$;
  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.store.dispatch(new GetMeetups());
    this.store.dispatch(new CheckLogin());
    this.auth$ = this.store.select('auth');
  }

  login() {
    this.store.dispatch(new Login());
  }

  logout() {
    this.store.dispatch(new Logout());
  }
}
