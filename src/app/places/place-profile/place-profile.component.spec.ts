import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceProfileComponent } from './place-profile.component';

describe('PlaceProfileComponent', () => {
  let component: PlaceProfileComponent;
  let fixture: ComponentFixture<PlaceProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaceProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
