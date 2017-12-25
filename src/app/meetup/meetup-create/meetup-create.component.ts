import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Meetup } from '../meetup';
import { AppState } from '../../app.reducers';
import { Store } from '@ngrx/store';
import { UpdateMeetup, AddMeetup } from '../store/meetup.actions';

@Component({
  selector: 'app-meetup-create',
  templateUrl: './meetup-create.component.html',
  styleUrls: ['./meetup-create.component.css']
})
export class MeetupCreateComponent implements OnInit {
  @ViewChild('f') cmForm: NgForm;
  editMode = false;
  meetup$: Observable<Meetup>;
  key: string;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.key = params['id'];
      if (this.key) {
        this.editMode = true;
      }
      this.meetup$ = this.store.select('meetups')
        .concatMap(meetups => meetups.filter(m => m.key === this.key));
    });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    if (this.editMode) {
      this.store.dispatch(new UpdateMeetup({
        key: this.key,
        meetup: value
      }));
    } else {
      this.store.dispatch(new AddMeetup({
        meetup: value
      }));
    }
  }
}
