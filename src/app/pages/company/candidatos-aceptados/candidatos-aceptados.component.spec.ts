import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatosAceptadosComponent } from './candidatos-aceptados.component';

describe('CandidatosAceptadosComponent', () => {
  let component: CandidatosAceptadosComponent;
  let fixture: ComponentFixture<CandidatosAceptadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidatosAceptadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidatosAceptadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
