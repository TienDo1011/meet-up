import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { RouterTestingModule } from '@angular/router/testing';

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

describe('AppComponent', () => {
  let fixture;
  let app;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: Store, useClass: StoreStub },
        { provide: ActivatedRoute, useClass: ActivatedRouteStub }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
  }));
  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should call dispatch on init', () => {
    const store: StoreStub = TestBed.get(Store);
    const spy = spyOn(store, 'dispatch');
    const spyAuthSelect = spyOn(store, 'select').and.callThrough();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
    expect(spyAuthSelect).toHaveBeenCalled();
  });

  it('should call dispatch when login', () => {
    const store: StoreStub = TestBed.get(Store);
    const spy = spyOn(store, 'dispatch');
    app.login();
    expect(spy).toHaveBeenCalled();
  });

  it('should call dispatch when login', () => {
    const store: StoreStub = TestBed.get(Store);
    const spy = spyOn(store, 'dispatch');
    app.logout();
    expect(spy).toHaveBeenCalled();
  });
});
