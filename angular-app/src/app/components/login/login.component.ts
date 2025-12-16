import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email = signal('');
  password = signal('');
  error = signal('');

  constructor(
    private authService: AuthService,
    private companyService: CompanyService,
    private router: Router
  ) {}

  get company() {
    return this.companyService.company;
  }

  onSubmit(): void {
    if (this.authService.login(this.email(), this.password())) {
      this.router.navigate(['/dashboard']);
    } else {
      this.error.set('Credenciales incorrectas');
    }
  }
}

