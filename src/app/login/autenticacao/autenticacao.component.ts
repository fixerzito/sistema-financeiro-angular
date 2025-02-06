import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioVerify } from '../../models/forms/user/UsuarioVerify';
import { UsarioVerifyResponse } from '../../models/forms/user/UsuarioVerifyResponse';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-autenticacao',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './autenticacao.component.html',
  styleUrl: './autenticacao.component.css'
})
export class AutenticacaoComponent {
  usuarioVerify: UsuarioVerify;
  usarioVerifyResponse: UsarioVerifyResponse;
  formGroup: FormGroup;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {
    this.usuarioVerify = {};
    this.usarioVerifyResponse = {};

    this.formGroup = new FormGroup({
      email: new FormControl(null, Validators.required)
    })
  }

  verificarEmail() {
    this.usuarioVerify = {
      email: this.formGroup.get('email')?.value
    }
    this.usuarioService.verificarEmail(this.usuarioVerify).subscribe(response => {
      this.usarioVerifyResponse = response

      if (this.usarioVerifyResponse.ativo == true) {
        this.router.navigate(['/login/autenticacao'])
      } else {
        this.router.navigate(['/login/cadastro'])
      }

    })
  }
}
