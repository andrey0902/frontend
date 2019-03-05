import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnPersonalPlanComponent } from './own-personal-plan.component';

describe('OwnPersonalPlanComponent', () => {
  let component: OwnPersonalPlanComponent;
  let fixture: ComponentFixture<OwnPersonalPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnPersonalPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnPersonalPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
