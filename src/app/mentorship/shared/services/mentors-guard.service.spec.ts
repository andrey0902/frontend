import { TestBed } from '@angular/core/testing';

import { MentorsGuardService } from './mentors-guard.service';

describe('MentorsGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MentorsGuardService = TestBed.get(MentorsGuardService);
    expect(service).toBeTruthy();
  });
});
