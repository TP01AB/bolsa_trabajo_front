import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSetAreasComponent } from './modal-set-areas.component';

describe('ModalSetAreasComponent', () => {
  let component: ModalSetAreasComponent;
  let fixture: ComponentFixture<ModalSetAreasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSetAreasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSetAreasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
