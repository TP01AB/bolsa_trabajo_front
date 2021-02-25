import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreasCrudComponent } from './areas-crud.component';

describe('AreasCrudComponent', () => {
  let component: AreasCrudComponent;
  let fixture: ComponentFixture<AreasCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AreasCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AreasCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
