import { Component, OnInit, signal } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../../services/employee.service';
import { AuthService } from '../../../services/auth.service';
import { Employee } from '../../../models/user.model';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss'
})
export class EmployeeFormComponent implements OnInit {
  isEdit = signal(false);
  employeeId = signal<string | null>(null);
  
  form = signal({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: '',
    department: '',
    hireDate: new Date().toISOString().split('T')[0],
    salary: 0,
    status: 'active' as 'active' | 'inactive'
  });

  departments = ['Tecnología', 'Recursos Humanos', 'Ventas', 'Marketing', 'Finanzas', 'Operaciones', 'Análisis', 'Gestión'];

  constructor(
    private employeeService: EmployeeService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && this.route.snapshot.url.some(s => s.path === 'editar')) {
      this.isEdit.set(true);
      this.employeeId.set(id);
      const emp = this.employeeService.getById(id);
      if (emp) {
        this.form.set({
          firstName: emp.firstName,
          lastName: emp.lastName,
          email: emp.email,
          phone: emp.phone,
          position: emp.position,
          department: emp.department,
          hireDate: new Date(emp.hireDate).toISOString().split('T')[0],
          salary: emp.salary,
          status: emp.status
        });
      }
    }
  }

  updateField(field: string, value: any): void {
    this.form.update(f => ({ ...f, [field]: value }));
  }

  onSubmit(): void {
    const data = this.form();
    
    if (this.isEdit()) {
      this.employeeService.update(this.employeeId()!, {
        ...data,
        hireDate: new Date(data.hireDate)
      });
      this.employeeService.addHistoryEntry(this.employeeId()!, {
        date: new Date(),
        action: 'Actualización',
        description: 'Datos del empleado actualizados'
      });
    } else {
      this.employeeService.create({
        ...data,
        hireDate: new Date(data.hireDate)
      });
      // Create user account for new employee
      this.authService.addUser({
        id: String(Date.now()),
        email: data.email,
        password: 'password123',
        role: 'employee',
        employeeId: 'EMP' + String(this.employeeService.employees().length).padStart(3, '0')
      });
    }

    this.router.navigate(['/empleados']);
  }
}

