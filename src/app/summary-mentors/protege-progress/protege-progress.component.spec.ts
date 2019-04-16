import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtegeProgressComponent } from './protege-progress.component';

describe('ProtegeProgressComponent', () => {
  let component: ProtegeProgressComponent;
  let fixture: ComponentFixture<ProtegeProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProtegeProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtegeProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
