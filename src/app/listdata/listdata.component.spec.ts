import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListdataComponent } from './listdata.component';

describe('ListdataComponent', () => {
  let component: ListdataComponent;
  let fixture: ComponentFixture<ListdataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListdataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});