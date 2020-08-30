import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmilkComponent } from './addmilk.component';

describe('AddmilkComponent', () => {
  let component: AddmilkComponent;
  let fixture: ComponentFixture<AddmilkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddmilkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddmilkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
