import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselArrowsComponent } from './carousel-arrows.component';

describe('CarouselArrowsComponent', () => {
  let component: CarouselArrowsComponent;
  let fixture: ComponentFixture<CarouselArrowsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarouselArrowsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselArrowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
