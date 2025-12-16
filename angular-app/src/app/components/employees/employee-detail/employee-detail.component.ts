import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EmployeeService } from '../../../services/employee.service';
import { Employee } from '../../../models/user.model';
import { DatePipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [RouterLink, DatePipe, DecimalPipe],
  templateUrl: './employee-detail.component.html',
  styleUrl: './employee-detail.component.scss'
})
export class EmployeeDetailComponent implements OnInit {
  employee = signal<Employee | null>(null);

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const emp = this.employeeService.getById(id);
      if (emp) {
        this.employee.set(emp);
      }
    }
  }
}

