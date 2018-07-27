import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformativeBoxComponent } from './informative-box.component';

describe('InformativeBoxComponent', () => {
  let component: InformativeBoxComponent;
  let fixture: ComponentFixture<InformativeBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformativeBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformativeBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
