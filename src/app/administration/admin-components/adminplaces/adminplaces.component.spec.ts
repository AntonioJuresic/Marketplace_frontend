import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminplacesComponent } from './adminplaces.component';

describe('AdminplacesComponent', () => {
  let component: AdminplacesComponent;
  let fixture: ComponentFixture<AdminplacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminplacesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminplacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
