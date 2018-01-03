import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetupCreateComponent } from './meetup-create.component';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { FormsModule } from '@angular/forms';

class ActivatedRouteStub {
  private subject = new Subject();

  push(value) {
    this.subject.next(value);
  }

  get params() {
    return this.subject.asObservable();
  }
}

class StoreStub {
  storeState = {
    auth: Observable.of({}),
    meetups: Observable.of([{key: '1'}])
  };

  select(value) {
    return this.storeState[value];
  }

  dispatch() {

  }
}

describe('MeetupCreateComponent', () => {
  let component: MeetupCreateComponent;
  let fixture: ComponentFixture<MeetupCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ MeetupCreateComponent ],
      providers: [
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        { provide: Store, useClass: StoreStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetupCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init edit/view mode correctly', () => {
    const route: ActivatedRouteStub = TestBed.get(ActivatedRoute);
    const store: StoreStub = TestBed.get(Store);
    const spy = spyOn(store, 'select').and.callThrough();
    route.push({id: 1});
    expect(spy).toHaveBeenCalled();
    expect(component.editMode).toBe(true);
  });
});
