import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DamageFormPage } from './damage-form.page';

describe('DamageFormPage', () => {
  let component: DamageFormPage;
  let fixture: ComponentFixture<DamageFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DamageFormPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DamageFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
