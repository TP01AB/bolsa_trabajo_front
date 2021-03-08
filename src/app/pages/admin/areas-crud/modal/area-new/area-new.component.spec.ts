import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaNewComponent } from './area-new.component';

xdescribe('AreaNewComponent', () => {
  let component: AreaNewComponent;
  let fixture: ComponentFixture<AreaNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AreaNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
