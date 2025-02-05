import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { DialogModule } from "primeng/dialog";
import { IconFieldModule } from "primeng/iconfield";
import { InputGroupModule } from "primeng/inputgroup";
import { InputIconModule } from "primeng/inputicon";
import { InputNumberModule } from "primeng/inputnumber";
import { InputTextModule } from "primeng/inputtext";
import { PasswordModule } from "primeng/password";
import { UsuarioService } from "../services/usuario.service";
import { UsuarioVerify } from "../models/forms/user/UsuarioVerify";
import { UsarioVerifyResponse } from "../models/forms/user/UsuarioVerifyResponse";
import { Router } from "@angular/router";
import { SharedService } from "../services/shared.service";


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
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
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  usuarioVerify: UsuarioVerify;
  usarioVerifyResponse: UsarioVerifyResponse;
  formGroup: FormGroup;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private sharedService: SharedService,
  ){
    this.usuarioVerify = {};
    this.usarioVerifyResponse = {};

    this.formGroup = new FormGroup ({
      email: new FormControl (null, Validators.required)
    })
  }

  verificarEmail(){
    this.usuarioVerify = {
      email: this.formGroup.get('email')?.value
    }
    this.usuarioService.verificarEmail(this.usuarioVerify).subscribe(response => {
      this.usarioVerifyResponse = response
      
      this.sharedService.setValor(`${this.usuarioVerify.email}`)
      if(this.usarioVerifyResponse.ativo == true){
        this.router.navigate(['/login/autenticacao'])
      } else {
        this.router.navigate(['/login/cadastro'])
      }
    
    })
  }
}
