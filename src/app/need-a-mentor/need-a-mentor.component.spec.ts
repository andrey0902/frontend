import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeedAMentorComponent } from './need-a-mentor.component';

describe('NeedAMentorComponent', () => {
  let component: NeedAMentorComponent;
  let fixture: ComponentFixture<NeedAMentorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeedAMentorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeedAMentorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
