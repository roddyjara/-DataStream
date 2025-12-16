import { Injectable, signal } from '@angular/core';
import { Client } from '../models/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private clients = signal<Client[]>([
    // Datos de ejemplo
    {
      id: '1',
      name: 'Empresa ABC S.A.',
      city: 'Buenos Aires',
      address: 'Av. Corrientes 1234',
      phone: '+54 11 1234-5678',
      email: 'contacto@empresaabc.com',
      serviceDate: new Date('2025-12-20'),
      scheduledTime: '09:00-12:00',
      actualTime: '09:15-11:45',
      assignedEmployeeId: 'EMP001',
      observations: 'Servicio completado satisfactoriamente. Cliente conforme.',
      status: 'completed',
      createdBy: '1',
      createdAt: new Date('2025-12-15'),
      updatedAt: new Date('2025-12-20')
    }
  ]);

  getClients() {
    return this.clients.asReadonly();
  }

  getClientById(id: string) {
    return this.clients().find(c => c.id === id);
  }

  addClient(client: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>) {
    const newClient: Client = {
      ...client,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.clients.update(clients => [...clients, newClient]);
  }

  updateClient(id: string, updates: Partial<Client>) {
    this.clients.update(clients =>
      clients.map(c => c.id === id ? { ...c, ...updates, updatedAt: new Date() } : c)
    );
  }

  deleteClient(id: string) {
    this.clients.update(clients => clients.filter(c => c.id !== id));
  }

  getClientsByEmployee(employeeId: string) {
    return this.clients().filter(c => c.assignedEmployeeId === employeeId);
  }
}