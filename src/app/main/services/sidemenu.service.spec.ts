import { TestBed, inject } from '@angular/core/testing';

import { SidemenuService } from './sidemenu.service';

describe('SidemenuService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SidemenuService]
    });
  });

  it('should be created', inject([SidemenuService], (service: SidemenuService) => {
    expect(service).toBeTruthy();
  }));
});
