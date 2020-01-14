import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DamagereportspopoverComponent } from './damagereportspopover.component';

describe('DamagereportspopoverComponent', () => {
  let component: DamagereportspopoverComponent;
  let fixture: ComponentFixture<DamagereportspopoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DamagereportspopoverComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DamagereportspopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
