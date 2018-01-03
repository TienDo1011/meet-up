import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import {
  GET_USERS,
  GET_USERS_SUCCESS,
  SEND_MESSAGE,
  SendMessage,
  GetChatDialog,
  GET_CHAT_DIALOG,
  GET_CHAT_DIALOG_SUCCESS,
} from './chat.actions';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/take';

@Injectable()
export class ChatEffects {
  usersRef;
  chatDialogsRef;
  constructor(private actions$: Actions, private db: AngularFireDatabase) {
    this.usersRef = this.db.list('users');
    this.chatDialogsRef = this.db.list('chatDialogs');
  }

  @Effect()
  getUsers = this.actions$
    .ofType(GET_USERS)
    .concatMap(_ => {
      return this.usersRef.valueChanges();
    })
    .map(users => {
      return {
        type: GET_USERS_SUCCESS,
        payload: {
          users,
        },
      };
    });

  @Effect({dispatch: false})
  sendMessage = this.actions$
    .ofType(SEND_MESSAGE)
    .map((action: SendMessage) => {
      return action.payload;
    })
    .concatMap(({ between, message, sender }) => {
      let hasDialog = false;
      return this.chatDialogsRef.snapshotChanges()
      .take(1)
      .map(changes => {
          const user1 = between[0];
          const user2 = between[1];
          changes.forEach(c => {
            const betweenArr = [];
            const chatDialog = [];
            for (const index of Object.keys(c.payload.val().between)) {
              betweenArr.push(c.payload.val().between[index]);
            }
            for (const index of Object.keys(c.payload.val().chatDialog)) {
              chatDialog.push(c.payload.val().between[index]);
            }
            if ((user1 === betweenArr[0] && user2 === betweenArr[1]) ||
            (user1 === betweenArr[1] && user2 === betweenArr[0])) {
              hasDialog = true;
              this.db.list(`chatDialogs/${c.payload.key}/chatDialog`).push({
                sender,
                message
              });
            }
            console.log('betweenArr', betweenArr, hasDialog, typeof user1, typeof user2);
          });
        })
        .map(_ => {
          if (!hasDialog) {
            this.chatDialogsRef.push({
              between,
              chatDialog: [{
                sender,
                message
              }]
            });
          }
        });
    });

  @Effect()
  getChatDialog = this.actions$
    .ofType(GET_CHAT_DIALOG)
    .map((action: GetChatDialog) => {
      console.log('hmmm', 'refine action');
      return action.payload;
    })
    .switchMap(({ between }) => {
      console.log('run here or not', between);
      return this.chatDialogsRef.snapshotChanges()
      .concatMap(changes => {
          const user1 = between[0];
          const user2 = between[1];
          return changes.filter(c => {
            const betweenArr = [];
            const chatDialog = [];
            for (const index of Object.keys(c.payload.val().between)) {
              betweenArr.push(c.payload.val().between[index]);
            }
            for (const index of Object.keys(c.payload.val().chatDialog)) {
              chatDialog.push(c.payload.val().chatDialog[index]);
            }
            console.log('filter', betweenArr, user1, user2,
            (user1 === betweenArr[0] && user2 === betweenArr[1]) ||
                   (user1 === betweenArr[1] && user2 === betweenArr[0]));
            return (user1 === betweenArr[0] && user2 === betweenArr[1]) ||
                   (user1 === betweenArr[1] && user2 === betweenArr[0]);
          })
          .map(chatDialogData => {
            console.log('chatDialogData', chatDialogData);
            const chatDialogArr = [];
              for (const index of Object.keys(chatDialogData.payload.val().chatDialog)) {
                chatDialogArr.push(chatDialogData.payload.val().chatDialog[index]);
              }
            return {
              chatWith: user2,
              chatDialog: chatDialogArr
            };
          });
        });
    })
    .map((data: {chatDialog: string[], chatWith: string}) => {
      console.log('chatDialog final', data);
      return {
        type: GET_CHAT_DIALOG_SUCCESS,
        payload: {
          chatDialog: data.chatDialog,
          chatWith: data.chatWith
        }
      };
    });
}
