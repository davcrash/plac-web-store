import { TestBed, inject } from '@angular/core/testing';

import { ProductModalService } from './product-modal.service';

describe('ProductModalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductModalService]
    });
  });

  it('should be created', inject([ProductModalService], (service: ProductModalService) => {
    expect(service).toBeTruthy();
  }));
});
