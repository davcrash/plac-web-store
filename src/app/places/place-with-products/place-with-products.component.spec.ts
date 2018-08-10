import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceWithProductsComponent } from './place-with-products.component';

describe('PlaceWithProductsComponent', () => {
  let component: PlaceWithProductsComponent;
  let fixture: ComponentFixture<PlaceWithProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaceWithProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceWithProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
