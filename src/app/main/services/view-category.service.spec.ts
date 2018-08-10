import { TestBed, inject } from '@angular/core/testing';

import { ViewCategoryService } from './view-category.service';

describe('ViewCategoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ViewCategoryService]
    });
  });

  it('should be created', inject([ViewCategoryService], (service: ViewCategoryService) => {
    expect(service).toBeTruthy();
  }));
});
