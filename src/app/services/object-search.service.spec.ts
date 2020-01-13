import { TestBed } from '@angular/core/testing';

import { ObjectSearchService } from './object-search.service';

describe('ObjectSearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ObjectSearchService = TestBed.get(ObjectSearchService);
    expect(service).toBeTruthy();
  });
});
