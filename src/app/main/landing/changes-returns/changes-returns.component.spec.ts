import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangesReturnsComponent } from './changes-returns.component';

describe('ChangesReturnsComponent', () => {
  let component: ChangesReturnsComponent;
  let fixture: ComponentFixture<ChangesReturnsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangesReturnsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangesReturnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
