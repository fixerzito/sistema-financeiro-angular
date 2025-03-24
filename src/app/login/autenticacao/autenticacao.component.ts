import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioVerify } from '../../models/forms/user/UsuarioVerify';
import { UsuarioService } from '../../services/usuario.service';
import { UserLogin } from '../../models/forms/insert/user-login';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-autenticacao',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    CommonModule,
    InputTextModule
  ],
  templateUrl: './autenticacao.component.html',
  styleUrl: './autenticacao.component.css'
})
export class AutenticacaoComponent {
  login?: UserLogin;
  usuarioVerify: UsuarioVerify;
  formGroup: FormGroup;
  disabled = true;
  errorMsg: string = "";

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.formGroup = new FormGroup({
      email: new FormControl(null, Validators.required),
      senha: new FormControl(null, Validators.required),
    });

    this.usuarioVerify = {};
  }

  ngOnInit(): void {
    this.usuarioService.logout();

    this.route.queryParams.subscribe(params => {
      const email = params['email'];
      if (email != null) {
        this.formGroup.patchValue({
          email: email
        });
      }
    });
  }

  onInputChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (value != null && this.formGroup) {
      this.disabled = false;
    }
  }

  loginRequest() {
    if (this.formGroup) {
      this.login = {
        email: this.formGroup.get('email')?.value,
        senha: this.formGroup.get('senha')?.value,
      };
      this.usuarioVerify = { email: this.login.email };
      
      this.usuarioService.verificarEmail(this.usuarioVerify).subscribe(response => {
        this.usuarioVerify = response;

        if (this.usuarioVerify.ativo) {
          this.usuarioService.login(this.login!).subscribe({
            next: (response) => {
              if (response.sucesso && response.accessToken) {
                this.usuarioService.salvarToken(response.accessToken);
                this.router.navigate(['/home']);
              } else {
                console.error("Erro no login:", response.erros);
              }
            },
            error: (err: HttpErrorResponse) => {
              this.errorMsg = "Email ou senha inválidos!";
            }
          });
        }
        else {
          this.errorMsg = "Usuário não cadastrado!"
        }
      });
    }
  }
}