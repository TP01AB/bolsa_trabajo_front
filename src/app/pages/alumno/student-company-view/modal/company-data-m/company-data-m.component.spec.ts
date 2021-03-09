import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyDataMComponent } from './company-data-m.component';

xdescribe('CompanyDataMComponent', () => {
  let component: CompanyDataMComponent;
  let fixture: ComponentFixture<CompanyDataMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyDataMComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyDataMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
