import { TestBed, inject } from '@angular/core/testing';

import { SubcategoriesService } from './subcategories.service';

describe('SubcategoriesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubcategoriesService]
    });
  });

  it('should be created', inject([SubcategoriesService], (service: SubcategoriesService) => {
    expect(service).toBeTruthy();
  }));
});
