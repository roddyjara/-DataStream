import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { EmployeeService } from '../../services/employee.service';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  constructor(
    public authService: AuthService,
    public employeeService: EmployeeService,
    public companyService: CompanyService
  ) {}

  get activeEmployees() {
    return this.employeeService.employees().filter(e => e.status === 'active').length;
  }

  get departments() {
    return [...new Set(this.employeeService.employees().map(e => e.department))].length;
  }
}

