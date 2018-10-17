import { TestBed, inject } from '@angular/core/testing';

import { SellInService } from './sell-in.service';

describe('SellInService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SellInService]
    });
  });

  it('should be created', inject([SellInService], (service: SellInService) => {
    expect(service).toBeTruthy();
  }));
});
