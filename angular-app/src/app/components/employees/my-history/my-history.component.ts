import { Component, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { EmployeeService } from '../../../services/employee.service';
import { Employee } from '../../../models/user.model';

@Component({
  selector: 'app-my-history',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './my-history.component.html',
  styleUrl: './my-history.component.scss'
})
export class MyHistoryComponent implements OnInit {
  employee = signal<Employee | null>(null);

  constructor(
    private authService: AuthService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    const user = this.authService.currentUser();
    if (user?.employeeId) {
      const emp = this.employeeService.getById(user.employeeId);
      if (emp) {
        this.employee.set(emp);
      }
    } else if (user?.email) {
      const emp = this.employeeService.getByEmail(user.email);
      if (emp) {
        this.employee.set(emp);
      }
    }
  }
}

