import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtegeTasksComponent } from './protege-tasks.component';

describe('ProtegeTasksComponent', () => {
  let component: ProtegeTasksComponent;
  let fixture: ComponentFixture<ProtegeTasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProtegeTasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtegeTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
