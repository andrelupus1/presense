import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuperaPage } from './recupera.page';

describe('RecuperaPage', () => {
  let component: RecuperaPage;
  let fixture: ComponentFixture<RecuperaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecuperaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecuperaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
