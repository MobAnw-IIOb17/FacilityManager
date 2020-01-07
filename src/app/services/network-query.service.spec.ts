import { TestBed } from '@angular/core/testing';

import { NetworkQueryService } from './network-query.service';

describe('NetworkQueryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NetworkQueryService = TestBed.get(NetworkQueryService);
    expect(service).toBeTruthy();
  });
});
