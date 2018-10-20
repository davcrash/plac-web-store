import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellInComponent } from './sell-in.component';

describe('SellInComponent', () => {
  let component: SellInComponent;
  let fixture: ComponentFixture<SellInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
