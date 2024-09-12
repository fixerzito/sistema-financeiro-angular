import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgoDiferenteComponent } from './algo-diferente.component';

describe('AlgoDiferenteComponent', () => {
  let component: AlgoDiferenteComponent;
  let fixture: ComponentFixture<AlgoDiferenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlgoDiferenteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlgoDiferenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
