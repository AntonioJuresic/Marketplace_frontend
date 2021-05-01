import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminconditionsComponent } from './adminconditions.component';

describe('AdminconditionsComponent', () => {
  let component: AdminconditionsComponent;
  let fixture: ComponentFixture<AdminconditionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminconditionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminconditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
