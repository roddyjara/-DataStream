import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ClientService } from '../../../services/client.service';
import { AuthService } from '../../../services/auth.service';
import { Client } from '../../../models/client.model';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent {
  private clientService = inject(ClientService);
  private authService = inject(AuthService);
  private router = inject(Router);

  clients = this.clientService.getClients();
  currentUser = this.authService.currentUser;

  // Filtrar clientes según rol
  filteredClients = computed(() => {
    const user = this.currentUser();
    if (user?.role === 'admin') {
      return this.clients();
    } else if (user?.role === 'employee') {
      return this.clients().filter(c => c.assignedEmployeeId === user.employeeId);
    }
    return [];
  });

  canCreateClient() {
    return this.currentUser()?.role === 'admin' || this.currentUser()?.role === 'employee';
  }

  canEditClient(client: Client) {
    const user = this.currentUser();
    return user?.role === 'admin' || (user?.role === 'employee' && client.assignedEmployeeId === user.employeeId);
  }

  viewClient(client: Client) {
    this.router.navigate(['/clientes', client.id]);
  }

  editClient(client: Client) {
    this.router.navigate(['/clientes', client.id, 'editar']);
  }

  createClient() {
    this.router.navigate(['/clientes/nuevo']);
  }

  deleteClient(client: Client) {
    if (confirm(`¿Eliminar cliente ${client.name}?`)) {
      this.clientService.deleteClient(client.id);
    }
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