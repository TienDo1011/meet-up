import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Meetup } from '../meetup';
import { AppState } from '../../app.reducers';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/concatMap';

@Component({
  selector: 'app-meetup-view',
  templateUrl: './meetup-view.component.html',
  styleUrls: ['./meetup-view.component.css'],
})
export class MeetupViewComponent implements OnInit {
  meetup$: Observable<Meetup>;
  registerUser$;
  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const key = params['id'];
      this.meetup$ = this.store.select('meetups')
        .concatMap(meetups => {
          return meetups.filter(m => m.key === key);
        });
    });
  }
}
