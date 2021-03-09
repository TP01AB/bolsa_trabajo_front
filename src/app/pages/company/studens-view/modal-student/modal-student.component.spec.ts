import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalStudentComponent } from './modal-student.component';

xdescribe('ModalStudentComponent', () => {
  let component: ModalStudentComponent;
  let fixture: ComponentFixture<ModalStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalStudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
