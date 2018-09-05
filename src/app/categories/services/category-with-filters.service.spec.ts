import { TestBed, inject } from '@angular/core/testing';

import { CategoryWithFiltersService } from './category-with-filters.service';

describe('CategoryWithFiltersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategoryWithFiltersService]
    });
  });

  it('should be created', inject([CategoryWithFiltersService], (service: CategoryWithFiltersService) => {
    expect(service).toBeTruthy();
  }));
});
