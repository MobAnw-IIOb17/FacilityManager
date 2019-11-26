import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectManagerControlNewPage } from './object-manager-control-new.page';

describe('ObjectManagerControlNewPage', () => {
  let component: ObjectManagerControlNewPage;
  let fixture: ComponentFixture<ObjectManagerControlNewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectManagerControlNewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectManagerControlNewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
