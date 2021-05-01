import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetPassModalComponent } from './forget-pass-modal.component';

describe('ForgetPassModalComponent', () => {
  let component: ForgetPassModalComponent;
  let fixture: ComponentFixture<ForgetPassModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgetPassModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgetPassModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
