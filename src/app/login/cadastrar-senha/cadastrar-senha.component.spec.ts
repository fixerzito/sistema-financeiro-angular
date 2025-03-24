import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarSenhaComponent } from './cadastrar-senha.component';

describe('CadastrarSenhaComponent', () => {
  let component: CadastrarSenhaComponent;
  let fixture: ComponentFixture<CadastrarSenhaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastrarSenhaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarSenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
