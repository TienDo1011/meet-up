import { Component, OnInit, OnDestroy, ViewChildren, ElementRef, ViewChild, QueryList, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducers';
import { GetUsers, SendMessage, GetChatDialog } from './store/chat.actions';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy, AfterViewInit {
  users;
  showChatWindow = false;
  chatWith;
  message: string;
  currentUser;
  currentUserSubscription;
  chatDialog;
  auth$;
  @ViewChild('chatBody') chatBody: ElementRef;
  @ViewChildren('chatLine') chatLineList: QueryList<ElementRef>;
  constructor(
    private store: Store<AppState>
  ) {
  }

  ngOnInit() {
    this.auth$ = this.store.select('auth');
    console.log('chat init', );
    this.store.dispatch(new GetUsers());
    this.users = this.store.select('chat', 'users');
    this.currentUserSubscription = this.store.select('auth', 'email')
      .subscribe(currentUser => this.currentUser = currentUser);
    }

    ngAfterViewInit() {
        this.chatLineList.changes.subscribe(_ => {
          console.log('child added', this.chatBody);
          if (this.showChatWindow) {
            const el = this.chatBody.nativeElement;
          console.log('lets scroll', el.scrollHeight + el.offsetTop);
          this.chatBody.nativeElement.scrollTop = this.chatBody.nativeElement.scrollHeight;
          }
        });
    }

    showChat(user) {
      this.showChatWindow = true;
      this.chatWith = user;
      console.log('showChat', this.chatWith);
      this.store.dispatch(new GetChatDialog({between: [this.currentUser, user]}));
      this.chatDialog = this.store.select('chat', 'chatDialogs')
      .map(chatDialogs => chatDialogs[user] || []);
    }

    onKeypress(ev) {
      if (ev.keyCode === 13) {
        console.log('holysmock you pressed enter', );
        this.send();
      }
    }

    send() {
      console.log('chatbody', this.chatBody);
    this.store.dispatch(new SendMessage({
      between: [this.currentUser, this.chatWith],
      message: this.message,
      sender: this.currentUser
    }));
    this.message = '';
  }

  hideChatBox() {
    this.showChatWindow = false;
  }

  ngOnDestroy() {
    if (this.currentUserSubscription) {
      this.currentUserSubscription.unsubscribe();
    }
  }
}
