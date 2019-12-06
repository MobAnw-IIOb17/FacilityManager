import { TestBed } from '@angular/core/testing';

import { ObjectChecklistService } from './object-checklist.service';

describe('ObjectChecklistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ObjectChecklistService = TestBed.get(ObjectChecklistService);
    expect(service).toBeTruthy();
  });
});
