import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputIconModule } from 'primeng/inputicon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { UsuarioService } from '../../services/usuario.service';
import { SharedService } from '../../services/shared.service';
import { CalendarModule } from 'primeng/calendar';
import { CadastroRequest } from '../../models/forms/user/cadastro/cadastroRequest';
import { UsuarioVerify } from '../../models/forms/user/UsuarioVerify';
import { UsarioVerifyResponse } from '../../models/forms/user/UsuarioVerifyResponse';
import { InputMaskModule } from 'primeng/inputmask';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [
    CommonModule,
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
    InputMaskModule
  ],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent implements OnInit {
  formGroup: FormGroup;
  usuarioVerify: UsuarioVerify;
  usuarioVerifyResponse: UsarioVerifyResponse;
  cadastroRequest?: CadastroRequest;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.formGroup = new FormGroup({
      nome: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      cpf: new FormControl(null, Validators.required),
      dataNascimento: new FormControl(null, Validators.required),
    })

    this.usuarioVerify = {};
    this.usuarioVerifyResponse = {};
  }

  ngOnInit(): void {
    this.usuarioService.logout()
    this.route.queryParams.subscribe(params => {
      const email = params['email'];
      if (email != null) {
        this.formGroup.patchValue({
          email: email
        });
      }
    })
  }

  cadastrar() {
    if (this.formGroup) {
      this.cadastroRequest = {
        nome: this.formGroup.get('nome')?.value,
        email: this.formGroup.get('email')?.value,
        cpf: this.formGroup.get('cpf')?.value,
        dataNascimento: this.formGroup.get('dataNascimento')?.value,
      }

      this.usuarioVerify.email = this.cadastroRequest.email

      this.usuarioService.verificarEmail(this.usuarioVerify).subscribe(response => {
        this.usuarioVerifyResponse = response
        
        if(this.usuarioVerifyResponse.ativo == true){
          this.router.navigate(['/login/autenticacao'], {
            queryParams: { email: `${this.usuarioVerify!.email}`}
          })
        } else {
          this.usuarioService.cadastrar(this.cadastroRequest!).subscribe(x => {
            this.router.navigate(['/login/email-enviado'], {
              queryParams: { email: `${this.cadastroRequest!.email}` }
            })
          })
        }
      })
    }
  }
}
