import { Component } from '@angular/core';
<<<<<<< Updated upstream
=======
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
>>>>>>> Stashed changes

@Component({
  selector: 'app-login',
  standalone: true,
<<<<<<< Updated upstream
  imports: [],
=======
  imports: [
    ButtonModule,
    CardModule,
    InputTextModule,
    FormsModule,
    PasswordModule 
  ],
>>>>>>> Stashed changes
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

}
