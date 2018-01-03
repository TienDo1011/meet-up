import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetupListComponent } from './meetup-list.component';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

class RouterStub {
  navigate() {}
}

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

describe('MeetupListComponent', () => {
  let component: MeetupListComponent;
  let fixture: ComponentFixture<MeetupListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetupListComponent ],
      providers: [
        { provide: Router, useClass: RouterStub },
        { provide: ActivatedRoute, useClass: ActivatedRouteStub},
        { provide: Store, useClass: StoreStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should goto meetup-view', () => {
    const router: RouterStub = TestBed.get(Router);
    const route: ActivatedRouteStub = TestBed.get(ActivatedRoute);
    const spy = spyOn(router, 'navigate');
    component.goTo('view', '12');
    expect(spy).toHaveBeenCalledWith(['12'], { relativeTo: route });
  });
});
