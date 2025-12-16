import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EmployeeService } from '../../../services/employee.service';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss'
})
export class EmployeeListComponent {
  constructor(public employeeService: EmployeeService) {}

  deleteEmployee(id: string): void {
    if (confirm('¿Está seguro de eliminar este empleado?')) {
      this.employeeService.delete(id);
    }
  }
}

