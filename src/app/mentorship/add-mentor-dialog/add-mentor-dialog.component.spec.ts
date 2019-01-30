import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMentorDialogComponent } from './add-mentor-dialog.component';

describe('AddMentorDialogComponent', () => {
  let component: AddMentorDialogComponent;
  let fixture: ComponentFixture<AddMentorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMentorDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMentorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
