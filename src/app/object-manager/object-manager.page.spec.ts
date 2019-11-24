import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectManagerPage } from './object-manager.page';

describe('ObjectManagerPage', () => {
  let component: ObjectManagerPage;
  let fixture: ComponentFixture<ObjectManagerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectManagerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectManagerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
