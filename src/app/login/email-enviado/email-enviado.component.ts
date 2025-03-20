import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import { UsuarioService } from '../../services/usuario.service';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { UsuarioVerify } from '../../models/forms/user/UsuarioVerify';

@Component({
  selector: 'app-email-enviado',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule
  ],
  templateUrl: './email-enviado.component.html',
  styleUrl: './email-enviado.component.css'
})
export class EmailEnviadoComponent {
  emailResponse: UsuarioVerify;

  constructor(
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router,
    private sharedService: SharedService
  ) {
    this.emailResponse = {}
  }

  ngOnInit() {
    this.usuarioService.logout()
    this.route.queryParams.subscribe(params => {
      this.emailResponse!.email = params['email'];

      this.usuarioService.verificarEmail(this.emailResponse!).subscribe(response =>{
        this.emailResponse = response
        if(this.emailResponse?.ativo == false){
          this.router.navigate(['/login'])
        }
      })
    });
  }


  redirectToLogin() {
    this.router.navigate(['/login/autenticacao'], {
      queryParams: { email: `${this.emailResponse!.email}`}
    })
  }
}
