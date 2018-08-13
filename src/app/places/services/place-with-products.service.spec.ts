import { TestBed, inject } from '@angular/core/testing';

import { PlaceWithProductsService } from './place-with-products.service';

describe('PlaceWithProductsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlaceWithProductsService]
    });
  });

  it('should be created', inject([PlaceWithProductsService], (service: PlaceWithProductsService) => {
    expect(service).toBeTruthy();
  }));
});
