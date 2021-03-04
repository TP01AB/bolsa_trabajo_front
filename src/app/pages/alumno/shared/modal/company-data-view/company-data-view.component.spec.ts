import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyDataViewComponent } from './company-data-view.component';

describe('CompanyDataViewComponent', () => {
  let component: CompanyDataViewComponent;
  let fixture: ComponentFixture<CompanyDataViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyDataViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyDataViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
