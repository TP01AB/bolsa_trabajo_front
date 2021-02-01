import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCompanyViewComponent } from './student-company-view.component';

describe('StudentCompanyViewComponent', () => {
  let component: StudentCompanyViewComponent;
  let fixture: ComponentFixture<StudentCompanyViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentCompanyViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentCompanyViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
