import { TestBed } from '@angular/core/testing';

import { GoogleMapsConfigService } from './google-maps-config.service';

describe('GoogleMapsConfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GoogleMapsConfigService = TestBed.get(GoogleMapsConfigService);
    expect(service).toBeTruthy();
  });
});
