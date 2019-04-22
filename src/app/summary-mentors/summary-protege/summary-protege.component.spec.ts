import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryProtegeComponent } from './summary-protege.component';

describe('SummaryProtegeComponent', () => {
  let component: SummaryProtegeComponent;
  let fixture: ComponentFixture<SummaryProtegeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummaryProtegeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryProtegeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
