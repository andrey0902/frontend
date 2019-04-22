import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryMentorsComponent } from './summary-mentors.component';

describe('SummaryMentorsComponent', () => {
  let component: SummaryMentorsComponent;
  let fixture: ComponentFixture<SummaryMentorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummaryMentorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryMentorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
