import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilAlComponent } from './perfil-al.component';

xdescribe('PerfilAlComponent', () => {
  let component: PerfilAlComponent;
  let fixture: ComponentFixture<PerfilAlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilAlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilAlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
