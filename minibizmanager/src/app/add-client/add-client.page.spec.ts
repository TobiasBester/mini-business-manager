import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClientPage } from './add-client.page';

describe('AddClientPage', () => {
  let component: AddClientPage;
  let fixture: ComponentFixture<AddClientPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddClientPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddClientPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
