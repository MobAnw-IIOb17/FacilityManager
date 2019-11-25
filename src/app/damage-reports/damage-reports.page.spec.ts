import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DamageReportsPage } from './damage-reports.page';

describe('DamageReportsPage', () => {
  let component: DamageReportsPage;
  let fixture: ComponentFixture<DamageReportsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DamageReportsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DamageReportsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
