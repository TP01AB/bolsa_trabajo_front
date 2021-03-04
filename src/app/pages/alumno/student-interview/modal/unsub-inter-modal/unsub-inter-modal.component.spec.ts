import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsubInterModalComponent } from './unsub-inter-modal.component';

describe('UnsubInterModalComponent', () => {
  let component: UnsubInterModalComponent;
  let fixture: ComponentFixture<UnsubInterModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnsubInterModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnsubInterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
