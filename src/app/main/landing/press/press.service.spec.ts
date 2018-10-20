import { TestBed } from '@angular/core/testing';

import { PressService } from './press.service';

describe('PressService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PressService = TestBed.get(PressService);
    expect(service).toBeTruthy();
  });
});
