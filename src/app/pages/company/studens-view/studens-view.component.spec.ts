import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudensViewComponent } from './studens-view.component';

xdescribe('StudensViewComponent', () => {
  let component: StudensViewComponent;
  let fixture: ComponentFixture<StudensViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudensViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudensViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
