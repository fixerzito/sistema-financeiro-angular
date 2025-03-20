import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { InputGroupModule } from 'primeng/inputgroup';

@Component({
  selector: 'app-cadastrar-senha',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    ReactiveFormsModule,
    PasswordModule,
    FormsModule,
    InputGroupModule
  ],
  templateUrl: './cadastrar-senha.component.html',
  styleUrl: './cadastrar-senha.component.css'
})
export class CadastrarSenhaComponent {
  form: FormGroup;
  email: string = '';
  senha: string = '';

  constructor(
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.form = this.fb.group({
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmarSenha: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.usuarioService.logout()

    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
      const token = params['token'];

      if (this.email == '' && token == '') {
        this.router.navigate(['/login']);
      }
    });
  }

  cadastrarSenha(): void {
    if (this.form.valid && this.form.value.senha === this.form.value.confirmarSenha) {
      this.usuarioService.cadastrarSenha(this.email, this.form.value.senha).subscribe({
        next: () => {
          alert('Senha cadastrada com sucesso! Redirecionando...');
          this.router.navigate(['/login'], {
            queryParams: { email: this.email }
          });
        },
        error: () => {
          alert('Erro ao cadastrar senha.');
        }
      });
    } else {
      alert('As senhas não coincidem.');
    }
  }
}
