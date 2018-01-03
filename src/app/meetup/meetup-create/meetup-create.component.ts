import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Meetup } from '../meetup';
import { AppState } from '../../app.reducers';
import { Store } from '@ngrx/store';
import { UpdateMeetup, AddMeetup } from '../store/meetup.actions';
import { Subscription } from 'rxjs/Subscription';
import { FormControl } from '@angular/forms/src/model';

@Component({
  selector: 'app-meetup-create',
  templateUrl: './meetup-create.component.html',
  styleUrls: ['./meetup-create.component.css']
})
export class MeetupCreateComponent implements OnInit, OnDestroy {
  meetup: FormGroup;
  editMode = false;
  meetupSubscription: Subscription;
  key: string;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.meetup = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', [Validators.required, this.urlValidator]]
    });
    this.route.params.subscribe((params: Params) => {
      this.key = params['id'];
      if (this.key) {
        this.editMode = true;
      }
      this.meetupSubscription = this.store.select('meetups')
        .concatMap(meetups => meetups.filter(m => m.key === this.key))
        .subscribe(meetup => {
          this.meetup.setValue({
            name: meetup.name,
            description: meetup.description,
            image: meetup.image
          });
        });
    });
  }

  urlValidator(control: FormControl) {
    const url = control.value;
    if (!url.match(/^(https?:\/\/[^ ]*\.(?:gif|png|jpg|jpeg))$/i)) {
      return {
        urlError: 'Must be an image url'
      };
    }
    return null;
  }

  onSubmit() {
    const value = this.meetup.value;
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

  ngOnDestroy() {
    if (this.meetupSubscription) {
      this.meetupSubscription.unsubscribe();
    }
  }
}
