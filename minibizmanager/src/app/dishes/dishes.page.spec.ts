import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DishesPage } from './dishes.page';

describe('DishesPage', () => {
  let component: DishesPage;
  let fixture: ComponentFixture<DishesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DishesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DishesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
