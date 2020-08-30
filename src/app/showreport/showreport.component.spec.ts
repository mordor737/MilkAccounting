import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowreportComponent } from './showreport.component';

describe('ShowreportComponent', () => {
  let component: ShowreportComponent;
  let fixture: ComponentFixture<ShowreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
