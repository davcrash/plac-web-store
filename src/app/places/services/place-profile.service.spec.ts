import { TestBed, inject } from '@angular/core/testing';

import { PlaceProfileService } from './place-profile.service';

describe('PlaceProfileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlaceProfileService]
    });
  });

  it('should be created', inject([PlaceProfileService], (service: PlaceProfileService) => {
    expect(service).toBeTruthy();
  }));
});
