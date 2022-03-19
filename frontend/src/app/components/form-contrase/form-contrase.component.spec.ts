import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormContraseComponent } from './form-contrase.component';

describe('FormContraseComponent', () => {
  let component: FormContraseComponent;
  let fixture: ComponentFixture<FormContraseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormContraseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormContraseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
