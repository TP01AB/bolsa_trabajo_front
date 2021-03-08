import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProfileComponent2 } from './view-profile.component';

xdescribe('ViewProfileComponent', () => {
  let component: ViewProfileComponent2;
  let fixture: ComponentFixture<ViewProfileComponent2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewProfileComponent2 ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProfileComponent2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
