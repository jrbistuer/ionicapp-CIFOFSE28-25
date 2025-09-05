import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLlibres } from './form-llibres';

describe('FormLlibres', () => {
  let component: FormLlibres;
  let fixture: ComponentFixture<FormLlibres>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormLlibres]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormLlibres);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
