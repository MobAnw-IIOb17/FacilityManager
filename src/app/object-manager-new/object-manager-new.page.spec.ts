import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectManagerNewPage } from './object-manager-new.page';

describe('ObjectManagerNewPage', () => {
  let component: ObjectManagerNewPage;
  let fixture: ComponentFixture<ObjectManagerNewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectManagerNewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectManagerNewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
