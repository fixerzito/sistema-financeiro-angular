import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputIconModule } from 'primeng/inputicon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { SharedService } from '../../services/shared.service';
import { UsuarioService } from '../../services/usuario.service';
import { UserLogin } from '../../models/forms/insert/user-login';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-senha',
  standalone: true,
  imports: [
    FormsModule,
    CalendarModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    DialogModule,
    InputIconModule,
    IconFieldModule,
    PasswordModule,
    InputNumberModule,
    FormsModule,
    InputGroupModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './login-senha.component.html',
  styleUrl: './login-senha.component.css'
})
export class LoginSenhaComponent {
  userLogin?: UserLogin;
  form: FormGroup;
  erro: string = '';

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(){
    this.usuarioService.logout()
  }

  login(): void {
    if (this.form.valid) {
      this.userLogin = {
        email: this.form.value.email,
        senha: this.form.value.senha
      }
      this.usuarioService.login(this.userLogin);
    }
  }
}
