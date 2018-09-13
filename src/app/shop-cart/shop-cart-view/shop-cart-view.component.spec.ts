import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopCartViewComponent } from './shop-cart-view.component';

describe('ShopCartViewComponent', () => {
  let component: ShopCartViewComponent;
  let fixture: ComponentFixture<ShopCartViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopCartViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopCartViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
