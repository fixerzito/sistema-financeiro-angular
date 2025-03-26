import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-esqueci-senha',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    CommonModule,
    InputTextModule
  ],
  templateUrl: './esqueci-senha.component.html',
  styleUrl: './esqueci-senha.component.css'
})
export class EsqueciSenhaComponent {
  esqueceuSenhaForm: FormGroup;

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService, private router: Router) {
    this.esqueceuSenhaForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get email() {
    return this.esqueceuSenhaForm.get('email');
  }

  enviarSolicitacao() {
    if (this.esqueceuSenhaForm.invalid) return;
    
    this.usuarioService.esqueciSenha(this.esqueceuSenhaForm.value.email).subscribe({
      next: () => {
        alert('Link de redefinição enviado!');
        this.router.navigate(['/login']);
      },
      error: () => {
        alert('Erro ao enviar link de redefinição!');
      }
    });
  }
}