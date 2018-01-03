import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Meetup } from '../meetup';
import { AppState } from '../../app.reducers';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/empty';

@Component({
  selector: 'app-meetup-view',
  templateUrl: './meetup-view.component.html',
  styleUrls: ['./meetup-view.component.css'],
})
export class MeetupViewComponent implements OnInit {
  meetup$: Observable<any>;
  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const key = params['id'];
      this.meetup$ = this.store.select('meetups')
        .concatMap(meetups => {
          const meetupArr = meetups.filter(m => m.key === key);
          if (meetupArr.length < 1) {
            alert('the meetup you\'re viewing are no longer exist!');
            this.router.navigate(['/']);
            return Observable.empty();
          } else {
            return meetupArr;
          }
        });
    });
  }
}
