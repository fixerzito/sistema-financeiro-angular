import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { RedefinirSenha } from '../../../models/forms/insert/redefinir-senha';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-redefinir-senha',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule
  ],
  templateUrl: './redefinir-senha.component.html',
  styleUrl: './redefinir-senha.component.css'
})
export class RedefinirSenhaComponent implements OnInit {
  redefinirSenhaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private router: Router
  ) {
    this.redefinirSenhaForm = this.fb.group({
      novaSenha: ['', [Validators.required, Validators.minLength(6)]],
      confirmarSenha: ['', [Validators.required]]
    }, { validator: this.senhasDevemCoincidir });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.redefinirSenhaForm.addControl('token', this.fb.control(params['token'] || ''));
      this.redefinirSenhaForm.addControl('email', this.fb.control(Array.isArray(params['email']) ? params['email'][0] : params['email']));
    });
  }

  get novaSenha() {
    return this.redefinirSenhaForm.get('novaSenha');
  }

  get confirmarSenha() {
    return this.redefinirSenhaForm.get('confirmarSenha');
  }

  senhasDevemCoincidir(formGroup: FormGroup) {
    const senha = formGroup.get('novaSenha')?.value;
    const confirmarSenha = formGroup.get('confirmarSenha')?.value;
    return senha === confirmarSenha ? null : { naoCoincide: true };
  }

  redefinirSenha() {
    if (this.redefinirSenhaForm.invalid) return;

    const redefinirSenhaData: RedefinirSenha = {
      email: this.redefinirSenhaForm.get('email')!.value,
      token: this.redefinirSenhaForm.get('token')!.value,
      novaSenha: this.redefinirSenhaForm.get('novaSenha')!.value
    };

    this.usuarioService.redefinirSenha(redefinirSenhaData).subscribe({
      next: () => {
        alert('Senha redefinida com sucesso!');
        this.router.navigate(['/login/autenticacao'], {
          queryParams: { email: redefinirSenhaData.email }
        });
      },
      error: () => {
        alert('Erro ao redefinir senha!');
      }
    });
  }
}
