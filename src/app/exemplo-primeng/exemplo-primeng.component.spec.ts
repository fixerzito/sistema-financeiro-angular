import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExemploPrimengComponent } from './exemplo-primeng.component';

describe('ExemploPrimengComponent', () => {
  let component: ExemploPrimengComponent;
  let fixture: ComponentFixture<ExemploPrimengComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExemploPrimengComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExemploPrimengComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
