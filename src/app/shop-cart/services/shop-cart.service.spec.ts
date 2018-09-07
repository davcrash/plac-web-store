import { TestBed, inject } from '@angular/core/testing';

import { ShopCartService } from './shop-cart.service';

describe('ShopCartService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShopCartService]
    });
  });

  it('should be created', inject([ShopCartService], (service: ShopCartService) => {
    expect(service).toBeTruthy();
  }));
});
