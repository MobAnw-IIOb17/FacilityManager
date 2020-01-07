import { TestBed } from '@angular/core/testing';

import { NetworkSendService } from './network-send.service';

describe('NetworkService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NetworkSendService = TestBed.get(NetworkSendService);
    expect(service).toBeTruthy();
  });
});
