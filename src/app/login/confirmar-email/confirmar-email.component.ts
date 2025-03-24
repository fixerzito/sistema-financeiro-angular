import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-confirmar-email',
  standalone: true,
  imports: [],
  templateUrl: './confirmar-email.component.html',
  styleUrl: './confirmar-email.component.css'
})
export class ConfirmarEmailComponent {
  mensagem: string = 'Confirmando seu e-mail...';

  constructor(
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.usuarioService.logout()
    
    this.route.queryParams.subscribe(params => {
      const email = params['email'];
      const token = params['token'];

      if (email != null && token != null) {
        this.confirmarEmail(email, token);
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  confirmarEmail(email: string, token: string): void {
    this.usuarioService.confirmarEmail(email, token).subscribe({
      next: (response) => {
        console.log(response); // Verificar resposta real no console
        this.mensagem = response.message || 'E-mail confirmado! Redirecionando para definir senha...';
        setTimeout(() => this.router.navigate(['login/cadastrar-senha'], { queryParams: { email: email, token: token} }), 3000);
      },
      error: (err) => {
        console.error('Erro ao confirmar:', err);
        this.mensagem = 'Falha ao confirmar e-mail. O link pode estar expirado ou já ter sido usado.';
      }
    });
  }
  
}
