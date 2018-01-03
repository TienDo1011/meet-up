import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { MeetupViewComponent } from './meetup-view.component';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import 'rxjs/add/observable/of';

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
    meetups: Observable.of([{key: '1'}])
  };

  select(value) {
    return this.storeState[value];
  }
}

describe('MeetupViewComponent', () => {
  let component: MeetupViewComponent;
  let fixture: ComponentFixture<MeetupViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetupViewComponent ],
      providers: [
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        { provide: Store, useClass: StoreStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetupViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show meetup', () => {
    const route: ActivatedRouteStub = TestBed.get(ActivatedRoute);
    const store = TestBed.get(Store);
    const spy = spyOn(store, 'select').and.callThrough();
    route.push({ id: 1 });
    expect(spy).toHaveBeenCalledWith('meetups');
    component.meetup$.subscribe(m => {
      expect(m).toContain({key: '1'});
    });
  });
});
