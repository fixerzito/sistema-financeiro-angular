import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExemploPrimeng2Component } from './exemplo-primeng-2.component';

describe('ExemploPrimeng2Component', () => {
  let component: ExemploPrimeng2Component;
  let fixture: ComponentFixture<ExemploPrimeng2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExemploPrimeng2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExemploPrimeng2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
