import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectManagerControlViewPage } from './object-manager-control-view.page';

describe('ObjectManagerControlViewPage', () => {
  let component: ObjectManagerControlViewPage;
  let fixture: ComponentFixture<ObjectManagerControlViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectManagerControlViewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectManagerControlViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
