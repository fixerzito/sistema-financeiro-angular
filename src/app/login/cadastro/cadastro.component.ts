import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputIconModule } from 'primeng/inputicon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { UsuarioVerify } from '../../models/forms/user/UsuarioVerify';
import { UsarioVerifyResponse } from '../../models/forms/user/UsuarioVerifyResponse';
import { UsuarioService } from '../../services/usuario.service';
import { SharedService } from '../../services/shared.service';
import { CalendarModule } from 'primeng/calendar';
import { CadastroRequest } from '../../models/forms/user/cadastro/cadastroRequest';

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
    ReactiveFormsModule
  ],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent implements OnInit {
  formGroup: FormGroup;
  cadastroRequest?: CadastroRequest;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private sharedService: SharedService
  ) {
    this.formGroup = new FormGroup({
      nome: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      cpf: new FormControl(null, Validators.required),
      dataNascimento: new FormControl(null, Validators.required),
    })
  }

  ngOnInit(): void {
    const receivedValue = this.sharedService.getValor();
    if (receivedValue != "null") {
      this.formGroup.patchValue({
        email: receivedValue
      });
    }
  }

  salvar(){
    if (this.formGroup){
      this.cadastroRequest = {
        nome: this.formGroup.get('nome')?.value,
        email: this.formGroup.get('email')?.value
      }
    }

    this.usuarioService.cadastrar(this.cadastroRequest!).subscribe(x => {
      this.router.navigate(['/login/email-authentication'])
    })
  }
}
