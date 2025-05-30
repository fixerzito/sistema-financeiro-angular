import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailEnviadoComponent } from './email-enviado.component';

describe('EmailEnviadoComponent', () => {
  let component: EmailEnviadoComponent;
  let fixture: ComponentFixture<EmailEnviadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailEnviadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailEnviadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
