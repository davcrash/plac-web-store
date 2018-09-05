import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryWithFiltersComponent } from './category-with-filters.component';

describe('CategoryWithFiltersComponent', () => {
  let component: CategoryWithFiltersComponent;
  let fixture: ComponentFixture<CategoryWithFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryWithFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryWithFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
