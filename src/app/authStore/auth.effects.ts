import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import 'rxjs/add/operator/switchMap';
import { AngularFireAuth } from 'angularfire2/auth';
import { LOGIN, LOGIN_SUCCESS, LOGOUT, LOGOUT_SUCCESS, CHECK_LOGIN } from './auth.actions';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private afAuth: AngularFireAuth
  ) { }

  @Effect()
  checkLogin = this.actions$
    .ofType(CHECK_LOGIN)
    .map(_ => {
      return JSON.parse(localStorage.getItem('auth'));
    })
    .map(auth => {
      if (auth.uid) {
        return {
          type: LOGIN_SUCCESS,
          payload: {
            user: auth
          }
        };
      }
    });

  @Effect()
  login = this.actions$
    .ofType(LOGIN)
    .switchMap(_ => {
      return this.afAuth.auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider());
    })
    .map(({user}) => {
      const userData = {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL
      };
      localStorage.setItem('auth', JSON.stringify(userData));
      return userData;
    })
    .map(userData => {
      console.log('user', userData);
      return {
        type: LOGIN_SUCCESS,
        payload: {
          user: userData
        }
      };
    });

  @Effect()
  logout = this.actions$
    .ofType(LOGOUT)
    .switchMap(_ => {
      return this.afAuth.auth.signOut();
    })
    .map(_ => {
      return localStorage.removeItem('auth');
    })
    .map(_ => {
      return {
        type: LOGOUT_SUCCESS
      };
    });
}
