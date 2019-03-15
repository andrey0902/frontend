import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortraitUserComponent } from './portrait-user.component';

describe('PortraitUserComponent', () => {
  let component: PortraitUserComponent;
  let fixture: ComponentFixture<PortraitUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortraitUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortraitUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
