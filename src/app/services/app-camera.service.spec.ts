import { TestBed } from '@angular/core/testing';

import { AppCameraService } from './app-camera.service';

describe('AppCameraService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppCameraService = TestBed.get(AppCameraService);
    expect(service).toBeTruthy();
  });
});
