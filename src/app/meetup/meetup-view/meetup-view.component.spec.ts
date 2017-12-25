import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetupViewComponent } from './meetup-view.component';

describe('MeetupViewComponent', () => {
  let component: MeetupViewComponent;
  let fixture: ComponentFixture<MeetupViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetupViewComponent ]
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
});
