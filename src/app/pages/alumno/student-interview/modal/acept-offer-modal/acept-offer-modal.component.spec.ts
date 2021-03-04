import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AceptOfferModalComponent } from './acept-offer-modal.component';

describe('AceptOfferModalComponent', () => {
  let component: AceptOfferModalComponent;
  let fixture: ComponentFixture<AceptOfferModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AceptOfferModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AceptOfferModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
