import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';
import {
  GET_MEETUPS,
  GET_MEETUPS_SUCCESS,
  UPDATE_MEETUP,
  UpdateMeetup,
  ADD_MEETUP,
  DELETE_MEETUP,
  REGISTER_MEETUP,
  RegisterMeetup,
} from './meetup.actions';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';
import { Meetup } from '../meetup';
import { AddMeetup, DeleteMeetup, UNREGISTER_MEETUP, UnRegisterMeetup } from './meetup.actions';
import { AppState } from '../../app.reducers';
import { Store } from '@ngrx/store';
import { AuthState } from '../../authStore/auth.reducers';

@Injectable()
export class MeetupEffects {
  meetupsRef;
  // meetups$;

  constructor(
    private actions$: Actions,
    private db: AngularFireDatabase,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.meetupsRef = db.list('meetups');
  }

  @Effect()
  getMeetups = this.actions$
    .ofType(GET_MEETUPS)
    .mergeMap(_ => {
      return this.store.select('auth').switchMap(auth => {
        return this.meetupsRef.snapshotChanges().map(changes => {
          return changes.map(c => {
            const value = c.payload.val();
            const registeredUsers = [];
            let registered;
            if (value.registeredUsers) {
              for (const userKey of Object.keys(value.registeredUsers)) {
                const userData = value.registeredUsers[userKey];
                registeredUsers.push(userData);
                if (userKey === auth.uid) {
                  registered = true;
                }
              }
            }
            value.registeredUsers = registeredUsers;
            value.registered = registered;
            return {
              key: c.payload.key,
              ...value,
            };
          });
        });
      });
    })
    .map(meetups => {
      return {
        type: GET_MEETUPS_SUCCESS,
        payload: meetups,
      };
    });

  @Effect({ dispatch: false })
  updateMeetup = this.actions$
    .ofType(UPDATE_MEETUP)
    .map((action: UpdateMeetup) => {
      return action.payload;
    })
    .switchMap(({ key, meetup }: { key: string; meetup: Meetup }) => {
      return this.meetupsRef.update(key, meetup);
    })
    .do(() => {
      this.router.navigate(['/']);
    });

  @Effect({ dispatch: false })
  addMeetup = this.actions$
    .ofType(ADD_MEETUP)
    .map((action: AddMeetup) => {
      return action.payload;
    })
    .mergeMap(({ meetup }: { meetup: Meetup }) => {
      return this.store.select('auth').map(auth => {
        meetup.creatorId = auth.uid;
        return this.meetupsRef.push(meetup);
      });
    })
    .do(() => {
      this.router.navigate(['/']);
    });

  @Effect({ dispatch: false })
  deleteMeetup = this.actions$
    .ofType(DELETE_MEETUP)
    .map((action: DeleteMeetup) => {
      return action.payload;
    })
    .switchMap(({ key }: { key: string }) => {
      return this.meetupsRef.remove(key);
    });

  @Effect({ dispatch: false })
  registerMeetup = this.actions$
    .ofType(REGISTER_MEETUP)
    .map((action: RegisterMeetup) => {
      return action.payload;
    })
    .switchMap(({ meetupKey, user }: { meetupKey: string, user: AuthState }) => {
      return this.db.list(`meetups/${meetupKey}/registeredUsers`).update(user.uid, user);
    });

  @Effect({ dispatch: false })
  unRegisterMeetup = this.actions$
    .ofType(UNREGISTER_MEETUP)
    .map((action: UnRegisterMeetup) => {
      return action.payload;
    })
    .switchMap(({ meetupKey, userUid }: { meetupKey: string, userUid: string }) => {
      return this.db.list(`meetups/${meetupKey}/registeredUsers`).remove(userUid);
    });
}
