import { Component, signal } from '@angular/core';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  menuOpen = signal(false);
  activeSubmenu = signal<string | null>(null);

  constructor(
    public authService: AuthService,
    public companyService: CompanyService,
    private router: Router
  ) {}

  toggleMenu(): void {
    this.menuOpen.update(v => !v);
  }

  toggleSubmenu(menu: string): void {
    this.activeSubmenu.update(current => current === menu ? null : menu);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

