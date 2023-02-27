import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalemanagementComponent } from './salemanagement.component';

describe('SalemanagementComponent', () => {
  let component: SalemanagementComponent;
  let fixture: ComponentFixture<SalemanagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalemanagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalemanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
