import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WantToBeMentorComponent } from './want-to-be-mentor.component';

describe('WantToBeMentorComponent', () => {
  let component: WantToBeMentorComponent;
  let fixture: ComponentFixture<WantToBeMentorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WantToBeMentorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WantToBeMentorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
