import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectManagerControlListPage } from './object-manager-control-list.page';

describe('ObjectManagerControlListPage', () => {
  let component: ObjectManagerControlListPage;
  let fixture: ComponentFixture<ObjectManagerControlListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectManagerControlListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectManagerControlListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
