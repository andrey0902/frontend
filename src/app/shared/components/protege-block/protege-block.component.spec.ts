import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtegeBlockComponent } from './protege-block.component';

describe('ProtegeBlockComponent', () => {
  let component: ProtegeBlockComponent;
  let fixture: ComponentFixture<ProtegeBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProtegeBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtegeBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
