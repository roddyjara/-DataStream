import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../../services/client.service';
import { AuthService } from '../../../services/auth.service';
import { EmployeeService } from '../../../services/employee.service';
import { Client } from '../../../models/client.model';

@Component({
  selector: 'app-client-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.scss']
})
export class ClientDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private clientService = inject(ClientService);
  private authService = inject(AuthService);
  private employeeService = inject(EmployeeService);

  client: Client | undefined;
  assignedEmployee: any;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.client = this.clientService.getClientById(id) || undefined;
      if (this.client) {
        this.assignedEmployee = this.employeeService.getEmployeeById(this.client.assignedEmployeeId);
      }
    }
  }

  canEdit() {
    const user = this.authService.currentUser();
    return user?.role === 'admin' || (user?.role === 'employee' && this.client?.assignedEmployeeId === user.employeeId);
  }

  editClient() {
    if (this.client) {
      this.router.navigate(['/clientes', this.client.id, 'editar']);
    }
  }

  goBack() {
    this.router.navigate(['/clientes']);
  }

  getStatusText(status: string) {
    const statusMap = {
      'pending': 'Pendiente',
      'in_progress': 'En Progreso',
      'completed': 'Completado',
      'cancelled': 'Cancelado'
    };
    return statusMap[status as keyof typeof statusMap] || status;
  }
}