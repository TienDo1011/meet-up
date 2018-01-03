import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducers';
import { GetMeetups, DeleteMeetup, RegisterMeetup, UnRegisterMeetup } from '../store/meetup.actions';
import { AuthState } from '../../authStore/auth.reducers';

@Component({
  selector: 'app-meetup-list',
  templateUrl: './meetup-list.component.html',
  styleUrls: ['./meetup-list.component.css']
})
export class MeetupListComponent implements OnInit, OnDestroy {
  auth: AuthState;
  uidSubscription: Subscription;
  meetups$;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.uidSubscription = this.store.select('auth').subscribe(auth => this.auth = auth);
    this.meetups$ = this.store.select('meetups');
  }

  goTo(mode, key) {
    if (mode === 'view') {
      this.router.navigate([key], { relativeTo: this.route });
    } else {
      this.router.navigate([`edit/${key}`], { relativeTo: this.route });
    }
  }

  delete(key) {
    this.store.dispatch(new DeleteMeetup({key}));
  }

  register(meetupKey, auth) {
    this.store.dispatch(new RegisterMeetup({
      meetupKey,
      user: auth
    }));
  }

  unregister(meetupKey, userUid) {
    this.store.dispatch(new UnRegisterMeetup({
      meetupKey,
      userUid
    }));
  }

  ngOnDestroy() {
    if (this.uidSubscription) {
      this.uidSubscription.unsubscribe();
    }
  }
}
